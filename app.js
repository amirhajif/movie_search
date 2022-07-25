//variables
const movieSearchBox = document.querySelector('#movie-search-box')
const searchList = document.querySelector('#search-list')
const resultGrid = document.querySelector('#result-grid')


async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    console.log(data)
}

loadMovies('lord of the rings')