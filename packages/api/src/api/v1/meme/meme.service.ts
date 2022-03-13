import { Injectable } from '@nestjs/common';
import { meme as Meme, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class MemeService {
  constructor(private prisma: PrismaService) {}

  async fetchMeme(args: Prisma.memeFindFirstArgs): Promise<Meme | null> {
    return this.prisma.meme.findFirst(args);
  }

  async fetchMemes(args: Prisma.memeFindManyArgs) {
    return this.prisma.meme.findMany(args);
  }
}
