import axios from "axios";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 3000;

let queryResults = undefined;
const queryCache = {};

// serve static files from 'dist' folder in root directory
app.use(express.static("dist"));

// parse URL-encoded data submitted by forms (makes accessible through req.body)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.render("index.ejs", { queryResults: queryResults });
});

app.post("/search", async (req, res) => {
  console.log(req.body);
  console.log("server-side reached");
  const lastTheme = req.body.currentThemeSetting
  const queryParams = req.body.query.toLowerCase().trim();
  if (queryParams in queryCache) {
    console.log("found in cache! ", queryCache);
    queryResults = queryCache[queryParams];
    return res.render("index.ejs", {
      queryResults: queryResults,
      lastQuery: queryParams,
      lastTheme: lastTheme
    });
  } else {
    try {
      console.log("NOT found in cache!");
      const response = await axios({
        method: "GET",
        url: "https://api.openbrewerydb.org/v1/breweries/autocomplete",
        params: { query: queryParams },
      });
      // console.log(JSON.stringify(response.data));
      queryCache[queryParams] = response.data;
      return res.render("index.ejs", {
        queryResults: response.data,
        lastQuery: queryParams,
        lastTheme: lastTheme
      });
    } catch (error) {
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

/* 

**DEBOUNCE** User begins typing in search bar --> when user stops typing for (?) 1000ms, call API -->
if user begins typing again within the 1000ms timeframe, reset timer --> 
**CACHE** --> if timer has reached 0, send API call and cache search term and corresponding results -->
before sending another API call (if time has elapsed) check if search term is included in cache keys -->
if search term is a cache key, return value (search results) and do not initiate debounce again unless 
search term has changed --> if search term is not a cache key, make API call

*/
