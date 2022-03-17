import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';
import { v4 } from 'uuid';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { MongooseAsyncProvider } from './mongoose-async.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      // If environment variables are set, envFile will be ignored.
      isGlobal: true,
      // If not exists, just ignored.
      envFilePath: '.env.local',
    }),
    LoggerModule.forRootAsync({
      useFactory: async () => {
        return {
          pinoHttp: { level: 'debug', genReqId: () => v4() },
        };
      }
    }),
    // MongooseModuleはDynamicModuleで提供される。接続情報の読み込みが必要なため、import時にプロパティや振る舞いを可変にできるDynamicModuleが望ましい。
    MongooseModule.forRootAsync({
      useClass: MongooseAsyncProvider,
    }),
    CatsModule,
    DogsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    {
      provide: APP_GUARD, useClass: AuthGuard
    },
    MongooseAsyncProvider
  ],
})
export class AppModule { }
