import { PrismaClient } from '@prisma/client';

export const prismaReader = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_READ,
    },
  },
});

export const prismaWriter = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_WRITE,
    },
  },
});

export const prismaDeleter = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_DELETE,
    },
  },
});
