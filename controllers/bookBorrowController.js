const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to borrow a book
const borrowBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id; // Use userId from the token

    if (!bookId) {
        return res.status(400).json({ error: 'Book ID is required' });
    }

    try {
        const existingBorrow = await prisma.borrow.findFirst({
            where: { userId: Number(userId), bookId: Number(bookId), returnDate: null }
        });

        if (existingBorrow) {
            return res.status(400).json({ error: 'You have already borrowed this book' });
        }

        const book = await prisma.book.findUnique({ where: { id: Number(bookId) } });
        if (!book || book.qty <= 0) {
            return res.status(400).json({ error: 'Book is out of stock' });
        }

        await prisma.book.update({
            where: { id: Number(bookId) },
            data: { qty: { decrement: 1 } }
        });

        const borrowRecord = await prisma.borrow.create({
            data: {
                userId: Number(userId),
                bookId: Number(bookId),
                borrowDate: new Date()
            }
        });
        res.status(201).json({
            ...borrowRecord,
            userName: (await prisma.user.findUnique({ where: { id: Number(userId) } })).name,
            bookTitle: book.title
        });
    } catch (err) {
        console.error('Error borrowing book:', err);
        res.status(500).json({ error: 'An error occurred while borrowing the book.', details: err.message });
    }
};

// Function to return a book
const returnBook = async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid ID is required' });
    }

    try {
        const borrowRecord = await prisma.borrow.findUnique({
            where: { id: Number(id) },
            include: {
                book: true,
                user: true
            }
        });

        if (!borrowRecord) {
            return res.status(404).json({ error: 'Borrow record not found' });
        }

        const updatedBorrowRecord = await prisma.borrow.update({
            where: { id: Number(id) },
            data: { returnDate: new Date() }
        });

        await prisma.book.update({
            where: { id: borrowRecord.bookId },
            data: { qty: { increment: 1 } }
        });

        res.json({
            ...updatedBorrowRecord,
            userName: borrowRecord.user.name,
            bookTitle: borrowRecord.book.title
        });
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Borrow record not found' });
        }
        console.error('Error returning book:', err);
        res.status(500).json({ error: 'An error occurred while returning the book.', details: err.message });
    }
};

module.exports = {
    borrowBook,
    returnBook
};
