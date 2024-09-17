import { User } from '@prisma/client';  // Pastikan path dan tipe sesuai dengan model di Prisma

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Definisikan tipe user di sini
    }
  }
}
