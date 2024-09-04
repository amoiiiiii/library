const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const category = await prisma.category.create({
            data: { name }
        });
        res.status(201).json(category);
    } catch (err) {
        console.error('Error creating category:', err);
        res.status(500).json({ error: 'An error occurred while creating the category.', details: err.message });
    }
};
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                books: true // Menampilkan buku yang terkait dengan kategori
            }
        });
        res.json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({
            error: 'An error occurred while fetching categories.',
            details: err.message
        });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id, 10) }
        });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        console.error('Error fetching category by ID:', err);
        res.status(500).json({ error: 'An error occurred while fetching the category.', details: err.message });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!id || !name || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID and name are required' });
    }

    try {
        const category = await prisma.category.update({
            where: { id: parseInt(id, 10) },
            data: { name }
        });
        res.json(category);
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Category not found' });
        }
        console.error('Error updating category:', err);
        res.status(500).json({ error: 'An error occurred while updating the category.', details: err.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        await prisma.category.delete({
            where: { id: parseInt(id, 10) }
        });
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Category not found' });
        }
        console.error('Error deleting category:', err);
        res.status(500).json({ error: 'An error occurred while deleting the category.', details: err.message });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
