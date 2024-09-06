const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createBook = async (req, res) => {
    const { title, authorId, categoryId, qty } = req.body;
    const userId = req.user.id;

    if (!title || !authorId || !categoryId || qty === undefined) {
        return res.status(400).json({ error: 'Title, authorId, categoryId, and qty are required' });
    }

    try {
        const book = await prisma.book.create({
            data: {
                title,
                author: { connect: { id: Number(authorId) } },
                category: { connect: { id: Number(categoryId) } },
                qty,
                user: { connect: { id: Number(userId) } }
            }
        });
        res.status(201).json(book);
    } catch (err) {
        console.error('Error creating book:', err);
        res.status(500).json({ error: 'An error occurred while creating the book.', details: err.message });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await prisma.book.findMany({
            include: {
                author: true,
                category: true,
                user: true
            }
        });
        res.json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ error: 'An error occurred while fetching books.', details: err.message });
    }
};

const getBookById = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        const book = await prisma.book.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                author: true,
                category: true,
                user: true
            }
        });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(book);
    } catch (err) {
        console.error('Error fetching book by ID:', err);
        res.status(500).json({ error: 'An error occurred while fetching the book.', details: err.message });
    }
};

const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, authorId, categoryId, qty } = req.body;

    if (!id || !title || !authorId || !categoryId || qty === undefined) {
        return res.status(400).json({ error: 'ID, title, authorId, categoryId, and qty are required' });
    }

    try {
        const book = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                title,
                author: { connect: { id: Number(authorId) } },
                category: { connect: { id: Number(categoryId) } },
                qty
            }
        });
        res.json(book);
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Book not found' });
        }
        console.error('Error updating book:', err);
        res.status(500).json({ error: 'An error occurred while updating the book.', details: err.message });
    }
};

const deleteBook = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        await prisma.book.delete({
            where: { id: parseInt(id, 10) }
        });
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Book not found' });
        }
        console.error('Error deleting book:', err);
        res.status(500).json({ error: 'An error occurred while deleting the book.', details: err.message });
    }
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
