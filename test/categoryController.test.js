const { PrismaClient } = require('@prisma/client');
const categoryController = require('../controllers/categoryController'); 

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    category: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

describe('Category Controller Tests', () => {
  let prisma;
  let controller;

  beforeEach(() => {
    prisma = new PrismaClient();
    controller = categoryController; 
  });

  test('should get a category by ID', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    const mockCategory = { id: 1, name: 'Fantasy' };
    prisma.category.findUnique.mockResolvedValue(mockCategory);

    await controller.getCategoryById(req, res);
    expect(prisma.category.findUnique).toHaveBeenCalledWith({
      where: { id: parseInt(req.params.id, 10) },
      include: { books: true } 
    });
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });
});
