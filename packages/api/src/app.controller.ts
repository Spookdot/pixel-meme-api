import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('meme/:name')
  async getHello(@Param('name') name: string) {
    return this.prismaService.meme.findFirst({
      where: {
        name,
      },
    });
  }
}
