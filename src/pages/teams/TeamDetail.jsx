import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPokemons } from '../../api.js'
import AddSlot from '../../components/team/AddSlot.jsx'
import PokemonCard from '../../components/pokemon/PokemonCard.jsx'
import { TEAM_SIZE } from '../../constants.js'
import './TeamDetail.css'

function TeamDetail({ teams, onDelete, onAdd, onRemove }) {
  const { id } = useParams()
  const navigate = useNavigate()
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

  let team = null
  for (let i = 0; i < teams.length; i++) {
    if (teams[i].id === Number(id)) {
      team = teams[i]
    }
  }

  if (!team) {
    return (
      <section className="team-detail">
        <p>Dit team bestaat niet.</p>
        <Link to="/teams">← Back to teams</Link>
      </section>
    )
  }

  const emptySlots = []
  for (let i = team.members.length; i < TEAM_SIZE; i++) {
    emptySlots.push(i)
  }

  function deleteTeam() {
    onDelete(team.id)
    navigate('/teams')
  }

  return (
    <section className="team-detail">
      <Link to="/teams" className="back-link">← Back to teams</Link>

      <h1>Team detail</h1>
      <div className="title-row">
        <p className="subtitle">{team.members.length} of {TEAM_SIZE} slots filled</p>
        <button type="button" onClick={deleteTeam}>Delete team</button>
      </div>

      <h2>Roster</h2>
      <div className="card-grid">
        {team.members.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onRemove={() => onRemove(team.id, pokemon.id)}
          />
        ))}

        {emptySlots.map((slot) => (
          <AddSlot key={slot} />
        ))}
      </div>

      <h2>Browse & add from catalog</h2>
      <div className="card-grid">
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onAdd={() => onAdd(team.id, pokemon)}
          />
        ))}
      </div>
    </section>
  )
}

export default TeamDetail
