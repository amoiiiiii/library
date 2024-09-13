const { PrismaClient } = require('@prisma/client');
const categoryController = require('../controllers/categoryController'); // Sesuaikan path-nya

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
    controller = categoryController; // Menggunakan controller langsung
  });

  test('should create a category', async () => {
    const req = { body: { name: 'Fiction' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    const mockCategory = { id: 1, name: 'Fiction' };
    prisma.category.create.mockResolvedValue(mockCategory);

    await controller.createCategory(req, res);
    expect(prisma.category.create).toHaveBeenCalledWith({ data: { name: req.body.name } });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  test('should return 400 if name is missing in createCategory', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.createCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Name is required' });
  });

  test('should get all categories', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    const mockCategories = [
      { id: 1, name: 'Fiction', books: [] },
      { id: 2, name: 'Non-Fiction', books: [] }
    ];
    prisma.category.findMany.mockResolvedValue(mockCategories);

    await controller.getAllCategories(req, res);
    expect(prisma.category.findMany).toHaveBeenCalledWith({ include: { books: true } });
    expect(res.json).toHaveBeenCalledWith(mockCategories);
  });

  test('should get a category by ID', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    const mockCategory = { id: 1, name: 'Fiction' };
    prisma.category.findUnique.mockResolvedValue(mockCategory);

    await controller.getCategoryById(req, res);
    expect(prisma.category.findUnique).toHaveBeenCalledWith({ where: { id: parseInt(req.params.id, 10) } });
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  test('should return 400 if ID is missing or invalid in getCategoryById', async () => {
    const req = { params: { id: 'invalid' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.getCategoryById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Valid ID is required' });
  });

  test('should update a category', async () => {
    const req = {
      params: { id: 1 },
      body: { name: 'Science Fiction' }
    };
    const res = {
      json: jest.fn()
    };

    const mockCategory = { id: 1, name: 'Science Fiction' };
    prisma.category.update.mockResolvedValue(mockCategory);

    await controller.updateCategory(req, res);
    expect(prisma.category.update).toHaveBeenCalledWith({
      where: { id: parseInt(req.params.id, 10) },
      data: { name: req.body.name }
    });
    expect(res.json).toHaveBeenCalledWith(mockCategory);
  });

  test('should return 400 if ID or name is missing or invalid in updateCategory', async () => {
    const req = { params: { id: 'invalid' }, body: { name: 'Science Fiction' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.updateCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Valid ID and name are required' });
  });

  test('should delete a category', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn()
    };

    prisma.category.delete.mockResolvedValue({});

    await controller.deleteCategory(req, res);
    expect(prisma.category.delete).toHaveBeenCalledWith({ where: { id: parseInt(req.params.id, 10) } });
    expect(res.json).toHaveBeenCalledWith({ message: 'Category deleted successfully' });
  });

  test('should return 400 if ID is missing or invalid in deleteCategory', async () => {
    const req = { params: { id: 'invalid' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.deleteCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Valid ID is required' });
  });
});
