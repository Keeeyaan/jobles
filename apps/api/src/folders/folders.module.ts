import { Module } from '@nestjs/common';

import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
