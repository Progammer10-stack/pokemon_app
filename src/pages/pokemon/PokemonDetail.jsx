import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './PokemonDetail.css'

function PokemonDetail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    async function loadPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
      const data = await res.json()
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

  let types = pokemon.types[0].type.name
  if (pokemon.types.length > 1) {
    types = types + ' · ' + pokemon.types[1].type.name
  }

  return (
    <section className="pokemon-detail">
      <Link to="/" className="back-link">← Alle pokemons</Link>

      <h1>{pokemon.name}</h1>
      <div className="pokemon-image">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <p className="types">{types}</p>
      <p>Hoogte: {pokemon.height / 10} m</p>
      <p>Gewicht: {pokemon.weight / 10} kg</p>
    </section>
  )
}

export default PokemonDetail
