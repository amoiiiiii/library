import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAuthor = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const author = await prisma.author.create({ data: { name } });
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: 'Author creation failed' });
  }
};

export const getAllAuthors = async (req: Request, res: Response) => {
  const authors = await prisma.author.findMany();
  res.json(authors);
};

export const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const author = await prisma.author.findUnique({ where: { id } });
  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }
  res.json(author);
};

export const updateAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const author = await prisma.author.update({ where: { id }, data: { name } });
    res.json(author);
  } catch (error) {
    res.status(400).json({ error: 'Author update failed' });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.author.delete({ where: { id } });
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Author delete failed' });
  }
};
