document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('movieForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const recommendation = document.getElementById('recommendation');
    const movieDetails = document.getElementById('movieDetails');
    const movieGrid = document.querySelector('.movie-grid');

    // Fetch and display recommended movies
    fetchRecommendedMovies();

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const mood = document.getElementById('mood').value;
        const genre = document.getElementById('genre').value;
        const platform = document.getElementById('platform').value;

        showLoading();

        try {
            const movieTitle = await getMovieRecommendation(mood, genre, platform);
            const movieInfo = await getMovieDetails(movieTitle);
            displayMovieDetails(movieInfo);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while fetching the recommendation. Please try again.');
        } finally {
            hideLoading();
        }
    });

    async function fetchRecommendedMovies() {
        try {
            const response = await fetch('https://www.omdbapi.com/?apikey=YOUR_OMDB_API_KEY&s=movie&type=movie&page=1');
            const data = await response.json();
            
            if (data.Search) {
                displayRecommendedMovies(data.Search.slice(0, 8));
            }
        } catch (error) {
            console.error('Error fetching recommended movies:', error);
        }
    }

    function displayRecommendedMovies(movies) {
        movieGrid.innerHTML = movies.map(movie => `
            <div class="movie-card">
                <img src="${movie.Poster}" alt="${movie.Title} Poster">
                <div class="movie-card-info">
                    <h3>${movie.Title}</h3>
                    <p>${movie.Year}</p>
                </div>
            </div>
        `).join('');
    }

    async function getMovieRecommendation(mood, genre, platform) {
        const response = await fetch('/api/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mood, genre, platform }),
        });

        if (!response.ok) {
            throw new Error('Failed to get movie recommendation');
        }

        const data = await response.json();
        return data.recommendation;
    }

    async function getMovieDetails(title) {
        const response = await fetch(`https://www.omdbapi.com/?apikey=YOUR_OMDB_API_KEY&t=${encodeURIComponent(title)}`);

        if (!response.ok) {
            throw new Error('Failed to get movie details');
        }

        return await response.json();
    }

    function displayMovieDetails(movie) {
        movieDetails.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <div class="movie-info">
                <h3>${movie.Title} (${movie.Year})</h3>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Cast:</strong> ${movie.Actors}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
            </div>
        `;

        recommendation.classList.remove('hidden');
        setTimeout(() => {
            recommendation.classList.add('show');
        }, 10);
    }

    function showLoading() {
        loadingIndicator.classList.remove('hidden');
        recommendation.classList.remove('show');
        recommendation.classList.add('hidden');
    }

    function hideLoading() {
        loadingIndicator.classList.add('hidden');
    }
});