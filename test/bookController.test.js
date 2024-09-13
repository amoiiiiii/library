const { PrismaClient } = require('@prisma/client');
const bookController = require('../controllers/bookController');

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    book: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

describe('Book Controller Tests', () => {
  let prisma;
  let controller;

  beforeEach(() => {
    prisma = new PrismaClient();
    controller = bookController; 
  });

  test('should create a book', async () => {
    const req = {
      body: {
        title: 'New Book',
        authorId: 1,
        categoryId: 1,
        qty: 10
      },
      user: { id: 2 } 
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    const mockBook = { id: 1, ...req.body };
    prisma.book.create.mockResolvedValue(mockBook);

    await controller.createBook(req, res);
    expect(prisma.book.create).toHaveBeenCalledWith({
      data: {
        title: req.body.title,
        author: { connect: { id: req.body.authorId } },
        category: { connect: { id: req.body.categoryId } },
        qty: req.body.qty,
        user: { connect: { id: req.user.id } }
      }
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  test('should get all books', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    const mockBooks = [{ id: 1, title: 'Book Title' }];
    prisma.book.findMany.mockResolvedValue(mockBooks);

    await controller.getAllBooks(req, res);
    expect(prisma.book.findMany).toHaveBeenCalledWith({
      include: {
        author: true,
        category: true,
        user: true
      }
    });
    expect(res.json).toHaveBeenCalledWith(mockBooks);
  });

  test('should get a book by id', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    const mockBook = { id: 1, title: 'Book Title' };
    prisma.book.findUnique.mockResolvedValue(mockBook);

    await controller.getBookById(req, res);
    expect(prisma.book.findUnique).toHaveBeenCalledWith({
      where: { id: parseInt(req.params.id, 10) },
      include: {
        author: true,
        category: true,
        user: true
      }
    });
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  test('should update a book', async () => {
    const req = {
      params: { id: 1 },
      body: {
        title: 'Updated Book',
        authorId: 1,
        categoryId: 1,
        qty: 15
      }
    };
    const res = {
      json: jest.fn()
    };

    const mockBook = { id: 1, ...req.body };
    prisma.book.update.mockResolvedValue(mockBook);

    await controller.updateBook(req, res);
    expect(prisma.book.update).toHaveBeenCalledWith({
      where: { id: Number(req.params.id) },
      data: {
        title: req.body.title,
        author: { connect: { id: req.body.authorId } },
        category: { connect: { id: req.body.categoryId } },
        qty: req.body.qty
      }
    });
    expect(res.json).toHaveBeenCalledWith(mockBook);
  });

  test('should delete a book', async () => {
    const req = { params: { id: 1 } };
    const res = {
      json: jest.fn()
    };

    prisma.book.delete.mockResolvedValue({});

    await controller.deleteBook(req, res);
    expect(prisma.book.delete).toHaveBeenCalledWith({
      where: { id: Number(req.params.id) }
    });
    expect(res.json).toHaveBeenCalledWith({ message: 'Book deleted successfully' });
  });
});
