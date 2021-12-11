import Link from 'next/link'
import React from 'react'
import { ICategoriesProps } from '../types'

const Categories = (props: ICategoriesProps) => (
  <>
    <ul>
      {props.categories.map((elt) => (
        <li key={elt._id} className="mb-3 flex justify-between">
          <Link href="/categories/[_id]" as={`/categories/${elt._id}`}>
            <a>
              <h2>{elt.title}</h2>
            </a>
          </Link>

          <div className="text-right">{elt.description}</div>
        </li>
      ))}
    </ul>
  </>
)

export { Categories }
