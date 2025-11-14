
let seats = null;
let movies = null;


async function setMoviePoster(movie) {
    const posterImageEl = document.getElementById("movie-poster");
    posterImageEl.src = movie.poster;
}

function setMovieDetails() {
    const id = seats.selectedMovieId;
    let selectedMovie = null;
    for(let movie of movies.movies){
        if(movie.id === id){
            selectedMovie = movie;
        }
    }
    setSimpleId("next-movie-text",selectedMovie.name);
    setMoviePoster(selectedMovie);
}

function updateUi(){
    setSimpleId("next-hall-text",seats.selectedHall);
    setSimpleId("next-movie-text",seats.selectedMovie);
    setMovieDetails();
}

function setSimpleId(id,text){
    const element = document.getElementById(id);
    element.innerText = text
}
async function initDataFromFile() {
    const rawSeatsData = await fetch('seats.json')
    seats = await rawSeatsData.json()
    console.log(seats)
    const rawMovieData = await fetch('movies.json')
    movies = await rawMovieData.json()
    console.log(movies)
}

document.addEventListener("DOMContentLoaded",async () => {
    await initDataFromFile();
    updateUi();
})