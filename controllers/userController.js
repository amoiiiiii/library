const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name || !role) {
        return res.status(400).json({ error: 'Email, password, name, and role are required' });
    }

    try {
        // Ensure role is in uppercase
        const roleUpperCase = role.toUpperCase();
        if (!['ADMIN', 'USER'].includes(roleUpperCase)) {
            return res.status(400).json({ error: 'Invalid role value' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: roleUpperCase // Use the provided role
            }
        });
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'An error occurred while creating the user.', details: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
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
    const { name, email, password } = req.body;

    if (!id || !name || !email || (password && password.length < 6)) {
        return res.status(400).json({ error: 'Valid ID, name, email, and password are required' });
    }

    try {
        const data = {
            name,
            email,
            ...(password && { password: await bcrypt.hash(password, 10) })
        };

        const user = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data
        });
        res.status(200).json(user); // Pastikan status 200 dipanggil
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
