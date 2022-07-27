//variables
const movieSearchBox = document.querySelector('#movie-search-box')
const searchList = document.querySelector('#search-list')
const resultGrid = document.querySelector('#result-grid')


async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=9ed8b13b`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    //check the response be ok 
    if(data.Response== "True"){
        //all data about videos exist in Search of data
        displayMovieList(data.Search)
    }
}

//keyup event for show suggested movie based on text written
function findMovies(){
    //save text with trim 
    let searchTerm = (movieSearchBox.value).trim()
    //when text written
    if(searchTerm.length > 0){
        //delete display none 
        searchList.classList.remove('hide-search-list')
        //get movies from api and display them
        loadMovies(searchTerm)
    }
    else{
        //add display none 
        searchList.classList.add('hide-search-list')
    }
}

//for showing on time searched movie base on written text on search box
function displayMovieList(movies){
    //complete search list based on movies get from api
    searchList.innerHTML=""
    movies.forEach(movie => {
        //create a division for build videos deatails
        let movieListItem = document.createElement('div')
        //dataset of video add from imdbID in api
        movieListItem.dataset.id=movie.imdbID;
        //add class list
        movieListItem.classList.add('search-list-item')
        //movie poster on api has 2 state:1-N/A without poster
        //2-has poster and load from api
        if(movie.Poster!=="N/A"){
            //load poster from Poster in api response
            moviePoster=movie.Poster
        }
        else{
            //if image dosent set load not found image 
            moviePoster='./images/image_not_found.png'
        }
        //set movie poster and Title and Year of video from api result
        movieListItem.innerHTML=`
              <div class="search-item-thumbnail">
                <img src="${moviePoster}" />
              </div>
              <div class="search-item-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
              </div>
        `
        // add completed division into parent element for show on search 
        searchList.appendChild(movieListItem)

    });
    //load movie after searching and press enter
    loadMovieDetails()
}
    function loadMovieDetails(){
        const searchListMovies = searchList.querySelectorAll('.search-list-item')
        searchListMovies.forEach(movie => {
            movie.addEventListener('click',async()=>{
                // console.log(movie.dataset.id)
                searchList.classList.add('hide-search-list')
                movieSearchBox.value=""
                const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9ed8b13b`)
                // console.log(result)
                const movieDetail = await result.json()
                console.log(movieDetail)
                displayeMovieDetails(movieDetail)
            })

        });
    }
    function displayeMovieDetails(movieDetail){
         
    }
