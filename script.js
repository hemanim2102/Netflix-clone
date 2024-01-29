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

        // const setMovie =
        //     data.results[Math.floor(Math.random() * data.results.length - 1)];

        // var banner = document.getElementById("Banner");
    })