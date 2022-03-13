import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { MongooseProvider } from 'src/mongoose.provider';
import { dogModelFactory } from './schema/dog.schema';

@Module({
  controllers: [DogsController],
  providers: [MongooseProvider, dogModelFactory, DogsService]
})
export class DogsModule { }
