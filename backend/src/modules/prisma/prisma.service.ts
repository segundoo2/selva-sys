import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly readClient: PrismaClient;
  private readonly writeClient: PrismaClient;
  private readonly deleteClient: PrismaClient;

  constructor() {
    this.readClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_READ,
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
    await this.readClient.$connect();
    await this.writeClient.$connect();
    await this.deleteClient.$connect();
  }

  async onModuleDestroy() {
    await this.readClient.$disconnect();
    await this.writeClient.$disconnect();
    await this.deleteClient.$disconnect();
  }

  get read() {
    return this.readClient;
  }

  get write() {
    return this.writeClient;
  }

  get delete() {
    return this.deleteClient;
  }
}
