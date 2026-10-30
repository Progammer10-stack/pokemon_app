import { useEffect, useState } from 'react'
import { getPokemons } from '../../api.js'
import PokemonCard from '../../components/pokemon/PokemonCard.jsx'
import './Pokemons.css'

function Pokemons() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    async function loadPokemons() {
      const data = await getPokemons()
      const details = []

      for (let i = 0; i < data.results.length; i++) {
        const res = await fetch(data.results[i].url)
        const pokemon = await res.json()
        details.push(pokemon)
      }

      setPokemons(details)
    }

    loadPokemons()
  }, [])

  return (
    <section className="pokemons">
      <h1>Pokemons</h1>
      <p className="subtitle">Klik op een pokemon voor de details</p>

      <div className="card-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </section>
  )
}

export default Pokemons
