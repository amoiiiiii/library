import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new book
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, authorId, categoryId, qty, createdBy } = req.body;
    const book = await prisma.book.create({
      data: {
        title,
        authorId,
        categoryId,
        qty,
        createdBy
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await prisma.book.findMany({
      include: { author: true, category: true, user: true },
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true, category: true, user: true },
    });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, authorId, categoryId, qty, createdBy } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id },
      data: { title, authorId, categoryId, qty, createdBy },
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
