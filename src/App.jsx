import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/layout/Navigation.jsx'
import { TEAM_SIZE } from './constants.js'
import Pokemons from './pages/pokemons/Pokemons.jsx'
import PokemonDetail from './pages/pokemon/PokemonDetail.jsx'
import Teams from './pages/teams/Teams.jsx'
import TeamDetail from './pages/teams/TeamDetail.jsx'
import './App.css'

function App() {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team 1', members: [] },
    { id: 2, name: 'Team 2', members: [] },
    { id: 3, name: 'Team 3', members: [] },
  ])
  const [nextId, setNextId] = useState(4)

  function addTeam() {
    const newTeam = { id: nextId, name: 'Team ' + nextId, members: [] }
    setTeams(teams.concat(newTeam))
    setNextId(nextId + 1)
  }

  function removeTeam(id) {
    const newTeams = []

    for (let i = 0; i < teams.length; i++) {
      if (teams[i].id !== id) {
        newTeams.push(teams[i])
      }
    }

    setTeams(newTeams)
  }

  function addPokemon(teamId, pokemon) {
    const newTeams = []

    for (let i = 0; i < teams.length; i++) {
      const team = teams[i]

      if (team.id !== teamId || team.members.length >= TEAM_SIZE) {
        newTeams.push(team)
      } else {
        let alreadyAdded = false

        for (let j = 0; j < team.members.length; j++) {
          if (team.members[j].id === pokemon.id) {
            alreadyAdded = true
          }
        }

        if (alreadyAdded) {
          newTeams.push(team)
        } else {
          newTeams.push({
            id: team.id,
            name: team.name,
            members: team.members.concat(pokemon),
          })
        }
      }
    }

    setTeams(newTeams)
  }

  function removePokemon(teamId, pokemonId) {
    const newTeams = []

    for (let i = 0; i < teams.length; i++) {
      const team = teams[i]

      if (team.id !== teamId) {
        newTeams.push(team)
      } else {
        const members = []

        for (let j = 0; j < team.members.length; j++) {
          if (team.members[j].id !== pokemonId) {
            members.push(team.members[j])
          }
        }

        newTeams.push({
          id: team.id,
          name: team.name,
          members: members,
        })
      }
    }

    setTeams(newTeams)
  }

  return (
    <div className="app">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route
            path="/teams"
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
