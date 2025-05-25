import { PrismaClient } from '@prisma/client';

// Cliente para operações de leitura
export const prismaReader = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_READ,
    },
  },
});

// Cliente para operações de escrita
export const prismaWriter = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_WRITE,
    },
  },
});

// Cliente para operações de deleção
export const prismaDeleter = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_DELETE,
    },
  },
});
