/* p.search.dal.js
   Anything to do with the films in the DVD rentals database;
   getFilmsDisplay() - fetches all the flims in the database.
   getFilmDetails() - fetches the details of films from the database; description, rating, etc.

   Author: David Bishop
   Creation Date: July 13, 2022
   Updates:
   Date, Author, Description
   July 13, 2022, David, inital set up; require method.
   July 14 2022, David, implemented getFilmsDisplay() and getFilmDetails() using async await.

*/

const dal = require("../postgres.db.config");

const titleSearch = async (title) => {
  let response;
  try {
    response = await dal.query("SELECT * FROM film_list WHERE title = $1;", [
      title,
    ]);
    return response.rows;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { titleSearch };
