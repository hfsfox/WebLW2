const API = 'https://pokeapi.co/api/v2/';
let pokemons = [];
const poke_list = document.querySelector('.poke-list');
const countofPokemons = document.querySelector('.count-of-pokemon');
const Search = document.querySelector('.search');

if (!!getLS('pokemons')) {
  printPokemons(getLS('pokemons'));
}

function setLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Получение списка из API и сохранение в localStorage
function updateLS() {
  fetch(API)
    .then(response => {
        return response.json()
    })
    .then(data => {
      const promises = data.results.map(pokemon => {
        return fetch(pokemon.url)
          .then(response => {
            return response.json()
        })
          .then(data => {
            return {
              name: pokemon.name,
              pokePic: data.sprites.front_default,
              height: data.height,
              weight: data.weight,
              element: data.types[0].type.name,
            };
          });
      });
      return Promise.all(promises);
    })
    .then(pokemons => {
      setLS('pokemons', pokemons);
      printPokemons(pokemons);
    })
  .catch(error => console.log(error));
}

// Вывод покемонов или Not Found;
function printPokemons(list) {
  let temp = '';
  if (list && list.length) {
    for (let i = 0; i < list.length; i++) {
      temp += `<ul class="pokemon_banner"><img src="${
        list[i].pokePic}"><li> ${
        list[i].name[0].toUpperCase()}${
        list[i].name.substring(1)}</li><li>Element: ${
        list[i].element}</li><li>Height: ${
        list[i].height}</li><li>Weight: ${
        list[i].weight}</li><input class="delete_Button" type="button" value="Delete" data-index="${i}"></ul>`;
      }
    
    //Счетчик покемонов;
    countofPokemons.innerHTML = `${list.length} pokemons`;
  } else {
    temp += '<h1 class="NF">Not Found!</h1>';
    countofPokemons.innerHTML = '0 pokemons';
  }
  poke_list.innerHTML = temp;
}


// Удаление покемона;
poke_list.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete_Button')) {
      const tempArr = getLS('pokemons');
      tempArr.splice(e.target.getAttribute('data-index'), 1);
      localStorage.setItem('pokemons', JSON.stringify(tempArr));
      printPokemons(getLS('pokemons'));
    }
});


// Живой поиск;
Search.addEventListener('input', function () {
  const query = this.value.toString().toLowerCase();
  const filterPoke = getLS('pokemons').filter((el) => {
    return ~el.name.toLowerCase().indexOf(query);
  });
  printPokemons(filterPoke);
});