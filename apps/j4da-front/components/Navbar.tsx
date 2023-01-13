import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavBar = () => {
  return (
    <Navbar>
      <Nav variant="pills">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/apps">Apps</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/articles">Articles</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/keywords">Keywords</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/categories">Categories</Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/subcategories">Subcategories</Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}

export { NavBar }
