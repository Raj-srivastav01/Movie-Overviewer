const API_URL = 'https://moviedatabase8.p.rapidapi.com/Discover';
const SEARCH_API = 'https://moviedatabase8.p.rapidapi.com/Search/';
const IMG_PATH = 'https://image.tmdb.org/t/p/original';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const headers = {
  'x-rapidapi-host': 'moviedatabase8.p.rapidapi.com',
  'x-rapidapi-key': '1b15071517msh7d353762c14d673p1f6f4fjsn4d6dc1e15cac'
};

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url, { headers });
    const data = await res.json();

    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);

        search.value = '';
    } else {
        window.location.reload();
    }
});
