function authenticateToken(req, res, next) {
  // Example dummy auth check
  const token = req.headers['authorization'];
  if (token === 'Bearer secret123') {
    next();
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

module.exports = authenticateToken;
