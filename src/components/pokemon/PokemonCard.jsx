import { Link } from 'react-router-dom'
import './PokemonCard.css'

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

function PokemonCard({ pokemon, onAdd, onRemove, onFavorite, isFavorite }) {
  let addButton = null
  if (onAdd) {
    addButton = (
      <button type="button" onClick={onAdd}>Add</button>
    )
  }

  let removeButton = null
  if (onRemove) {
    removeButton = (
      <button type="button" onClick={onRemove}>Remove</button>
    )
  }

  let favoriteButton = null
  if (onFavorite) {
    let label = 'Save'
    if (isFavorite) {
      label = 'Saved'
    }

    favoriteButton = (
      <button type="button" onClick={onFavorite}>{label}</button>
    )
  }

  return (
    <article className="poke-card">
      <Link to={'/pokemon/' + pokemon.id} className="poke-link">
        <div className="poke-image">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <h3>{pokemon.name}</h3>
        <p>{typeText(pokemon.types)}</p>
      </Link>
      {favoriteButton}
      {addButton}
      {removeButton}
    </article>
  )
}

export default PokemonCard
