const { PrismaClient } = require('@prisma/client');
const userController = require('../controllers/userController'); // Sesuaikan path-nya

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),  // Tambahkan mock untuk create
    },
  };
  return { PrismaClient: jest.fn(() => mockPrismaClient) };
});

describe('User Controller Tests', () => {
  let prisma;
  let controller;

  beforeEach(() => {
    prisma = new PrismaClient();
    controller = userController; // Menggunakan controller langsung
  });

  test('should get all users', async () => {
    const req = {};
    const res = {
      json: jest.fn()
    };

    const mockUsers = [{ id: 1, username: 'JohnDoe', password: 'password123' }];
    prisma.user.findMany.mockResolvedValue(mockUsers);

    await controller.getAllUsers(req, res);
    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  test('should get a user by id', async () => {
    const req = { params: { id: '1' } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    const mockUser = { id: 1, username: 'JohnDoe', password: 'password123' };
    prisma.user.findUnique.mockResolvedValue(mockUser);

    await controller.getUserById(req, res);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: parseInt(req.params.id, 10) }
    });
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test('should return 400 if id is missing or invalid in getUserById', async () => {
    const req = { params: { id: 'invalid' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.getUserById(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Valid ID is required' });
  });

  test('should update a user', async () => {
    const req = {
      params: { id: '1' },
      body: { username: 'JaneDoe', password: 'newpassword123' }
    };
    const res = {
      json: jest.fn()
    };

    const mockUser = { id: 1, ...req.body };
    prisma.user.update.mockResolvedValue(mockUser);

    await controller.updateUser(req, res);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: parseInt(req.params.id, 10) },
      data: req.body
    });
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test('should return 400 if ID, username, or password is missing or invalid in updateUser', async () => {
    const req = { params: { id: 'invalid' }, body: { username: 'JaneDoe', password: 'newpassword123' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Valid ID, username, and password are required' });
  });

  test('should delete a user', async () => {
    const req = { params: { id: '1' } };
    const res = {
      json: jest.fn()
    };

    prisma.user.delete.mockResolvedValue({});

    await controller.deleteUser(req, res);
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: parseInt(req.params.id, 10) }
    });
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
  });

  test('should return 400 if ID is missing or invalid in deleteUser', async () => {
    const req = { params: { id: 'invalid' } };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn()
    };

    await controller.deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Valid ID is required' });
  });
});
