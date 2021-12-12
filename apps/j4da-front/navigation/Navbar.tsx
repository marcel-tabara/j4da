import React from 'react'
import Nav from 'react-bootstrap/Nav'

const Navbar = () => {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
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
    </Nav>
  )
}

export { Navbar }
