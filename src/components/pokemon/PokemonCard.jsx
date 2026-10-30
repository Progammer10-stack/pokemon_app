import { Link } from 'react-router-dom'
import './PokemonCard.css'

function PokemonCard({ pokemon, onAdd, onRemove }) {
  let types = pokemon.types[0].type.name
  if (pokemon.types.length > 1) {
    types = types + ' · ' + pokemon.types[1].type.name
  }

  return (
    <article className="poke-card">
      <Link to={'/pokemon/' + pokemon.id} className="poke-link">
        <div className="poke-image">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <h3>{pokemon.name}</h3>
        <p>{types}</p>
      </Link>
      {onAdd && (
        <button type="button" onClick={onAdd}>Add</button>
      )}
      {onRemove && (
        <button type="button" onClick={onRemove}>Remove</button>
      )}
    </article>
  )
}

export default PokemonCard
