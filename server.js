import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = 3000;

// serve static files from 'dist' folder in root directory
app.use(express.static('dist'));

// parse URL-encoded data submitted by forms (makes accessible through req.body)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/dist/index.html');
});

app.get('/search', async (req, res) => {
console.log('triggered!')
res.redirect('/')
})

// any route not defined is 404'ed
app.use('*', (req, res) => {
  return res.status(404).send('404: Page not found- you silly goose');
});

// Global Error Handler
app.use((error, req, res, next) => {
  const defaultMessage = 'Uh-oh SpaghettiOs (something went wrong)!';
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

Use devServer.proxy to send HTTP reqs to:
 https://api.openbrewerydb.org/v1/breweries/autocomplete each time 
 a character is entered


*/
