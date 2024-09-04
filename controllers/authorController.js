const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAuthor = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const author = await prisma.author.create({
            data: { name }
        });
        res.status(201).json(author);
    } catch (err) {
        console.error('Error creating author:', err);
        res.status(500).json({ error: 'An error occurred while creating the author.', details: err.message });
    }
};
const getAllAuthors = async (req, res) => {
    console.log('Fetching all authors');
    try {
        const authors = await prisma.author.findMany({
        });
        console.log('Authors fetched:', authors);
        res.json(authors);
    } catch (err) {
        console.error('Error fetching authors:', err);
        res.status(500).json({
            error: 'An error occurred while fetching authors.',
            details: err.message
        });
    }
};
const getAuthorById = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        const author = await prisma.author.findUnique({
            where: { id: parseInt(id, 10) }
        });
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }
        res.json(author);
    } catch (err) {
        console.error('Error fetching author by ID:', err);
        res.status(500).json({ error: 'An error occurred while fetching the author.', details: err.message });
    }
};
const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID and name are required' });
    }

    try {
        const author = await prisma.author.update({
            where: { id: parseInt(id, 10) },
            data: { name }
        });
        res.json(author);
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Author not found' });
        }
        console.error('Error updating author:', err);
        res.status(500).json({ error: 'An error occurred while updating the author.', details: err.message });
    }
};

const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        await prisma.author.delete({
            where: { id: parseInt(id, 10) }
        });
        res.json({ message: 'Author deleted successfully' });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Author not found' });
        }
        console.error('Error deleting author:', err);
        res.status(500).json({ error: 'An error occurred while deleting the author.', details: err.message });
    }
};

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
