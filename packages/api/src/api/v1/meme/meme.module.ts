import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { MemeController } from './meme.controller';
import { MemeService } from './meme.service';

@Module({
  imports: [PrismaModule],
  controllers: [MemeController],
  providers: [MemeService],
})
export class MemeModule {}
