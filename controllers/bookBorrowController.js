const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const borrowBook = async (req, res) => {
    const { bookId } = req.body;
    const userId = req.user.id; // Menggunakan userId dari token

    if (!bookId) {
        return res.status(400).json({ error: 'Book ID is required' });
    }

    try {
        // Cek apakah user sudah meminjam buku ini
        const existingBorrow = await prisma.borrow.findFirst({
            where: { userId: Number(userId), bookId: Number(bookId), returnDate: null }
        });
        
        if (existingBorrow) {
            return res.status(400).json({ error: 'You have already borrowed this book' });
        }

        // Cek ketersediaan buku
        const book = await prisma.book.findUnique({ where: { id: Number(bookId) } });
        if (book.qty <= 0) {
            return res.status(400).json({ error: 'Book is out of stock' });
        }

        // Update qty buku
        await prisma.book.update({
            where: { id: Number(bookId) },
            data: { qty: { decrement: 1 } }
        });

        // Buat record peminjaman
        const borrowRecord = await prisma.borrow.create({
            data: {
                userId: Number(userId),
                bookId: Number(bookId),
                borrowDate: new Date()
            }
        });
        res.status(201).json(borrowRecord);
    } catch (err) {
        console.error('Error borrowing book:', err);
        res.status(500).json({
            error: 'An error occurred while borrowing the book.',
            details: err.message
        });
    }
};

const returnBook = async (req, res) => {
    const { id } = req.params;
    console.log('Attempting to return book with ID:', id); // Tambahkan log untuk ID

    try {
        const updatedBorrowRecord = await prisma.borrow.update({
            where: { id: Number(id) },
            data: { returnDate: new Date() }
        });
        res.json(updatedBorrowRecord);
    } catch (err) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: 'Borrow record not found' });
        }
        console.error('Error returning book:', err);
        res.status(500).json({
            error: 'An error occurred while returning the book.',
            details: err.message
        });
    }
};

module.exports = {
    borrowBook,
    returnBook
};
