const getPokemonBtn = document.getElementById('get-pokemon');
const areaInfo = document.getElementById('areaInfo');

getPokemonBtn.addEventListener('click', () => {
    const pokemonSelect = document.getElementById('pokemon-select').value;
    fetchPokemon(pokemonSelect);
  });

function fetchPokemon(pokemonName) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
    .then(data => {
       showPokemonInfo(data);
        /*console.log(data.name);
        console.log(data.weight);
        console.log(data.height);
        console.log(data);*/
    })
    .catch(error => {
      console.log('No se pudo obtener el Pokémon. Error:', error);
    });
}
function showPokemonInfo(data) {
  areaInfo.innerHTML = '';

  const namePokemon = document.createElement('li');
  namePokemon.textContent = `Nombre: ${data.name}`;

  const species = document.createElement('li');
  species.textContent = `Especie: ${data.species.name}`;

  const typePokemon = document.createElement('li');
 //typePokemon.textContent = `Tipo: ${data.types[0].type.name}`; --->solo muestra el primero si tiene mas no
  typePokemon.textContent = `Tipo: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}`;

  const height = document.createElement('li');
  height.textContent = `Altura: ${data.height}`;

  const weight = document.createElement('li');
  weight.textContent = `Peso: ${data.weight}`;

  const image = document.createElement('img');
  image.src = data.sprites.front_default;
  image.alt = data.name;
  
  areaInfo.appendChild(namePokemon);
  areaInfo.appendChild(species);
  areaInfo.appendChild(typePokemon);
  areaInfo.appendChild(height);
  areaInfo.appendChild(weight);
  areaInfo.appendChild(image);
}