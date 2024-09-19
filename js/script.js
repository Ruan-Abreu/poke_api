let currentPokemonId = 1;

const pokemonName = document.querySelector('.pokemon__name');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonIdInput = document.getElementById('pokemon-id');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const goBtn = document.getElementById('go-btn');

// Buscar Pokémon pela API
async function fetchPokemon(query) {
    const url = isNaN(query) 
        ? `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}` 
        : `https://pokeapi.co/api/v2/pokemon/${query}`;
    
    try {
        const APIResponse = await fetch(url);
        if (!APIResponse.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const data = await APIResponse.json();
        pokemonName.textContent = data.name.toUpperCase();
        pokemonImage.src = data.sprites.front_default;
        changeBackgroundColor(data.types[0].type.name);
    } catch (err) {
        pokemonName.textContent = 'Não encontrado';
        pokemonImage.src = './img/favicon-16x16.png';
        document.body.style.background = 'linear-gradient(to bottom, #000000, #ffffff)';
    }
}

// Essa função vai mudar a cor de fundo com base no tipo do Pokémon
function changeBackgroundColor(type) {
  let color;
  switch(type) {
      case 'fire':
          color = 'linear-gradient(to bottom, #f85757, #fff)';
          break;
      case 'water':
          color = 'linear-gradient(to bottom, #6ab7f5, #fff)';
          break;
      case 'grass':
          color = 'linear-gradient(to bottom, #48c774, #fff)';
          break;
      case 'electric':
          color = 'linear-gradient(to bottom, #f9f871, #fff)';
          break;
      case 'psychic':
          color = 'linear-gradient(to bottom, #d441d8, #fff)';
          break;
      case 'ice':
          color = 'linear-gradient(to bottom, #a0f1ff, #fff)';
          break;
      case 'dragon':
          color = 'linear-gradient(to bottom, #ff8c42, #fff)';
          break;
      case 'dark':
          color = 'linear-gradient(to bottom, #333333, #fff)';
          break;
      case 'flying':
          color = 'linear-gradient(to bottom, #ADD8E6, #fff)';
          break;
      case 'normal':
          color = 'linear-gradient(to bottom, #d3d3d3, #fff)';
          break;
      case 'fighting':
          color = 'linear-gradient(to bottom, #c03028, #fff)';
          break;
      case 'poison':
          color = 'linear-gradient(to bottom, #6f35fc, #fff)';
          break;
      case 'ground':
          color = 'linear-gradient(to bottom, #e0c068, #fff)';
          break;
      case 'rock':
          color = 'linear-gradient(to bottom, #b6a136, #fff)';
          break;
      case 'bug':
          color = 'linear-gradient(to bottom, #a8b820, #fff)';
          break;
      case 'ghost':
          color = 'linear-gradient(to bottom, #705898, #fff)';
          break;
      case 'steel':
          color = 'linear-gradient(to bottom, #b7b7b7, #fff)';
          break;
      case 'fairy':
          color = 'linear-gradient(to bottom, #ee99ac, #fff)';
          break;
      case 'default':
          color = 'linear-gradient(to bottom, #000000, #fff)';
          break;
      default:
          color = 'linear-gradient(to bottom, #000000, #fff)';
  }
  document.body.style.background = color;
}




// Buscar Pokémon pelo ID ou nome inserido
goBtn.addEventListener('click', () => {
    const query = pokemonIdInput.value.trim();
    if (query) {
        fetchPokemon(query);
    } else {
        alert('Por favor, insira um nome ou ID válido.');
    }
});

// Avançar para o próximo Pokémon
nextBtn.addEventListener('click', () => {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
});

// Voltar para o Pokémon anterior
prevBtn.addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
});

document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();
    const query = pokemonIdInput.value.trim();
    if (query) {
        fetchPokemon(query);
    } else {
        alert('Por favor, insira um nome ou ID válido.');
    }
});

fetchPokemon(currentPokemonId);
