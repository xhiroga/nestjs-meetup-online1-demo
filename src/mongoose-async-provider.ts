import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { Request } from 'express';

/**
 * @deprecated Performance issue. This create a new provider per request..
 */
@Injectable()   // TODO: デフォルトスコープのInjectableでREQUESTを指定しているが、これはどうなるか？
export class MongooseAsyncProvider implements MongooseOptionsFactory {
    constructor(
        @Inject(REQUEST) private readonly request: Request
    ) { }

    createMongooseOptions(): MongooseModuleOptions {
        return {
            connectionName: this.request.url,
        }
    }
}
