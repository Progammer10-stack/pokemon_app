import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPokemons } from '../api.js'
import './List.css'

function List() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    async function loadPokemons() {
      const data = await getPokemons()
      const details = []

      for (const pokemon of data.results) {
        const res = await fetch(pokemon.url)
        const detail = await res.json()
        details.push(detail)
      }

      setPokemons(details)
    }

    loadPokemons()
  }, [])

  return (
    <section>
      <h1>Lijst</h1>
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </li>
        ))}
      </ul>
      <nav className="page-arrows">
        <Link to="/">← Home</Link>
      </nav>
    </section>
  )
}

export default List
