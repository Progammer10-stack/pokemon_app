import { useState } from 'react'
import PokemonCard from '../../components/pokemon/PokemonCard.jsx'
import './Favorites.css'

function Favorites({ favorites }) {
  const [search, setSearch] = useState('')

  const visible = favorites.filter(function (pokemon) {
    const name = pokemon.name.toLowerCase()
    const word = search.toLowerCase()

    if (name.indexOf(word) === -1) {
      return false
    }

    return true
  })

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

      <div className="card-grid">
        {visible.map(function (pokemon) {
          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Favorites
