const apiButton = document.getElementById('apiButton');
const apiData = document.getElementById('apiData');
const base_experience = document.getElementById('base_experience');
const pokeTipo = document.getElementById("poke-tipo");
const name = document.getElementById('name');
const pokeImg = document.getElementById("pokeImg");
const pokemonNameInput = document.getElementById("pokemon-name");

const tipoMapping = {
    normal: "normal",
    fighting: "lucha 👊",
    flying: "volador 🦅",
    poison: "veneno ☠️",
    ground: "tierra 🌎",
    rock: "roca 🧱",
    bug: "bicho 🐛",
    ghost: "fantasma 👻",
    steel: "acero ⛓️",
    fire: "fuego 🔥",
    water: "agua 💧",
    grass: "planta 🌱",
    electric: "eléctrico ⚡",
    psychic: "psíquico 🧠",
    ice: "hielo ❄️",
    dragon: "dragón 🐉",
    dark: "siniestro 🌑",
    fairy: "hada 🧚",
};

const callAPI = () => {
    const pokemonName = pokemonNameInput.value.toLowerCase(); // Obtener el nombre del Pokémon ingresado y convertirlo a minúsculas
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.sprites && data.sprites.front_default) {
                pokeImg.src = data.sprites.front_default;
            } else {
                pokeImg.src = ""; // Limpiar la imagen si no hay datos válidos
            }
            name.innerText = `Nombre: ${convertir(data.name)}`
            base_experience.innerText = `Experiencia Base: ${data.base_experience || 'N/A'}`// Mostrar 'N/A' si no hay experiencia base
            const tipoEnIngles = data.types[0].type.name || 'N/A';
            const tipoEnEspanol = tipoMapping[tipoEnIngles] || 'N/A';
            pokeTipo.innerText = `Tipo: ${convertir(tipoEnEspanol)}`;
        })// Mostrar 'N/A' si no hay tipo             
        .catch(e => console.log(new Error(e)));
}

function convertir(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

apiButton.addEventListener('click', callAPI);
