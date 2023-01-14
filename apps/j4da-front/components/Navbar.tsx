import Link from 'next/link'
import Container from 'react-bootstrap/Container'

const NavBar = () => {
  return (
    <Container fluid>
      <Link href="/" as="/" className="nav-bar">
        Home
      </Link>

      <Link href="/apps" as="/apps" className="nav-bar">
        Apps
      </Link>

      <Link href="/articles" as="/articles" className="nav-bar">
        Articles
      </Link>

      <Link href="/keywords" as="/keywords" className="nav-bar">
        Keywords
      </Link>

      <Link href="/categories" as="/categories" className="nav-bar">
        Categories
      </Link>

      <Link href="/subcategories" as="/subcategories" className="nav-bar">
        Subcategories
      </Link>
    </Container>
  )
}

export { NavBar }
