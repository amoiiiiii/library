const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ error: 'Token required' });

    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({ error: 'Invalid token' });
        }
        console.log('User from token:', user);
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
