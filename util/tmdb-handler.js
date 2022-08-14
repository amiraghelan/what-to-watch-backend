require("dotenv").config();

const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
});

module.exports.nowPlaying = (page = 1) => {
  return new Promise((resolve, reject) => {
    instance
      .get("/movie/now_playing", {
        params: {
          api_key: process.env.TMDB_API_KEY,
          page: page,
        },
      })
      .then((res) => {
        movieRaw = res.data.results;
        let totalPages = res.data.total_pages;
        let page = res.data.page;
        const movies = [];
        movieRaw.forEach(({ id, title, poster_path, release_date }) => {
          movie = {
            id: id,
            title: title,
            posterPath: poster_path,
            releaseDate: release_date,
          };
          movies.push(movie);
        });
        console.log(page,totalPages)
        resolve({
          movies:movies,
          page: page,
          totalPages: totalPages});
      })
      .catch((err) => {
        reject(err)
      });
  });
};
