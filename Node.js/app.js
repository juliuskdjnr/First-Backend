const http = require('http');
// PORT = the address where your server listens for requests
// GET = a type of request (like asking for information)
// JSON = a format for sending data (like a message in a bottle)
// This is a simple Node.js server that responds with a text message
// when a request is made to the root URL.
// To run this code, ensure you have Node.js installed.
// To run this code, save it in a file named app.js and run it using the command: node app.js
// Think of this as a basic server that can respond to requests.
// This pulls in Node.js’s built-in HTTP module so you can create a server.

const server = http.createServer((req, res) => {
  res.write('Hello from Node.js backend!');
  res.write('\nJulius here! And this is my first backend API built with Node.js and Express!');
  res.write('\nVersion: 1.0');
  res.end();
});
// This creates a server that listens for incoming requests.
// res = your response to them (your client visiting your server or website)
// req = the request they make (like asking for a page or data)
// When someone visits the server, it sends back a simple text message "Hello from Node.js backend!".
// res.write() sends the response body (message), and res.end() indicates that the response is complete.
 
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
// This starts the server and listens on port 3000.
// When the server is ready, it prints a message in the terminal saying "Server is running on http://localhost:3000".
// This is like saying, "Open the door to my server and let people in at this address."
// Think of this as your server's address where it can be accessed.