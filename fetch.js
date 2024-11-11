//*PokéAPI
const API_URL = 'https://pokeapi.co/api/v2/';
const CARD_CONTAINER = document.getElementById('card--container');

const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${API_URL}pokemon/${pokemon}`);
        const parsedResponse = await response.json();
        return parsedResponse;
    } catch (err) {
        console.error(err);
    }
}

//Función para crear las tarjetas de los pokemones
const pokedexCard = (pokemon) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img_container = document.createElement('div');

    const image = document.createElement('img');
    image.src = pokemon.sprites.front_default;
    image.alt = 'Pokemon sprite';

    const name = document.createElement('h3');
    const id = document.createElement('h3');
    const weight = document.createElement('h3');

    name.textContent = `Name: ${pokemon.name}`;
    id.textContent = `ID: ${pokemon.id}`;
    weight.textContent = `Weight: ${pokemon.weight}`;
    img_container.appendChild(image);
    card.append(img_container, name, id, weight);
    return card;
}

//Función para renderizar las tarjetas
const renderCard = (pokemon) => {
    if (CARD_CONTAINER.firstChild){
        CARD_CONTAINER.removeChild(CARD_CONTAINER.firstChild);
    }
    const card = pokedexCard(pokemon);
    CARD_CONTAINER.appendChild(card);
}

//Función para cargar la tarjeta desde localStorage
const loadPokemon = async () => {
    const currentPokemonId = localStorage.getItem('pokemonId');
    if (currentPokemonId) {
        const pokemon = await fetchPokemon(currentPokemonId);
        renderCard(pokemon);
    }
}

//Evento para que al cargar la página, la función loadPokemon se ejecute
window.addEventListener('load', loadPokemon);

// GET
document.getElementById('get-btn').addEventListener('click', async () => {
    const text = document.getElementById('poke-name').value.toLowerCase();
    const pokemon = await fetchPokemon(text);
    localStorage.setItem('pokemonId', pokemon.id);
    renderCard(pokemon);
})

// GET-PREV
document.getElementById('prev-btn').addEventListener('click', async () => {
    const currentPokemonId = localStorage.getItem('pokemonId');
    const newId = Math.max(1, currentPokemonId - 1);
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('pokemonId', pokemon.id);//Utiliza los nuevos id
    renderCard(pokemon);
})

// GET-NEXT
document.getElementById('next-btn').addEventListener('click', async () => {
    const currentPokemonId = localStorage.getItem('pokemonId');
    const newId = Math.min(1025, parseInt(currentPokemonId) + 1);//Evita que se supere el número máximos de pokemon (1025)
    const pokemon = await fetchPokemon(newId);
    localStorage.setItem('pokemonId', pokemon.id);//Utiliza los nuevos id
    renderCard(pokemon);
})