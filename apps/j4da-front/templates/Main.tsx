import React from 'react'
import { Navbar } from '../navigation/Navbar'
import { IMainProps } from '../types'

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700 px-3 md:px-0">
    <div className="max-w-screen-md mx-auto">
      <Navbar />
      <div className="text-xl py-5">{props.children}</div>
    </div>
  </div>
)

export { Main }
