const express = require('express'); // loads the express module
// This is a simple Express.js server that responds with a JSON message
// when a GET request is made to the /hello endpoint.
// It listens on port 3000.
// To run this code, ensure you have Node.js and Express installed.
// To install Express, run: npm install express
// Think of Express like a toolbox for creating servers and APIs.

const app = express();
// This creates an "app" - your actual server instance.
// You’ll use app to define routes (like /hello), handle requests, and return responses.
const PORT = 3000;
// This sets the port number where your server will listen for requests to port 3000.
// You can change this to any port that is free on your machine.

app.get('/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
});
// This defines a route for GET requests to /hello.
// When a request is made to this endpoint - being the url - it responds with a JSON object containing the message "Hello, world!".
// Think of this as a specific instruction for your server: "When someone asks for /hello, send them this message." This is a JSON message.
// req = the request the client sends
// res = the response we send back

app.get('/time', (req, res) => {
    const now = new Date();
    res.json({
        date: now.toDateString(),
        time: now.toTimeString()
    });
});
// This defines another route for GET requests to /time.
// When a request is made to /time, it responds with the current date and time in JSON format.
// It uses JavaScript's Date object to get the current date and time.
// This is like saying, "When someone asks for the current time, give them today's date and the current time."

app.get('/about', (req, res) => {
  res.json({
    message: "This is my first backend API built with Node.js and Express!",
    author: "Julius Jnr. Kog-Der",
    version: "1.0"
  });
});
// This defines another route for GET requests to /about.
// When a request is made to /about, it responds with a JSON object containing a message, author, and version.
// This is like saying, "When someone asks about this API, tell them who made it and what version it is."

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
// This starts your server.
// It means, “Start listening for requests on port 3000. When you're ready, print this message in the terminal.”

// Express = your server toolkit

// app = your mini web server

// Routes = doors to your server (/hello, /quotes, etc)

// req = someone knocking on a door

// res = what you hand them when you open it

// listen() = turning the power on