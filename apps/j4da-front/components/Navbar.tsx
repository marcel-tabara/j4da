import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavBar = () => {
  return (
    <Navbar>
      <Nav variant="pills">
        <Nav.Item>
          <Nav.Link>
            <Link href="/">Home</Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link>
            <Link href="/apps">Apps</Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <Link href="/articles">Articles</Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <Link href="/keywords">Keywords</Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <Link href="/categories">Categories</Link>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link>
            <Link href="/subcategories">Subcategories</Link>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  )
}

export { NavBar }
