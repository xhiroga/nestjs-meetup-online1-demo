import { Test, TestingModule } from '@nestjs/testing';
import { MongooseAsyncProvider } from './mongoose-async-provider';

describe('MongooseAsyncProvider', () => {
  let provider: MongooseAsyncProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseAsyncProvider],
    }).compile();

    provider = module.get<MongooseAsyncProvider>(MongooseAsyncProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
