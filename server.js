import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import {
  rootController,
  notesController,
  searchController,
  reviewController,
  queryResults,
  queryCache,
} from "./controllers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 3000;

// serve static files from 'dist' folder in root directory
app.use(express.static("dist"));

// parse URL-encoded data submitted by forms (makes accessible through req.body)
app.use(express.urlencoded({ extended: true }));

// render homepage at root route
app.get("/", (req, res) => {
  rootController(req, res);
});

// render homepage + query results at root
app.post("/", (req, res) => {
  searchController(req, res);
});

app.post("/review", (req, res) => {
  reviewController(req, res);
});

app.get("/notes", (req, res) => {
  notesController(req, res);
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
