const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        category: true,
        user: true,
      },
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
        category: true,
        user: true,
      },
    });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new book
const createBook = async (req, res) => {
  const { title, authorId, categoryId, userId } = req.body;
  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author: { connect: { id: Number(authorId) } },
        category: { connect: { id: Number(categoryId) } },
        user: userId ? { connect: { id: Number(userId) } } : undefined,
      },
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, authorId, categoryId, userId } = req.body;
  try {
    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        author: authorId ? { connect: { id: Number(authorId) } } : undefined,
        category: categoryId ? { connect: { id: Number(categoryId) } } : undefined,
        user: userId ? { connect: { id: Number(userId) } } : undefined,
      },
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
