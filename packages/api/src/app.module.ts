import { Module } from '@nestjs/common';
import { ApiVersionOneModule } from './api/v1/api.module';
import { AppController } from './app.controller';
import { PrismaModule } from './services/prisma/prisma.module';

@Module({
  imports: [ApiVersionOneModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
