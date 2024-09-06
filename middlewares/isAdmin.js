// middlewares/isAdmin.js
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ error: 'Permission denied' });
    }
};

module.exports = isAdmin;