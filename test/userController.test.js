const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const userController = require('../controllers/userController'); 

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockImplementation((password) => Promise.resolve(`hashed_${password}`)),
  compare: jest.fn().mockImplementation((password, hash) => Promise.resolve(hash === `hashed_${password}`))
}));

describe('User Controller Tests', () => {
  let prisma;
  let controller;

  beforeEach(() => {
    prisma = new PrismaClient();
    controller = userController; 
  });

  test('should update a user', async () => {
    const req = {
      params: { id: 9 },
      body: {
        name: 'user1',
        email: 'user1@gmail.com',
        password: 'defaultpassword',
        role: 'USER'
      }
    };
    const res = {
      status: jest.fn((code) => {
        console.log('Status called with:', code);
        return res;
      }),
      json: jest.fn((data) => {
        console.log('Json called with:', data);
      })
    };

    const mockUser = { id: 9, ...req.body };
    prisma.user.update.mockResolvedValue(mockUser);

    await controller.updateUser(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('defaultpassword', 10);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: Number(req.params.id) },
      data: {
        name: req.body.name,
        email: req.body.email,
        password: `hashed_${req.body.password}`, 
      }
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  })
  });

