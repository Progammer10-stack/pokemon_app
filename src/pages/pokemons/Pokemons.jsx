import { useEffect, useState } from 'react'
import { getPokemons } from '../../api.js'
import PokemonCard from '../../components/pokemon/PokemonCard.jsx'
import './Pokemons.css'

function Pokemons() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    async function loadPokemons() {
      const data = await getPokemons()
      setPokemons(data)
    }

    loadPokemons()
  }, [])

  return (
    <section className="pokemons">
      <h1>Pokemons</h1>
      <p className="subtitle">Klik op een pokemon voor de details</p>

      <div className="card-grid">
        {pokemons.map(function (pokemon) {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />
        })}
      </div>
    </section>
  )
}

export default Pokemons
