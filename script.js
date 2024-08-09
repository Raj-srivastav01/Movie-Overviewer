const API_URL = 'https://moviedatabase8.p.rapidapi.com/Search/'; // Update if needed
const API_KEY = '1b15071517msh7d353762c14d673p1f6f4fjsn4d6dc1e15cac';
const SEARCH_API = 'https://moviedatabase8.p.rapidapi.com/Search'; // Update if needed
const IMG_PATH = 'https://image.tmdb.org/t/p/original/'; // Image base URL from TMDb

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get initial movies
getMovies(API_URL);

async function getMovies(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Host': 'moviedatabase8.p.rapidapi.com',
                'X-RapidAPI-Key': API_KEY
            }
        });
        const data = await response.json();
        showMovies(data.results); // Adjust based on API response
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
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
        getMovies(`${SEARCH_API}?query=${encodeURIComponent(searchTerm)}`);

        search.value = '';
    } else {
        window.location.reload();
    }
});
