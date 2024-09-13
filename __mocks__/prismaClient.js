const { PrismaClient } = require('@prisma/client');
const authorController = require('../controllers/authorController'); // Adjust the path as needed

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      author: {
        findMany: jest.fn().mockResolvedValue([{ id: 1, name: 'Test Author' }]),
      },
    })),
  };
});

describe('Author Controller', () => {
  let prisma;
  let controller;

  beforeEach(() => {
    prisma = new PrismaClient();
    controller = authorController(prisma);
  });

  it('should fetch authors', async () => {
    const result = await controller.getAllAuthors();
    expect(result).toEqual([{ id: 1, name: 'Test Author' }]);
  });
});
