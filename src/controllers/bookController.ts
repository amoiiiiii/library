import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBook = async (req: Request, res: Response) => {
  const { title, authorId, categoryId, qty } = req.body;

  try {
    const book = await prisma.book.create({
      data: {
        title,
        authorId,
        categoryId,
        qty,
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: 'Book creation failed' });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, authorId, categoryId, qty } = req.body;

  try {
    const book = await prisma.book.update({
      where: { id },
      data: { title, authorId, categoryId, qty },
    });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: 'Book update failed' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({ where: { id } });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Book delete failed' });
  }
};
