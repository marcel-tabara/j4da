import Link from 'next/link'
import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavBar = () => {
  return (
    <Navbar>
      <Nav variant="pills">
        <Link href="/" as="/" passHref>
          <Nav.Link>Home</Nav.Link>
        </Link>
        <Link href="/apps" as="/apps" passHref>
          <Nav.Link>Apps</Nav.Link>
        </Link>

        <Link href="/articles" as="/articles" passHref>
          <Nav.Link>Articles</Nav.Link>
        </Link>

        <Link href="/keywords" as="/keywords" passHref>
          <Nav.Link>Keywords</Nav.Link>
        </Link>

        <Link href="/categories" as="/categories" passHref>
          <Nav.Link>Categories</Nav.Link>
        </Link>

        <Link href="/subcategories" as="/subcategories" passHref>
          <Nav.Link>Subcategories</Nav.Link>
        </Link>
      </Nav>
    </Navbar>
  )
}

export { NavBar }
