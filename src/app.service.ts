import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  index() {
    return this.prisma.notification.findMany();
  }

  create(content, category) {
    return this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId: randomUUID(),
      },
    });
  }
}
