import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new author
export const createAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const author = await prisma.author.create({
      data: { name },
    });
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all authors
export const getAllAuthors = async (req: Request, res: Response): Promise<void> => {
  try {
    const authors = await prisma.author.findMany({
      include: { books: true },
    });
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get author by ID
export const getAuthorById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const author = await prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: 'Author not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update an author
export const updateAuthor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const author = await prisma.author.update({
      where: { id },
      data: { name },
    });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete an author
export const deleteAuthor = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.author.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
