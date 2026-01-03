let seats = null;
let movies = null;

async function checkAuthAndInit() {
    const response = await fetch('/api/check-auth');
    const data = await response.json();

    if (data.authenticated) {
        localStorage.setItem("user", JSON.stringify(data.user));
    }
}


async function setMoviePoster(movie) {
    const posterImageEl = document.getElementById("movie-poster");
    posterImageEl.src = movie.poster;
}

async function setMovieInUi(id) {
    let selectedMovie = getMovieDetails(id);
    for (let movie of movies.movies) {
        if (movie.id === id) {
            selectedMovie = movie;
        }
    }
    setSimpleId("next-movie-text", selectedMovie.name);
    await setMoviePoster(selectedMovie);
}

function getMovieDetails(id) {
    let selectedMovie = null;
    for (let movie of movies.movies) {
        if (movie.id === id) {
            selectedMovie = movie;
        }
    }
    return selectedMovie;
}

async function initDataFromFile() {
    const storedSeats = localStorage.getItem("seats");
    const storedMovies = localStorage.getItem("movies");

    if (storedSeats && storedMovies) {
        seats = JSON.parse(storedSeats);
        movies = JSON.parse(storedMovies);
    } else {
        const rawSeatsData = await fetch('seats.json');
        seats = await rawSeatsData.json();
        const rawMovieData = await fetch('movies.json');
        movies = await rawMovieData.json();

        localStorage.setItem("seats", JSON.stringify(seats));
        localStorage.setItem("movies", JSON.stringify(movies));
    }
}

async function updateUi() {
    localStorage.setItem("seats", JSON.stringify(seats));
    localStorage.setItem("movies", JSON.stringify(movies))
    setSimpleId("next-hall-text", seats.selectedHall);
    const selectedHall = seats.hallsData.find(hall => hall.name === seats.selectedHall)
    const selectedMovieId = selectedHall.selectedMovieId;
    await setMovieInUi(selectedMovieId);
    const selectedMovie = getSelectedMovie();
    const seatsState = selectedMovie.seats;
    const seatsUis = document.getElementsByClassName("seat")
    for (let seatUi of seatsUis) {
        const col = seatUi.dataset.col;
        const row = seatUi.dataset.row;
        const key = row + col;
        const stateSeat = seatsState.find(el => el.key === key)
        seatUi.dataset.reserved = stateSeat.reserved;
        seatUi.dataset.selected = stateSeat.selected;
    }
    setSimpleId("movie-time", selectedMovie.time);
}

function setSimpleId(id, text) {
    const element = document.getElementById(id);
    element.innerText = text
}

function generateSeats() {
    const seatsContainer = document.getElementById('seats');
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const cols = 8;

    rows.forEach(row => {
        for (let col = 1; col <= cols; col++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            seat.dataset.row = row;
            seat.dataset.col = col;
            seat.dataset.reserved = 'false';
            seat.dataset.selected = 'false';
            seat.onclick = function () {
                selectSeat(this.dataset.row, this.dataset.col, this.dataset.selected);
            };
            seatsContainer.appendChild(seat);
        }
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await checkAuthAndInit();
    generateSeats();
    await initDataFromFile();
    updateUi();
})

function nextHall() {
    const oldHall = seats.selectedHall;
    const oldHallIndex = seats.hallsData.findIndex(hall => hall.name === oldHall);
    let newHallIndex = oldHallIndex + 1;
    if (newHallIndex >= seats.hallsData.length) {
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
    if (newHallIndex < 0) {
        newHallIndex = seats.hallsData.length - 1;
    }
    const newHall = seats.hallsData[newHallIndex];
    seats.selectedHall = newHall.name;
    updateUi();
}

function getSelectedHall() {
    return seats.hallsData.find(hall => hall.name === seats.selectedHall)
}

function getSelectedMovie() {
    const selectedHall = getSelectedHall();
    const movieId = selectedHall.selectedMovieId;
    return selectedHall.movies.find(movie => movie.id === movieId);
}

function nextMovie() {
    const selectedHall = getSelectedHall();
    const oldMovieId = selectedHall.selectedMovieId;
    const oldMovieIndex = selectedHall.movies.findIndex(movie => movie.id === oldMovieId);
    let newMovieIndex = oldMovieIndex + 1;
    if (newMovieIndex >= selectedHall.movies.length) {
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
    if (newMovieIndex < 0) {
        newMovieIndex = selectedHall.movies.length - 1;
    }
    console.log(`new movie index: ${newMovieIndex}`)
    const newMovieId = selectedHall.movies[newMovieIndex].id;
    selectedHall.selectedMovieId = newMovieId;
    console.log(`new movie id: ${newMovieId}`)
    updateUi();
}

function reserveSeat() {
    const selectedSeats = getSelectedMovie().seats.filter(seat => seat.selected);
    if (selectedSeats.length <= 0) {
        alert("Select a seat!");
        return;
    }
    const userData = JSON.parse(localStorage.getItem("user"))
    const selectedMovie = getSelectedMovie();
    const reservationData = {
        "name": userData.name,
        "email": userData.email,
        "phone": userData.mobile,
        "movie": getMovieDetails(selectedMovie.id).name,
        "showtime": selectedMovie.time,
        "seats": selectedSeats.map(seat => seat.key)
    }
    console.log(reservationData);
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "Post",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reservationData)
    }).then((response) => {
        if (response.ok) {
            for (let seat of selectedSeats) {
                seat.selected = false;
                seat.reserved = true;
            }
            updateUi();
        } else {
            alert(`Got error with code: ${response.status}`)
        }
    }).catch((error) =>
        alert(error)
    );
}

function selectSeat(row, col, selected) {
    const seat = getSeat(row, col);
    if (seat.reserved) {
        alert("You cant select a reserved seat!");
        return;
    }
    seat.selected = !(JSON.parse(selected));
    updateUi();
}

function getSeat(row, col) {
    const key = row + col;
    return getSelectedMovie().seats.find(seat => seat.key === key);
}