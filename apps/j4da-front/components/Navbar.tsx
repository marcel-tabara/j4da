import Link from 'next/link'
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  return (
    <Container fluid>
      <Link href="/" className="nav-bar">
        Home
      </Link>

      <Link href="/apps" className="nav-bar">
        Apps
      </Link>

      <Link href="/articles" className="nav-bar">
        Articles
      </Link>

      <Link href="/keywords" className="nav-bar">
        Keywords
      </Link>

      <Link href="/categories" className="nav-bar">
        Categories
      </Link>

      <Link href="/subcategories" className="nav-bar">
        Subcategories
      </Link>
    </Container>
  )
}

export { NavBar }
