let seats = null;
let movies = null;


async function setMoviePoster(movie) {
    const posterImageEl = document.getElementById("movie-poster");
    posterImageEl.src = movie.poster;
}

async function setMovieDetails(id) {
    let selectedMovie = null;
    for(let movie of movies.movies){
        if(movie.id === id){
            selectedMovie = movie;
        }
    }
    setSimpleId("next-movie-text",selectedMovie.name);
    await setMoviePoster(selectedMovie);
}

async function updateUi(){
    setSimpleId("next-hall-text",seats.selectedHall);
    const selectedHall = seats.hallsData.find(hall => hall.name === seats.selectedHall)
    const selectedMovieId = selectedHall.selectedMovieId;
    await setMovieDetails(selectedMovieId);
    const selectedMovie = getSelectedMovie();
    const seatsState = selectedMovie.seats;
    const seatsUis = document.getElementsByClassName("seat")
    for(let seatUi of seatsUis){
        const col = seatUi.dataset.col;
        const row = seatUi.dataset.row;
        const key = row + col;
        const stateSeat = seatsState.find(el => el.key === key)
        seatUi.dataset.reserved = stateSeat.reserved;
    }
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

function nextHall() {
    const oldHall = seats.selectedHall;
    const oldHallIndex = seats.hallsData.findIndex(hall => hall.name === oldHall);
    let newHallIndex = oldHallIndex + 1;
    if(newHallIndex >= seats.hallsData.length){
        newHallIndex = 0;
    }
    const newHall = seats.hallsData[newHallIndex];
    seats.selectedHall = newHall.name;
    updateUi();
}
function prevHall() {
    const oldHall = seats.selectedHall;
    const oldHallIndex = seats.hallsData.findIndex(hall => hall.name === oldHall);
    let newHallIndex = oldHallIndex - 1;
    if(newHallIndex < 0){
        newHallIndex = seats.hallsData.length - 1;
    }
    const newHall = seats.hallsData[newHallIndex];
    seats.selectedHall = newHall.name;
    updateUi();
}

function getSelectedHall() {
    return seats.hallsData.find(hall => hall.name === seats.selectedHall)
}
function getSelectedMovie(){
    const selectedHall = getSelectedHall();
    const movieId = selectedHall.selectedMovieId;
    return selectedHall.movies.find(movie => movie.id === movieId);
}
function nextMovie() {
    const selectedHall = getSelectedHall();
    const oldMovieId = selectedHall.selectedMovieId;
    const oldMovieIndex = selectedHall.movies.findIndex(movie => movie.id === oldMovieId);
    let newMovieIndex = oldMovieIndex + 1;
    if(newMovieIndex >= selectedHall.movies.length){
        newMovieIndex = 0;
    }
    console.log(`new movie index: ${newMovieIndex}`)
    const newMovieId = selectedHall.movies[newMovieIndex].id;
    selectedHall.selectedMovieId = newMovieId;
    console.log(`new movie id: ${newMovieId}`)
    updateUi();
}
function prevMovie() {
    const selectedHall = getSelectedHall();
    const oldMovieId = selectedHall.selectedMovieId;
    const oldMovieIndex = selectedHall.movies.findIndex(movie => movie.id === oldMovieId);
    let newMovieIndex = oldMovieIndex - 1;
    if(newMovieIndex < 0){
        newMovieIndex = selectedHall.movies.length - 1;
    }
    console.log(`new movie index: ${newMovieIndex}`)
    const newMovieId = selectedHall.movies[newMovieIndex].id;
    selectedHall.selectedMovieId = newMovieId;
    console.log(`new movie id: ${newMovieId}`)
    updateUi();
}