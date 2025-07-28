const express = require('express');
const app = express();
// This is the main file for your Express backend server.
// It sets up the server, defines routes, and starts listening for requests.
app.use(express.json());
// This line allows the server to parse incoming JSON requests.
// It is essential for handling data sent in the body of requests, especially for POST requests.
// Importing the express module and creating an instance of it.
// This middleware tells Express "If the incoming request has JSON data, make it available as req.body".

// Route: Home Page
app.get('/', (req, res) => {
  res.send('Welcome to your first Express backend!');
});

// Route: About Page
app.get('/about', (req, res) => {
  res.send('This is the about page.\nSee this as the version 1.0 of my backend API building journey!');
});

app.get('/api/user', (req, res) => {
    res.json({
        id: 1,
        name: 'Julius Jnr. Kog-Der',
        email: 'juliuskdjnr@gmail.com',
        role: 'Backend Developer in Training',
        hobbies: ['Coding', 'Learning', 'Building APIs', 'Swimming', 'Watching Movies'],
    });
});
// This route responds with a JSON object containing user information.
// REST API = a way to structure your server so it can handle different requests and send back data in a standard format.
// Think of this as a way to provide information about a user in a structured format that other applications can understand.

app.get('/api/ideas', (req, res) => {
    res.json({
        Later: 'Build a bag producing company',
        Immediate: 'Build a computerized system.',
    });
});

app.get('/trips', (req, res) => {
    const trips = [
        { travel_route: 'Wa - Nandom - Burkina Faso' },
        { duration: '2 days' },
        { summary: 'Set out for a post burial celebration of my grandparents. \nHeld in Wesa, Burkina Faso, we set out from home in Wa and made our way to Nandom. On arrival, our car broke down. Got fixed and an hour later, left to Wesa. \nArrived finally in Wesa after an hours drive and attended the mass. \nAfter, we had a little refreshment with family from far and near. At 5:30 PM, we set off back to Nandom. \n Slept over there and attended church service the next day. \nLater that day at 3:00 PM, we got back on the road to Wa. \nAfter a long journey on the rough road, we made it back home. \nAs the chief driver of this trip, I definitely got to experience travelling a whole lot differently and this makes this trip worth remebering.' },
    ];

    res.json(trips); 
});

// In-memory "database"
let products = [
  { id: 1, name: 'Backpack', price: 120 },
  { id: 2, name: 'Laptop Stand', price: 85 },
  { id: 3, name: 'Notebook', price: 20 }
];
// This is a simple in-memory array to store products.
// In a real application, you would typically use a database to store this data.
// Route: Products API
// Array acting as a mini-database for products.

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// POST: Add a new product
app.post('/api/products', (req, res) => {
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  newProduct.id = products.length + 1; // Auto-generate an ID
  products.push(newProduct);

  res.status(201).json({
    message: 'Product added successfully!',
    product: newProduct
  });
});

// PUT Request
// Update a product by ID
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!products) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const { name, price } = req.body;
    if (name) product.name = name;
    if (price) product.price = price;

    res.json({
        message: 'Product updated successfully!', 
        product 
    });
});

// DELETE Request 
// Remove a product by ID
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const deletedProduct = products.splice(index, 1);

  res.json({
    message: 'Product deleted successfully!',
    deletedProduct
  });
});

// Route: Login API
const user = {
    username: 'juliuskdjnr',
    password: 'password123'
};

// This is a simple user object to simulate a user database.
// In a real application, you would typically use a database to store user credentials.
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if ( !username || !password ) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    if (username === user.username && password === user.password) {
        return res.json({ message: 'Login successful!', username: 'juliuskdjnr' });
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
});

// Start server
app.listen(3000, () => {
  console.log('Express server running at http://localhost:3000');
});
