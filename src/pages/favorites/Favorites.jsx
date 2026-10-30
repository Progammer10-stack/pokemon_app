import { useState } from 'react'
import './Favorites.css'

function Favorites() {
  const [search, setSearch] = useState('')

  function updateSearch(event) {
    setSearch(event.target.value)
  }

  return (
    <section className="favorites">
      <div className="title-row">
        <h1>Favorites</h1>
      </div>
      <p className="subtitle">Saved Pokémon</p>

      <div className="search-row">
        <label className="search-box">
          <span className="search-mark" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={updateSearch}
          />
        </label>
      </div>
    </section>
  )
}

export default Favorites
