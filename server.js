const express = require('express');
const app = express();

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

app.get('/api/products/:id', (req, res) => {
    const products = [
        { id: 1, name: 'Backpack', price: 120 },
        { id: 2, name: 'Laptop Stand', price: 85 },
        { id: 3, name: 'Notebook', price: 20 }
    ];

    const product = products.find(p => p.id === parseInt(req.params.id));
    
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});

app.get('/trips', (req, res) => {
    const trips = [
        { travel_route: 'Wa - Nandom - Burkina Faso' },
        { duration: '2 days' },
        { summary: 'Set out for a post burial celebration of my grandparents. \nHeld in Wesa, Burkina Faso, we set out from home in Wa and made our way to Nandom. On arrival, our car broke down. Got fixed and an hour later, left to Wesa. \nArrived finally in Wesa after an hours drive and attended the mass. \nAfter, we had a little refreshment with family from far and near. At 5:30 PM, we set off back to Nandom. \n Slept over there and attended church service the next day. \nLater that day at 3:00 PM, we got back on the road to Wa. \nAfter a long journey on the rough road, we made it back home. \nAs the chief driver of this trip, I definitely got to experience travelling a whole lot differently and this makes this trip worth remebering.' },
    ];

    res.json(trips);
});

// Start server
app.listen(3000, () => {
  console.log('Express server running at http://localhost:3000');
});
