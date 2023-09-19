
const pokeApi = {}

let allPokemons = []

function showDetails (number) {
    const current = allPokemons.find((pokemon) => pokemon.number === number)
    pokemonDetails.style.display = 'block'
    const newContent = showPokemonDetail(current)
    pokemonDetails.innerHTML = newContent
    window.scroll(0, 0)
}

function hideDetails () {
    pokemonDetails.style.display = 'none'
}

function convertPokeApiDetailToPokemon(pokeDetail) {
    
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.raw = pokeDetail
    allPokemons.push(pokemon)
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
