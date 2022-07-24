require("dotenv").config();

const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
});

module.exports.nowPlaying = (cb,page=1) => {
  instance
    .get("/movie/now_playing", {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page:page
      },
    })
    .then((res) => {
     
      movieRaw = res.data.results;
      totalPages = res.data.total_pages
      page = res.data.page
      const movies = [];

      movieRaw.forEach(({id, title, poster_path, release_date}) => {
        movie = {
            id : id,
            title:title,
            posterPath:poster_path,
            releasDate:release_date
            
        }
        movies.push(movie)
      });
      cb(movies,page,totalPages)
    })
    .catch((err) => {
      console.log(err);
    });
};
