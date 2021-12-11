import Link from 'next/link'
import React from 'react'
import { IKeywordsProps } from '../types'

const Keywords = (props: IKeywordsProps) => (
  <>
    <ul>
      {props.keywords.map((elt) => (
        <li key={elt._id} className="mb-3 flex justify-between">
          <Link href="/keywords/[_id]" as={`/keywords/${elt._id}`}>
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

export { Keywords }
