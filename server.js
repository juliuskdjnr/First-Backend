const Product = require('./models/Product');
// This line imports the Product model defined in models/Product.js.
const mongoose = require('mongoose');
// This line imports the mongoose library, which is used for interacting with MongoDB databases.
const jwt = require('jsonwebtoken');
// This line imports the jsonwebtoken library, which is used for creating and verifying JSON Web Tokens.
const express = require('express');
const app = express();
// This is the main file for your Express backend server.
// It sets up the server, defines routes, and starts listening for requests.
app.use(express.json());
// This line allows the server to parse incoming JSON requests.
// It is essential for handling data sent in the body of requests, especially for POST requests.
// Importing the express module and creating an instance of it.
// This middleware tells Express "If the incoming request has JSON data, make it available as req.body".
const JWT_SECRET = 'mySuperSecretKey123'; // In real apps, use environment variables
// This is a secret key used for signing and verifying JWTs.
// In a production application, you should store this key in an environment variable for security.

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Expected format: "Bearer <token>"
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // attach decoded user to request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token.' });
  }
}
// This function verifies the JWT token sent in the request headers.
// If the token is valid, it decodes the user information and attaches it to the request.

mongoose.connect('mongodb+srv://juliuskdjnr:Zanuviel1.@backendcluster.elnctz8.mongodb.net/?retryWrites=true&w=majority&appName=BackendCluster', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));
// This connects to a MongoDB database using Mongoose.


// Middleware to log requests
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
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID format' });
  }
});
// This route retrieves a product by its ID from the database using the Product model.

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});
// This route retrieves all products from the database using the Product model.

// POST: Add a new product
const authenticateToken = require('./middleware/auth'); // if not already included

app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      user: req.user.id  // attach the authenticated user ID
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error('Product creation error:', err);
    res.status(400).json({ error: 'Failed to create product', details: err.message });
  }
});



// PUT Request
// Update a product by ID
app.put('/api/products/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});


// DELETE Request 
// Remove a product by ID
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || product.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not allowed to delete this product' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
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
        // Generate token
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' }); // Sign the token with the secret key and set it to expire in 1 hour.
        // This line creates a JWT token that includes the username and is signed with the secret key.
        // You return the token to the frontend — it can store it and attach it to future requests.
        return res.json({
            message: 'Login successful!',
            token
        });
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
});

app.get('/api/secret', verifyToken, (req, res) => {
  res.json({
    message: `Welcome, ${req.user.username}! This is a protected route.`,
    user: req.user
  });
});
// This route is protected by the verifyToken middleware.
// It can only be accessed if a valid JWT token is provided in the request headers.

// Start server
app.listen(3000, () => {
  console.log('Express server running at http://localhost:3000');
});
