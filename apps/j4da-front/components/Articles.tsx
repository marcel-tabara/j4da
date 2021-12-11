import Link from 'next/link'
import React from 'react'
import { IArticlesProps } from '../types'

const Articles = (props: IArticlesProps) => {
  console.log('########## props', props)
  return (
    <>
      <ul>
        {props.posts.map((elt) => (
          <li key={elt._id} className="mb-3 flex justify-between">
            <Link href="/posts/[_id]" as={`/posts/${elt._id}`}>
              <a>
                <h2>{elt.title}</h2>
              </a>
            </Link>

            <div className="text-right">{new Date(elt.date).toISOString()}</div>
          </li>
        ))}
      </ul>
    </>
  )
}

export { Articles }
