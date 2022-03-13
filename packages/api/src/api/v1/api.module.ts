import { Module } from '@nestjs/common';
import { MemeModule } from './meme/meme.module';

@Module({
  imports: [MemeModule],
})
export class ApiVersionOneModule {}
