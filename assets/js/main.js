const pokemonList = document.getElementById('pokemonList')
const pokemonDetails = document.getElementById('pokemonDetails')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 12
let offset = 0;

function showPokemonDetail(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick="hideDetails()">
            <p style="cursor: pointer">Clique em qualquer parte desse quadro para voltar.</p>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <h3>Abilities</h3>
            <ol class="abilities">
                ${pokemon.raw.abilities.map((ability) => `<li class="normal ability ${ability.ability.name}">${ability.ability.name}</li>`).join('')}
            </ol>
            <h3>Sprites</h3>
            <ol class="sprites">
                <li class="sprite"><img src="${pokemon.raw.sprites.front_default}"></li>
                <li class="sprite"><img src="${pokemon.raw.sprites.back_default}"></li>
                <li class="sprite"><img src="${pokemon.raw.sprites.front_shiny}"></li>
                <li class="sprite"><img src="${pokemon.raw.sprites.back_shiny}"></li>
            </ol>
        </li>
    `
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick="showDetails(${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})