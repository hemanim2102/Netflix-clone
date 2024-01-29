// base url of the site
const base_url = "https://api.themoviedb.org/3";

//api key
const api_key = "api_key=d9b8ceb521e6d5a18d56f66bad20676b";

const img_url = "https://image.tmdb.org/t/p/w500";
const banner_url = "https://image.tmdb.org/t/p/original/";

//requesting for data

const requests = {
    Trending: `${base_url}/trending/all/week?${api_key}&language=en-US`,
    NetflixOriginals: `${base_url}/discover/tv?${api_key}&with_networks=213`,
    ActionMovies: `${base_url}/discover/movie?${api_key}&with_genres= 28`,
    ComedyMovies: `${base_url}/discover/movie?${api_key}&with_genres= 35`,
    HorrorMovies: `${base_url}/discover/movie?${api_key}&with_genres= 27`,
    RomanceMovies: `${base_url}/discover/movie?${api_key}&with_genres= 10749`,
    Documentaries: `${base_url}/discover/movie?${api_key}&with_genres= 99`,
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
        console.log(data.results);

        const setMovie =
            data.results[Math.floor(Math.random() * data.results.length - 1)];

        var banner = document.getElementById("Banner");
        var banner_title = document.getElementById("title");
        var banner_description = document.getElementById("description");

        banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
        banner_description.innerText = truncateString(setMovie.overview, 150);
        banner_title.innerText = setMovie.name;
    });

//to display movie rows
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
        title.innerText = "NETFLIX ORIGINALS";
        row.appendChild(title);

        const row_posters = document.createElement("div");
        row_posters.className = "row-posters";
        row.appendChild(row_posters);

        data.results.forEach((movie) => {
            console.log(movie);
            const poster = document.createElement("img");
            poster.className = "row-poster-img";

            var s = movie.name.replace(/\s+/g, "");
            poster.id = s;
            poster.src = img_url + movie.poster_path;
            row_posters.appendChild(poster);
        });
    })