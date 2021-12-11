import Link from 'next/link'
import React from 'react'
import { Navbar } from '../navigation/Navbar'
import { IMainProps } from '../types'
import { Config } from '../utils/Config'

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700 px-3 md:px-0">
    <div className="max-w-screen-md mx-auto">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="font-semibold text-3xl text-gray-900">
            {Config.title}
          </div>
          <div className="text-xl">{Config.description}</div>
        </div>
        <div>
          <Navbar>
            <li className="mr-6">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/keywords">
                <a>Keywords</a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/categories">
                <a>Categories</a>
              </Link>
            </li>
            <li className="mr-6">
              <a href="https://github.com/ixartz/Next-js-Blog-Boilerplate">
                GitHub
              </a>
            </li>
          </Navbar>
        </div>
      </div>

      <div className="text-xl py-5">{props.children}</div>
    </div>
  </div>
)

export { Main }
