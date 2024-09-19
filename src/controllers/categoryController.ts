import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new category
export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: { name },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get all categories
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      include: { books: true },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Get a category by ID
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { books: true },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.category.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
