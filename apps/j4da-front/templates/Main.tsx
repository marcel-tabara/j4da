import React from 'react'
import { NavBar } from '../components/Navbar'
import { IMainProps } from '../utils/types'

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700 px-3 md:px-0">
    <div className="max-w-screen-md mx-auto">
      <NavBar />
      <div className="text-xl py-5">{props.children}</div>
    </div>
  </div>
)

export { Main }
