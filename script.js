document.getElementById("fetchMovies").addEventListener("click", function () {
  fetchRandomMovies();
});

function fetchRandomMovies() {
  const apiKey = "534e7c79cbce5680c3a9fe6d552dee34";
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${
    Math.floor(Math.random() * 500) + 1
  }`;

  fetch(url)
    .then((response) => response.json()) // Convert the response to JSON
    .then((data) => {
      displayMovies(data.results); // Call displayMovies with the results
    })
    .catch((error) => {
      console.error("Error fetching data: ", error); // Log any errors to the console
    });
}

function displayMovies(movies) {
  const moviesList = document.getElementById("moviesList");
  const template = document.getElementById("movieTemplate").children[0]; // Access the first child of the hidden template

  moviesList.innerHTML = ""; // Clear previous movies

  movies.slice(0, 5).forEach((movie) => {
    const movieClone = template.cloneNode(true);
    movieClone.style.display = "block"; // Make the clone visible

    const img = movieClone.querySelector(".movie-image");
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.alt = movie.title;

    const title = movieClone.querySelector(".movie-title");
    title.textContent = movie.title;

    movieClone.onclick = function () {
      fetchMovieDetails(movie.id);
    };

    moviesList.appendChild(movieClone); // Append each movie to the list
  });
}

function fetchMovieDetails(movieId) {
  const apiKey = "534e7c79cbce5680c3a9fe6d552dee34";
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((movie) => {
      displayMovieDetails(movie);
      document.getElementById("detail-card").style.display = "flex"; // Show the detail card as an overlay
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
    });
}

function displayMovieDetails(movie) {
  const detailsDiv = document.getElementById("movieDetails");
  document.getElementById(
    "detail-image"
  ).src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  document.getElementById("detail-title").textContent = movie.title;
  document.getElementById("detail-overview").textContent = movie.overview;
  document.getElementById(
    "detail-release"
  ).textContent = `Release Date: ${movie.release_date}`;
  document.getElementById(
    "detail-rating"
  ).textContent = `Rating: ${movie.vote_average} / 10`;
  document.getElementById("detail-card").style.display = "flex"; // Show the detail card
}

function closeDetails() {
  document.getElementById("detail-card").style.display = "none"; // Hide the detail card
}