const { PrismaClient } = require('@prisma/client');
const authorController = require('../controllers/authorController'); 

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    author: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

describe('Author Controller Tests', () => {
  let prisma;
  let controller;

  beforeEach(() => {
    prisma = new PrismaClient();
    controller = authorController; 
  });

  test('should create an author', async () => {
    const req = { body: { name: 'amoi' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    const mockAuthor = { id: 2, name: 'amoi' };
    prisma.author.create.mockResolvedValue(mockAuthor);

    await controller.createAuthor(req, res);
    expect(prisma.author.create).toHaveBeenCalledWith({ data: { name: req.body.name } });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockAuthor);
  });

  test('should return 400 if name is missing in createAuthor', async () => {
    const req = { body: {} };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.createAuthor(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Name is required' });
  });

  test('should get all authors', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    const mockAuthors = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ];
    prisma.author.findMany.mockResolvedValue(mockAuthors);

    await controller.getAllAuthors(req, res);
    expect(prisma.author.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockAuthors);
  });

  test('should get an author by ID', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    const mockAuthor = { id: 1, name: 'John Doe' };
    prisma.author.findUnique.mockResolvedValue(mockAuthor);

    await controller.getAuthorById(req, res);
    expect(prisma.author.findUnique).toHaveBeenCalledWith({ where: { id: parseInt(req.params.id, 10) } });
    expect(res.json).toHaveBeenCalledWith(mockAuthor);
  });

  test('should return 400 if ID is missing or invalid in getAuthorById', async () => {
    const req = { params: { id: 'invalid' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.getAuthorById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Valid ID is required' });
  });

  test('should update an author', async () => {
    const req = {
      params: { id: 1 },
      body: { name: 'John Smith' }
    };
    const res = {
      json: jest.fn()
    };

    const mockAuthor = { id: 1, name: 'John Smith' };
    prisma.author.update.mockResolvedValue(mockAuthor);

    await controller.updateAuthor(req, res);
    expect(prisma.author.update).toHaveBeenCalledWith({
      where: { id: parseInt(req.params.id, 10) },
      data: { name: req.body.name }
    });
    expect(res.json).toHaveBeenCalledWith(mockAuthor);
  });

  test('should return 400 if ID or name is missing or invalid in updateAuthor', async () => {
    const req = { params: { id: 'invalid' }, body: { name: 'John Smith' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.updateAuthor(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Valid ID and name are required' });
  });

  test('should delete an author', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn()
    };

    prisma.author.delete.mockResolvedValue({});

    await controller.deleteAuthor(req, res);
    expect(prisma.author.delete).toHaveBeenCalledWith({ where: { id: parseInt(req.params.id, 10) } });
    expect(res.json).toHaveBeenCalledWith({ message: 'Author deleted successfully' });
  });

  test('should return 400 if ID is missing or invalid in deleteAuthor', async () => {
    const req = { params: { id: 'invalid' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.deleteAuthor(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Valid ID is required' });
  });
});
