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

function pokemonHasType(pokemon, typeName) {
  for (let i = 0; i < pokemon.types.length; i++) {
    if (pokemon.types[i].type.name === typeName) {
      return true
    }
  }

  return false
}

function idIsSelected(selectedIds, pokemonId) {
  for (let i = 0; i < selectedIds.length; i++) {
    if (selectedIds[i] === pokemonId) {
      return true
    }
  }

  return false
}

function Favorites({ favorites, onRemoveSelected }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedIds, setSelectedIds] = useState([])

  const typeNames = typeNamesInFavorites(favorites)

  let list = favorites
  if (filter === 'recent') {
    list = []
    for (let i = favorites.length - 1; i >= 0; i--) {
      list.push(favorites[i])
    }
  }

  const visible = list.filter(function (pokemon) {
    const name = pokemon.name.toLowerCase()
    const word = search.toLowerCase()

    if (name.indexOf(word) === -1) {
      return false
    }

    if (filter === 'all' || filter === 'recent') {
      return true
    }

    return pokemonHasType(pokemon, filter)
  })

  function updateSearch(event) {
    setSearch(event.target.value)
  }

  function showAll() {
    setFilter('all')
  }

  function showRecent() {
    setFilter('recent')
  }

  function toggleSelected(pokemonId) {
    if (idIsSelected(selectedIds, pokemonId)) {
      const nextIds = selectedIds.filter(function (id) {
        return id !== pokemonId
      })
      setSelectedIds(nextIds)
    } else {
      setSelectedIds(selectedIds.concat(pokemonId))
    }
  }

  function clearSelected() {
    setSelectedIds([])
  }

  function removeSelected() {
    onRemoveSelected(selectedIds)
    setSelectedIds([])
  }

  let allClass = 'filter-button'
  if (filter === 'all') {
    allClass = 'filter-button active'
  }

  let recentClass = 'filter-button'
  if (filter === 'recent') {
    recentClass = 'filter-button active'
  }

  return (
    <section className="favorites">
      <div className="title-row">
        <h1>Favorites</h1>
        <button className="dark-button" type="button" onClick={removeSelected}>Remove</button>
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

        <button type="button" className={recentClass} onClick={showRecent}>Recent</button>
      </div>

      <div className="selected-bar">
        <span>Selected items ({selectedIds.length})</span>
        <button type="button" onClick={clearSelected}>Clear</button>
      </div>

      <div className="card-grid">
        {visible.map(function (pokemon) {
          function selectPokemon() {
            toggleSelected(pokemon.id)
          }

          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onSelect={selectPokemon}
              isSelected={idIsSelected(selectedIds, pokemon.id)}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Favorites
