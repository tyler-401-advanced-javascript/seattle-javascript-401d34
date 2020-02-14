const axios = require('axios'); // axios is a library to make API calls
const POKEAPI_URL = 'https://pokeapi.co/api/v2';

async function getPokemon(name) {
  const response = await axios.get(`${POKEAPI_URL}/pokemon/${name}`);
  return response;
}

async function getLotsOfPokemon() {
  // const ditto = await getPokemon('ditto');
  // const zapdos = await getPokemon('zapdos');
  // const articuno = await getPokemon('articuno');
  // const mew = await getPokemon('mew');

  // const pokemon = [ditto, zapdos, articuno, mew];
  const pokemon = [
    await getPokemon('ditto'),
    await getPokemon('pikachu'),
  ];
  pokemon.forEach(p => console.log(p.data.name));
}

getLotsOfPokemon();

async function myFunction() {
  return 'abcdef';
}
myFunction();
