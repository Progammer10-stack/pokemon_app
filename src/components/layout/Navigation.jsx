import { Link } from 'react-router-dom'
import './Navigation.css'

function Navigation() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="logo" />
        Team Manager
      </div>
      <nav>
        <Link to="/" className="nav-link">Pokemons</Link>
        <Link to="/teams" className="nav-link">Teams</Link>
      </nav>
    </aside>
  )
}

export default Navigation
