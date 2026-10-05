import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/layout/Navigation.jsx'
import { TEAM_SIZE } from './constants.js'
import Teams from './pages/Teams.jsx'
import TeamDetail from './pages/TeamDetail.jsx'
import './App.css'

function App() {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team 1', members: [] },
    { id: 2, name: 'Team 2', members: [] },
    { id: 3, name: 'Team 3', members: [] },
  ])
  const [nextId, setNextId] = useState(4)

  function addTeam() {
    setTeams([...teams, { id: nextId, name: 'Team ' + nextId, members: [] }])
    setNextId(nextId + 1)
  }

  function removeTeam(id) {
    setTeams(teams.filter((team) => team.id !== id))
  }

  function addPokemon(teamId, pokemon) {
    const member = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      types: pokemon.types.map((type) => type.type.name),
    }

    setTeams(teams.map((team) => {
      if (team.id !== teamId) return team
      if (team.members.length >= TEAM_SIZE) return team
      if (team.members.some((item) => item.id === member.id)) return team

      return { ...team, members: [...team.members, member] }
    }))
  }

  function removePokemon(teamId, pokemonId) {
    setTeams(teams.map((team) => {
      if (team.id !== teamId) return team
      return {
        ...team,
        members: team.members.filter((item) => item.id !== pokemonId),
      }
    }))
  }

  return (
    <div className="app">
      <Navigation />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Teams teams={teams} onAdd={addTeam} onRemove={removeTeam} />}
          />
          <Route
            path="/team/:id"
            element={
              <TeamDetail
                teams={teams}
                onDelete={removeTeam}
                onAdd={addPokemon}
                onRemove={removePokemon}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
