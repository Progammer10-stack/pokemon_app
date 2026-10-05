import { Link } from 'react-router-dom'

function Home() {
  return (
    <section>
      <h1>Home</h1>
      <p className="placeholder">Pokémon home komt hier</p>
      <nav className="page-arrows">
        <Link to="/list">Lijst →</Link>
      </nav>
    </section>
  )
}

export default Home
