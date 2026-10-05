export function getPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then((res) => res.json())
}
