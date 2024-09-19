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
