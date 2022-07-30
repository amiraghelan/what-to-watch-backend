const express = require("express");
const bodyParser = require("body-parser");

const tmdb = require("./util/tmdb-handler");
const points = require("./model/points");

app = express();

app.use(bodyParser.json());

// fetches the currently playing movies from tbdb
app.get("/now_playing", (req, res) => {
  console.log(req.body.page);
  tmdb
    .nowPlaying()
    .then((movies, page, totalPages) => {
      res.json({
        movies: movies,
        page: page,
        totalPages,
        totalPages,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// return the total likes number of the movie and checks if the user has liked the movie
app.get("/movies_likes", (req, res) => {
  const { user_id: user_id, movie_id: movie_id } = req.body;

  let userLikeValue;
  let totalLikes = 0;

  points
    .checkUserLike(user_id, movie_id)
    .then(([rows]) => {
      userLikeValue = rows.length > 0 ? rows[0].point : 0;
    })
    .then(
      points.movieTotalLikes(movie_id).then(([rows]) => {
        totalLikes = rows[0]["SUM(point)"]
        totalLikes = totalLikes ? totalLikes : 0
        res.json({
          userLikeValue: userLikeValue,
          totalLikes: totalLikes,
        });
      })
    );
});

// give a movie a point(like or dislike) from the user
app.post("/point", (req, res) => {
  const { user_id: user_id, movie_id: movie_id, point: point } = req.body;

  points.checkUserLike(user_id, movie_id).then(([rows]) => {
    if (rows.length > 0) {
      if (point != rows[0].point) {
        points.updatePoint(user_id, movie_id, point);
      }
      res.send("updated");
    } else {
      points.addPoint(user_id, movie_id, point);
      res.send("added point");
    }
  });
});

app.listen(3000);
