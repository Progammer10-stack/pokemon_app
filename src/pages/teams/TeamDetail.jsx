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
      setPokemons(data)
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
        {team.members.map(function (pokemon) {
          function removeThisPokemon() {
            onRemove(team.id, pokemon.id)
          }

          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onRemove={removeThisPokemon}
            />
          )
        })}

        {emptySlots.map(function (slot) {
          return <AddSlot key={slot} />
        })}
      </div>

      <h2>Browse & add from catalog</h2>
      <div className="card-grid">
        {pokemons.map(function (pokemon) {
          function addThisPokemon() {
            onAdd(team.id, pokemon)
          }

          return (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onAdd={addThisPokemon}
            />
          )
        })}
      </div>
    </section>
  )
}

export default TeamDetail
