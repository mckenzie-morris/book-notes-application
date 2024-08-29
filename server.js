import axios from "axios";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 3000;

// initialize query data and cache
let queryResults = undefined;
const queryCache = {};

// serve static files from 'dist' folder in root directory
app.use(express.static("dist"));

// parse URL-encoded data submitted by forms (makes accessible through req.body)
app.use(express.urlencoded({ extended: true }));

// render homepage at root route
app.get("/", (req, res) => {
  return res.render("index.ejs", { queryResults: queryResults });
});

// render homepage + query results at '/search' endpoint
app.post("/search", async (req, res) => {
  console.log(req.body);
  // pull the current theme from input with 'type='hidden'
  const lastTheme = req.body.currentThemeSetting;
  // pull query from input, and format the data (lowercase and no white space)
  const queryParams = req.body.query.toLowerCase().trim();
  /* if the most recent query has been cached, render the homepage with the 
  corresponding results */
  if (queryParams in queryCache) {
    console.log(queryCache, "\nFOUND in cache!");
    // pull the results of the previously made query from the cache
    queryResults = queryCache[queryParams];
    // render the homepage with the cached query key-value pair
    return res.render("index.ejs", {
      queryResults: queryResults,
      lastQuery: queryParams,
      lastTheme: lastTheme,
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
      return res.render("index.ejs", {
        queryResults: response.data,
        lastQuery: queryParams,
        lastTheme: lastTheme,
      });
    } catch (error) {
      // if error encountered during API call, log it to the console
      console.log(error);
    }
  }
});

// any route not defined is 404'ed
app.use("*", (req, res) => {
  return res.status(404).send("404: Page not found- you silly goose");
});

// Global Error Handler
app.use((error, req, res, next) => {
  const defaultMessage = "Uh-oh SpaghettiOs (something went wrong)!";
  const message = error.message || defaultMessage;
  console.log(message);
  return res.status(500).send(message);
});

// start server on port 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// USE https://www.openbrewerydb.org/documentation/
