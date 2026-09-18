import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/list">List</Link>
      <Link to="/detail/1">Detail</Link>
    </nav>
  )
}

export default Navigation
