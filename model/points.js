const db = require("./database");

module.exports.checkUserLike = (user_id, movie_id) => {
  return db.execute(
    "SELECT point FROM likes WHERE user_id=? AND movie_id=? LIMIT 1",
    [user_id, movie_id]
  );
};

module.exports.movieTotalLikes = (movie_id) => {
  return db.execute("SELECT point FROM likes WHERE movie_id=?", [movie_id]);
};

module.exports.updatePoint = (user_id, movie_id, point) => {
  return db.execute(
    "UPDATE likes SET point=?, timestamp=CURRENT_TIMESTAMP() WHERE user_id = ? AND movie_id=?",
    [point, user_id, movie_id]
  );
};

module.exports.addPoint = (user_id, movie_id, point) => {
  return db.execute(
    "INSERT INTO likes (user_id, movie_id, point) VALUES (?,?,?)",
    [user_id, movie_id, point]
  );
};
