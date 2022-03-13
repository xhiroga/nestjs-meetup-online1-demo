import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { MongoConnectionMapProvider } from 'src/mongo-connection-map.provider';
import { dogModelFactory } from './schema/dog.schema';

@Module({
  controllers: [DogsController],
  providers: [MongoConnectionMapProvider, dogModelFactory, DogsService]
})
export class DogsModule { }
