import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { DogModelInjectionToken } from './schema/dog.schema';

@Injectable()
export class DogsService {
  constructor(
    @Inject(DogModelInjectionToken)
    private readonly dogModel: Model<Dog>,
  ) { }

  create(createDogDto: CreateDogDto) {
    const createdDog = new this.dogModel(createDogDto);
    return createdDog.save();
  }

  findAll() {
    return this.dogModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} dog`;
  }

  update(id: number, updateDogDto: UpdateDogDto) {
    return `This action updates a #${id} dog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }
}
