import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/layout/Navigation.jsx'
import { TEAM_SIZE } from './constants.js'
import Pokemons from './pages/pokemons/Pokemons.jsx'
import PokemonDetail from './pages/pokemon/PokemonDetail.jsx'
import Favorites from './pages/favorites/Favorites.jsx'
import Teams from './pages/teams/Teams.jsx'
import TeamDetail from './pages/teams/TeamDetail.jsx'
import './App.css'

function memberIsInTeam(team, pokemonId) {
  for (let i = 0; i < team.members.length; i++) {
    if (team.members[i].id === pokemonId) {
      return true
    }
  }

  return false
}

function App() {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team 1', members: [] },
    { id: 2, name: 'Team 2', members: [] },
    { id: 3, name: 'Team 3', members: [] },
  ])
  const [nextId, setNextId] = useState(4)
  const [favorites, setFavorites] = useState([])

  function addTeam() {
    const newTeam = { id: nextId, name: 'Team ' + nextId, members: [] }
    setTeams(teams.concat(newTeam))
    setNextId(nextId + 1)
  }

  function removeTeam(id) {
    const newTeams = teams.filter(function (team) {
      return team.id !== id
    })

    setTeams(newTeams)
  }

  function addPokemon(teamId, pokemon) {
    const newTeams = teams.map(function (team) {
      if (team.id !== teamId) {
        return team
      }

      if (team.members.length >= TEAM_SIZE) {
        return team
      }

      if (memberIsInTeam(team, pokemon.id)) {
        return team
      }

      const members = team.members.concat(pokemon)

      return {
        id: team.id,
        name: team.name,
        members: members,
      }
    })

    setTeams(newTeams)
  }

  function addFavorite(pokemon) {
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i].id === pokemon.id) {
        return
      }
    }

    setFavorites(favorites.concat(pokemon))
  }

  function removeFavorite(pokemonId) {
    const newFavorites = favorites.filter(function (pokemon) {
      return pokemon.id !== pokemonId
    })

    setFavorites(newFavorites)
  }

  function removeSelectedFavorites(ids) {
    const newFavorites = favorites.filter(function (pokemon) {
      let selected = false

      for (let i = 0; i < ids.length; i++) {
        if (ids[i] === pokemon.id) {
          selected = true
        }
      }

      if (selected) {
        return false
      }

      return true
    })

    setFavorites(newFavorites)
  }

  function removePokemon(teamId, pokemonId) {
    const newTeams = teams.map(function (team) {
      if (team.id !== teamId) {
        return team
      }

      const members = team.members.filter(function (pokemon) {
        return pokemon.id !== pokemonId
      })

      return {
        id: team.id,
        name: team.name,
        members: members,
      }
    })

    setTeams(newTeams)
  }

  return (
    <div className="app">
      <Navigation />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Pokemons
                favorites={favorites}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
              />
            }
          />
          <Route
            path="/pokemon/:id"
            element={
              <PokemonDetail
                favorites={favorites}
                onAddFavorite={addFavorite}
                onRemoveFavorite={removeFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                onRemoveSelected={removeSelectedFavorites}
              />
            }
          />
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
