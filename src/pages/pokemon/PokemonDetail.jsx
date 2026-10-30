import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './PokemonDetail.css'

function typeText(types) {
  let text = ''

  for (let i = 0; i < types.length; i++) {
    if (i > 0) {
      text = text + ' · '
    }
    text = text + types[i].type.name
  }

  return text
}

function isSaved(favorites, pokemonId) {
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].id === pokemonId) {
      return true
    }
  }

  return false
}

function PokemonDetail({ favorites, onAddFavorite, onRemoveFavorite }) {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    async function loadPokemon() {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
      const data = await response.json()
      setPokemon(data)
    }

    loadPokemon()
  }, [id])

  if (!pokemon) {
    return (
      <section className="pokemon-detail">
        <p>Laden...</p>
      </section>
    )
  }

  const saved = isSaved(favorites, pokemon.id)

  function toggleFavorite() {
    if (saved) {
      onRemoveFavorite(pokemon.id)
    } else {
      onAddFavorite(pokemon)
    }
  }

  let saveLabel = 'Save'
  if (saved) {
    saveLabel = 'Saved'
  }

  return (
    <section className="pokemon-detail">
      <Link to="/" className="back-link">← Alle pokemons</Link>

      <h1>{pokemon.name}</h1>
      <div className="pokemon-image">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <p className="types">{typeText(pokemon.types)}</p>
      <p>Hoogte: {pokemon.height / 10} m</p>
      <p>Gewicht: {pokemon.weight / 10} kg</p>
      <button type="button" onClick={toggleFavorite}>{saveLabel}</button>
    </section>
  )
}

export default PokemonDetail
