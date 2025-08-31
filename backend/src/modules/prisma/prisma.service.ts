import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly readerClient: PrismaClient;
  private readonly writeClient: PrismaClient;
  private readonly deleteClient: PrismaClient;

  constructor() {
    this.readerClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_READER,
        },
      },
    });

    this.writeClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_WRITE,
        },
      },
    });

    this.deleteClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_DELETE,
        },
      },
    });
  }

  async onModuleInit() {
    await this.readerClient.$connect();
    await this.writeClient.$connect();
    await this.deleteClient.$connect();
  }

  async onModuleDestroy() {
    await this.readerClient.$disconnect();
    await this.writeClient.$disconnect();
    await this.deleteClient.$disconnect();
  }

  get reader() {
    return this.readerClient;
  }

  get write() {
    return this.writeClient;
  }

  get delete() {
    return this.deleteClient;
  }
}
