import { ChangeEvent, useCallback, useState } from 'react'
import { ArticleForm } from '../../forms/ArticleForm'
import { useSelectors } from '../../hooks/useSelectors'
import { Main } from '../../templates/Main'
import { IArticle, ICategory, ISubCategory } from '../../utils/types'

const ArticleAdd = () => {
  const { apps, categories, subcategories } = useSelectors()

  const getDefaultCats = () => []

  const [cats, setCats] = useState<ICategory[]>(getDefaultCats())
  const [subcats, setSubcats] = useState<ISubCategory[]>([])

  const onChangeCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const filteredSubcats = subcategories.filter(
        (subcategory: ISubCategory) =>
          subcategory.category._id === event.target.value
      )
      setSubcats(filteredSubcats ?? [])
    },
    [subcategories]
  )

  const onChangeApp = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const filteredCats = categories.filter(
        (category: ICategory) => category.app._id === event.target.value
      )

      setCats(filteredCats || [])
      onChangeCategory({
        target: { value: '' },
      } as ChangeEvent<HTMLSelectElement>)
    },
    [categories, onChangeCategory]
  )
  const article = { dateCreated: new Date().toISOString() } as IArticle
  return (
    <Main>
      <ArticleForm
        onChangeCategory={onChangeCategory}
        onChangeApp={onChangeApp}
        categories={cats}
        subcategories={subcats}
        article={article}
        allApps={apps}
      />
    </Main>
  )
}

export default ArticleAdd
