import { useEffect, useState } from 'react'
import { getPokemons } from '../../api.js'
import PokemonCard from '../../components/pokemon/PokemonCard.jsx'
import './Pokemons.css'

function isSaved(favorites, pokemonId) {
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].id === pokemonId) {
      return true
    }
  }

  return false
}

function Pokemons({ favorites, onAddFavorite, onRemoveFavorite }) {
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
          const saved = isSaved(favorites, pokemon.id)

          function toggleFavorite() {
            if (saved) {
              onRemoveFavorite(pokemon.id)
            } else {
              onAddFavorite(pokemon)
            }
          }

          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onFavorite={toggleFavorite}
              isFavorite={saved}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Pokemons
