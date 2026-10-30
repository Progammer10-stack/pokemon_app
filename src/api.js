export async function getPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
  const data = await response.json()
  const pokemons = []

  for (let i = 0; i < data.results.length; i++) {
    const pokemonResponse = await fetch(data.results[i].url)
    const pokemon = await pokemonResponse.json()
    pokemons.push(pokemon)
  }

  return pokemons
}
