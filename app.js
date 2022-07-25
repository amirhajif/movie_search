//variables
const movieSearchBox = document.querySelector('#movie-search-box')
const searchList = document.querySelector('#search-list')
const resultGrid = document.querySelector('#result-grid')


async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //check the response be ok 
    if(data.Response== "True"){
        //all data about videos exist in Search of data
        displayMovieList(data.Search)
    }
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim()
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list')
        loadMovies(searchTerm)
    }
    else{
        searchList.classList.add('hide-search-list')
    }
}

function displayMovieList(movies){

}