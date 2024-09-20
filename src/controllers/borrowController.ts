import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new borrow record
export const createBorrow = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, bookId, borrowDate, returnDate } = req.body;
    const borrow = await prisma.borrow.create({
      data: {
        userId,
        bookId,
        borrowDate,
        returnDate
      },
    });
    res.status(201).json(borrow);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all borrow records
export const getAllBorrows = async (req: Request, res: Response): Promise<void> => {
  try {
    const borrows = await prisma.borrow.findMany({
      include: { user: true, book: true },
    });
    res.status(200).json(borrows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a borrow record by ID
export const getBorrowById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const borrow = await prisma.borrow.findUnique({
      where: { id },
      include: { user: true, book: true },
    });
    if (borrow) {
      res.status(200).json(borrow);
    } else {
      res.status(404).json({ message: 'Borrow record not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a borrow record
export const updateBorrow = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { userId, bookId, borrowDate, returnDate } = req.body;
  try {
    const borrow = await prisma.borrow.update({
      where: { id },
      data: { userId, bookId, borrowDate, returnDate },
    });
    res.status(200).json(borrow);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a borrow record
export const deleteBorrow = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.borrow.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Return a book (delete borrow record and update book quantity)
export const returnBorrow = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    // Get the borrow record before deleting it
    const borrow = await prisma.borrow.findUnique({
      where: { id },
      include: { book: true }, // Include book details to access bookId
    });

    if (!borrow) {
      res.status(404).json({ message: 'Borrow record not found' });
      return;
    }

    // Delete the borrow record
    await prisma.borrow.delete({
      where: { id },
    });

    // Update the quantity of the book
    await prisma.book.update({
      where: { id: borrow.bookId }, // Use bookId from the borrow record
      data: {
        qty: {
          increment: 1, // Increment the quantity by 1 when the book is returned
        },
      },
    });

    res.status(200).json({ message: 'Book returned and quantity updated successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
