const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all authors
const getAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single author by ID
const getAuthorById = async (req, res) => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ error: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new author
const createAuthor = async (req, res) => {
  const { name } = req.body;
  try {
    const newAuthor = await prisma.author.create({
      data: { name },
    });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an author
const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedAuthor = await prisma.author.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an author
const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.author.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor };
