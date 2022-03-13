import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    // MongooseModuleはDynamicModuleで提供される。接続情報の読み込みが必要なため、import時にプロパティや振る舞いを可変にできるDynamicModuleが望ましい。
    MongooseModule.forRootAsync({
      useClass: MongooseAsyncProvider,
    }),
    CatsModule,
    RouterModule.register([{
      path: ':tenantId',  // RouterModuleで利用するパスでもパラメーターは有効。
      module: CatsModule,
    }, {
      path: ':tenantId',
      module: DogsModule,
    }]),
    DogsModule
  ],
  controllers: [AppController],
  providers: [AppService, MongooseAsyncProvider],
})
export class AppModule { }
