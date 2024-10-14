import axios from "axios";
import db from "./db.js";

// initialize query data and cache
let queryResults = undefined;
const queryCache = {};


db.connect().catch((err) => {
  console.error("Error connecting to database", err);
});

const rootController = (req, res) => {
  return res.render("./home-page/index.ejs", { queryResults: queryResults });
};

const notesController = async (req, res) => {
  const getAllReviews = async () => {
    try {
      const query = {
        text: "SELECT * FROM reviews",
      };
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      console.error("Error fetching items", error);
      return [];
    }
  };

  const items = await getAllReviews();
  console.log(items);

  return res.render("./notes-page/index.ejs");
};

const searchController = async (req, res) => {
  console.log(req.body);

  // pull query from input, and format the data (lowercase and no white space)
  const queryParams = req.body.query.toLowerCase().trim();
  /* if the most recent query has been cached, render the homepage with the 
    corresponding results */
  if (queryParams in queryCache) {
    console.log(queryCache, "\nFOUND in cache!");

    // pull the results of the previously made query from the cache
    queryResults = queryCache[queryParams];

    // render the homepage with the cached query key-value pair
    return res.render("./home-page/index.ejs", {
      queryResults: queryResults,
    });
  } else {
    /* if the most recent query has NOT been cached, make API call with the
    most recent query as the URL query parameter, then add the query as a
    key to the cache and the response data as the value */
    // make async call to API with necessary Axios Request Config object
    try {
      console.log("NOT found in cache!");
      const response = await axios(
        // Request Config object
        {
          method: "GET",
          url: "https://api.openbrewerydb.org/v1/breweries/autocomplete",
          params: { query: queryParams },
        },
      );
      // add the most recent query and its response data to the cache
      queryCache[queryParams] = response.data;
      // render the homepage with the (now) cached query key-value pair
      return res.render("./home-page/index.ejs", {
        queryResults: response.data,
      });
    } catch (error) {
      // if error encountered during API call, log it to the console
      console.log(error);
    }
  }
};

const reviewController = (req, res) => {
  console.log(JSON.parse(req.body.selectedBreweryDetails));
  console.log(req.body.reviewText)
  console.log(req.body.selectedRating)
  res.redirect('/')
};

export {
  rootController,
  notesController,
  searchController,
  reviewController,
  queryResults,
  queryCache,
};
