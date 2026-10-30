import { useState } from 'react'
import PokemonCard from '../../components/pokemon/PokemonCard.jsx'
import './Favorites.css'

function typeNamesInFavorites(favorites) {
  const typeNames = []

  for (let i = 0; i < favorites.length; i++) {
    const types = favorites[i].types

    for (let j = 0; j < types.length; j++) {
      const typeName = types[j].type.name
      let alreadyAdded = false

      for (let k = 0; k < typeNames.length; k++) {
        if (typeNames[k] === typeName) {
          alreadyAdded = true
        }
      }

      if (!alreadyAdded) {
        typeNames.push(typeName)
      }
    }
  }

  return typeNames
}

function Favorites({ favorites }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const typeNames = typeNamesInFavorites(favorites)

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

  function showAll() {
    setFilter('all')
  }

  let allClass = 'filter-button'
  if (filter === 'all') {
    allClass = 'filter-button active'
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

        <button type="button" className={allClass} onClick={showAll}>All</button>

        {typeNames.map(function (typeName) {
          function chooseType() {
            setFilter(typeName)
          }

          let className = 'filter-button'
          if (filter === typeName) {
            className = 'filter-button active'
          }

          return (
            <button type="button" key={typeName} className={className} onClick={chooseType}>
              {typeName}
            </button>
          )
        })}
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
