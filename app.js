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
    //for get movie all data from omdbapi 
    function loadMovieDetails(){
        //collect all items show in search list bae on text in searchListMovies array
        const searchListMovies = searchList.querySelectorAll('.search-list-item')
        //add click event to all items show in search list
        searchListMovies.forEach(movie => {
            movie.addEventListener('click',async()=>{
                //hide all suggested movie in search list
                searchList.classList.add('hide-search-list')
                //empty textbox for search movie
                movieSearchBox.value=""
                //get result
                const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9ed8b13b`)
                const movieDetail = await result.json()
                //call displayeMovieDetails for show movie all detail in page
                displayeMovieDetails(movieDetail)
            })

        });
    }
    //for show movie details completely in page
    function displayeMovieDetails(movieDetail){
         resultGrid.innerHTML=`
            <div class="movie-poster">
              <img src="${(movieDetail.Poster!="N/A")?movieDetail.Poster:"./images/image_not_found.png"}"  alt="movie poster" />
            </div>
            <div class="movie-info">
              <h3 class="movie-title">${movieDetail.Title}</h3>
              <ul class="movie-misc-info">
                <li class="year">Year: ${movieDetail.Year}</li>
                <li class="rated">Ratings: ${movieDetail.Rated}</li>
                <li class="released">Released: ${movieDetail.Released}</li>
              </ul>
              <p class = "genre"><b>Genre:</b> ${movieDetail.Genre}</p>
              <p class = "writer"><b>Writer:</b> ${movieDetail.Writer}</p>
              <p class = "actors"><b>Actors: </b>${movieDetail.Actors}</p>
              <p class = "plot"><b>Plot:</b> ${movieDetail.Plot}</p>
              <p class = "language"><b>Language:</b> ${movieDetail.Language}</p>
              <p class = "awards"><b><i class = "fas fa-award"></i></b> ${movieDetail.Awards}</p>
            </div>
         `
    }
