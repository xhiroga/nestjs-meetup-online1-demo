import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dogs')
export class DogsController {
  constructor(
    private readonly dogsService: DogsService,
    private readonly logger: PinoLogger,
  ) { }

  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    this.logger.debug(`create(): createDogDto=${JSON.stringify(createDogDto)}`);
    return this.dogsService.create(createDogDto);
  }

  @Get()
  findAll() {
    this.logger.debug(`findAll():`);
    return this.dogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(+id, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.remove(+id);
  }
}
