import './PokemonCard.css'

function PokemonCard({ name, image, types, onAdd, onRemove }) {
  const content = (
    <>
      <div className="poke-image">
        <img src={image} alt={name} />
      </div>
      <h3>{name}</h3>
      <p>{types.join(' · ')}</p>
      {onRemove && (
        <button type="button" onClick={onRemove}>Remove</button>
      )}
    </>
  )

  if (onAdd) {
    return (
      <button type="button" className="poke-card catalog-card" onClick={onAdd}>
        {content}
      </button>
    )
  }

  return <article className="poke-card">{content}</article>
}

export default PokemonCard
