const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Adjust according to your secret

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Get token from Authorization header

  if (token == null) return res.sendStatus(401); // If no token is provided, send a 401 status
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // If the token is invalid, send a 403 status
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
