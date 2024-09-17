import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Decode token dan ambil userId dan role dari token
    const decoded = verifyToken(token) as { userId: string; role: string };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Tambahkan user ke req.user
    (req as any).user = user;  // Casting ke any untuk sementara
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
