// src/middlewares/validateId.js
const validateId = (req, res, next) => {
    const { id } = req.params;
    if (id && !Number.isInteger(parseInt(id, 10))) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    next();
  };
  
  module.exports = validateId;
  