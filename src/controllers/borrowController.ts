import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const borrowBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;

  try {
    const borrow = await prisma.borrow.create({
      data: {
        userId,
        bookId,
        borrowDate: new Date(),
      },
    });
    res.status(201).json(borrow);
  } catch (error) {
    res.status(400).json({ error: 'Borrow operation failed' });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const borrow = await prisma.borrow.update({
      where: { id },
      data: { returnDate: new Date() },
    });
    res.json(borrow);
  } catch (error) {
    res.status(400).json({ error: 'Return operation failed' });
  }
};
