import { Logger } from '@nestjs/common'
import * as fs from 'fs'
import { App } from '../app/interfaces/app.interface'
import { Keyword } from '../keyword/interfaces/keyword.interface'
import { Article } from './interfaces/article.interface'
import path = require('path')

interface IBaseFileProps {
  article: Article
  catSlug: string
  subcatSlug: string
  keywords?: Keyword[]
  app?: App
}
const getFilePath = ({ article, catSlug, subcatSlug, app }: IBaseFileProps) => {
  Logger.log(`ArticleService: GetFilePath.`)
  return path.join(
    process.cwd(),
    '/apps/j4da-front/public/contents',
    app.slug,
    catSlug,
    subcatSlug,
    `${article.slug}.mdx`
  )
}

const getBody = async ({
  article,
  catSlug,
  subcatSlug,
  keywords,
}: IBaseFileProps): Promise<string> => {
  Logger.log(`ArticleService: GetBody.`)

  const getValue = (value: string | string[]) => {
    if (Array.isArray(value)) {
      return value.map((e) => `  - ${e}`).join('\n')
    } else {
      return value
    }
  }
  const get = (type: string, value: string | string[]) => {
    const isArray = (value: string | string[]) =>
      Array.isArray(value) ? `\n` : ' '
    return value && `${type}:${isArray(value)}${getValue(value)}\n`
  }
  return `---
${get('title', article?.title)}${get('category', catSlug)}${get(
    'subcategory',
    subcatSlug
  )}${get('description', article?.description)}${get(
    'date',
    article?.dateCreated.toISOString()
  )}${get('image', article?.images as string[])}${get(
    'tags',
    (keywords ?? []).map((e) => e.title)
  )}${get('slug', article?.slug)}${get('author', article?.authorName)}---

${article.body}
`
}

export const cleanDir = async (path: string) => {
  Logger.log(`ArticleService: Clean directory.`)
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true })
  }
}

export const generateCatSubcatFile = async ({ folderPath, articles, type }) => {
  !fs.existsSync(folderPath) && fs.mkdirSync(folderPath, { recursive: true })
  fs.writeFileSync(
    path.join(folderPath, type),
    JSON.stringify(articles, null, 2)
  )
}

export const generateArticlesFiles = async ({
  article,
  catSlug,
  subcatSlug,
  keywords,
  app,
}: IBaseFileProps): Promise<string> => {
  Logger.log(
    `ArticleService: GenerateArticlesFiles: ${app.url}/${catSlug}/${subcatSlug}/${article.slug}`
  )

  try {
    const filePath = await getFilePath({ article, catSlug, subcatSlug, app })
    await getBody({ article, catSlug, subcatSlug, keywords }).then((e) => {
      const dirname = path.dirname(filePath)
      !fs.existsSync(dirname) && fs.mkdirSync(dirname, { recursive: true })
      fs.writeFileSync(filePath, e)
    })
  } catch (error) {
    return error
  }
  return 'SUCCESS'
}
