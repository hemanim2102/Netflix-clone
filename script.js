// base url of the site
const base_url = "https://api.themoviedb.org/3";

//api key
const api_key = "api_key=d9b8ceb521e6d5a18d56f66bad20676b";

const img_url = "https://image.tmdb.org/t/p/w500";
const banner_url = "https://image.tmdb.org/t/p/original/";

const paths = {
    fetchAllCategories: `${base_url}/genre/movie/list?${api_key}&language=en-US`,
    fetchMovieList: (id) => `${base_url}/discover/movie?${api_key}&with_genres= ${id}`,
}

// function init() {
//     fetch_and_build_AllSections();
// }

// function fetch_and_build_AllSections() {
//     fetch(paths.fetchAllCategories)
//         .then(res => res.json())
//         .then(res => {
//             const categories = res.genres;
//             console.table(categories);
//         })
//         .catch(err => console.error(err));
// }

// init();

//requesting for data

const requests = {
    NetflixOriginals: `${base_url}/discover/tv?${api_key}&with_networks=213`,
    Trending: `${base_url}/trending/all/week?${api_key}&language=en-US`,
    // ActionMovies: `${base_url}/discover/movie?${api_key}&with_genres= 28`,
    // ComedyMovies: `${base_url}/discover/movie?${api_key}&with_genres= 35`,
    // HorrorMovies: `${base_url}/discover/movie?${api_key}&with_genres= 27`,
    // RomanceMovies: `${base_url}/discover/movie?${api_key}&with_genres= 10749`,
    // Documentaries: `${base_url}/discover/movie?${api_key}&with_genres= 99`,
};

//to truncate long data
function truncateString(str, maxLength) {
    if (typeof str !== 'string' || typeof maxLength !== 'number' || maxLength <= 0) {
        console.error('Invalid input. Please provide a valid string and a positive numeric maxLength.');
        return str;
    }

    if (str.length <= maxLength) {
        return str;
    } else {
        return str.substring(0, maxLength - 1) + '...';
    }
}

// // Example usage:
// const originalString = "This is a long string that needs to be truncated.";
// const truncatedString = truncateString(originalString, 20);
// console.log(truncatedString); // Output: "This is a long stri..."

//for banner
fetch(requests.NetflixOriginals)
    .then((res) => res.json())

    .then((data) => {
        // console.log(data.results);

        const setMovie =
            data.results[Math.floor(Math.random() * data.results.length - 1)];

        var banner = document.getElementById("Banner");
        var banner_title = document.getElementById("title");
        var banner_description = document.getElementById("description");

        banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
        banner.style.backgroundRepeat = "no-repeat";
        banner.style.backgroundSize = "100%";
        banner.style.backgroundPosition = "top";
        banner_description.innerText = truncateString(setMovie.overview, 150);
        banner_title.innerText = setMovie.name;
    });

//to display movie rows

//netflix originals
fetch(requests.NetflixOriginals)
    .then((res) => res.json())
    .then((data) => {
        const head_row = document.getElementById("head-row");
        const row = document.createElement("div");
        row.className = "row";
        row.classList.add("Netflix_row");
        head_row.appendChild(row);

        const title = document.createElement("h2");
        title.className = "row-title";
        title.innerText = "Netflix Originals";
        row.appendChild(title);

        const row_posters = document.createElement("div");
        row_posters.className = "row-posters";
        row.appendChild(row_posters);

        data.results.forEach((movie) => {

            const poster = document.createElement("img");
            poster.className = "row-poster-img";

            var s = movie.name.replace(/\s+/g, "");
            poster.id = s;
            poster.src = img_url + movie.poster_path;
            row_posters.appendChild(poster);
        });
    })

//trending movies
fetch(requests.Trending)
    .then((res) => res.json())
    .then((data) => {
        const head_row = document.getElementById("head-row");
        const row = document.createElement("div");
        row.className = "row";
        row.classList.add("Netflix_row");
        head_row.appendChild(row);

        const title = document.createElement("h2");
        title.className = "row-title";
        title.innerText = "Trending";
        row.appendChild(title);

        const row_posters = document.createElement("div");
        row_posters.className = "row-posters";
        row.appendChild(row_posters);

        data.results.forEach((movie) => {

            const poster = document.createElement("img");
            poster.className = "row-poster-img";

            var s1 = movie.id;
            poster.id = s1;
            poster.src = img_url + movie.poster_path;
            row_posters.appendChild(poster);
        });
    })

//for movie genres rows
function fetch_And_Build_Section(fetchUrl, category) {
    console.log(fetchUrl, category);

    //to fetch the row data
    fetch(fetchUrl)
        .then(res => res.json())
        .then(data => {
            const head_row = document.getElementById("head-row");
            const row = document.createElement("div");
            row.className = "row";
            row.classList.add("Netflix_row");
            head_row.appendChild(row);

            const title = document.createElement("h2");
            title.className = "row-title";
            title.innerText = category;
            row.appendChild(title);

            const row_posters = document.createElement("div");
            row_posters.className = "row-posters";
            row.appendChild(row_posters);

            data.results.forEach((movie) => {

                const poster = document.createElement("img");
                poster.className = "row-poster-img";

                var s2 = movie.id;
                poster.id = s2;
                poster.src = img_url + movie.backdrop_path;
                row_posters.appendChild(poster);
            });
        })
        .catch(err => console.error(err));
}

fetch_And_Build_Section(paths.fetchMovieList(28), "Action");
fetch_And_Build_Section(paths.fetchMovieList(35), "Comedy");
fetch_And_Build_Section(paths.fetchMovieList(27), "Horror");
fetch_And_Build_Section(paths.fetchMovieList(53), "Thriller");
fetch_And_Build_Section(paths.fetchMovieList(878), "Science Fiction");
fetch_And_Build_Section(paths.fetchMovieList(10749), "Romance");
fetch_And_Build_Section(paths.fetchMovieList(18), "Drama");
fetch_And_Build_Section(paths.fetchMovieList(10751), "Family");
fetch_And_Build_Section(paths.fetchMovieList(80), "Crime");
fetch_And_Build_Section(paths.fetchMovieList(36), "History");
fetch_And_Build_Section(paths.fetchMovieList(99), "Documentaries");
