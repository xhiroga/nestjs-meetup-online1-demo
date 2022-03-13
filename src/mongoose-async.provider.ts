import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { Request } from 'express';

/**
 * @deprecated Performance issue. This create a new provider per request...
 */
@Injectable()   // TODO: Providerがデフォルトスコープなのに、RequestスコープのrequestオブジェクトをInjectできるのはなぜだろう？
export class MongooseAsyncProvider implements MongooseOptionsFactory {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly configService: ConfigService
    ) { }

    createMongooseOptions(): MongooseModuleOptions {
        const tenantId = this.request.params.tenantId   // from path ':tenantId'
        console.debug(`MongooseAsyncProvider.createMongooseOptions(): tenantId=${tenantId}`)

        return {
            uri: `mongodb://${this.configService.get('MONGO_HOST')}:${this.configService.get('MONGO_PORT')}`,
            user: this.configService.get('MONGO_INITDB_ROOT_USERNAME'),
            pass: this.configService.get('MONGO_INITDB_ROOT_PASSWORD'),
            dbName: tenantId,
            connectionName: tenantId
        }
    }
}
