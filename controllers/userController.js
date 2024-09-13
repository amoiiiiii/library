const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const newUser = await prisma.user.create({
            data: { username, password }
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'An error occurred while creating the user.', details: err.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate token logic here
        res.json({ token: 'dummy-token' });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'An error occurred while logging in.', details: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'An error occurred while fetching users.', details: err.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id, 10) } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user by ID:', err);
        res.status(500).json({ error: 'An error occurred while fetching the user.', details: err.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    if (!id || !username || !password || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID, username, and password are required' });
    }

    try {
        const user = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: { username, password }
        });
        res.json(user);
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'User not found' });
        }
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'An error occurred while updating the user.', details: err.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        await prisma.user.delete({ where: { id: parseInt(id, 10) } });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'User not found' });
        }
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'An error occurred while deleting the user.', details: err.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
