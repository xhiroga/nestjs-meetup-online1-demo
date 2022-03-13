import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import mongoose, { Connection } from "mongoose";


@Injectable()
export class MongooseProvider {
    constructor(
        private readonly configService: ConfigService
    ) { }

    // TODO: コネクションごとに異なるRoleを持つユーザーを指定するのが望ましい。
    getConnection(dbName: string): Connection {
        const uri = `mongodb://${this.configService.get('MONGO_HOST')}:${this.configService.get('MONGO_PORT')}`
        const user = this.configService.get('MONGO_INITDB_ROOT_USERNAME')
        const pass = this.configService.get('MONGO_INITDB_ROOT_PASSWORD')
        const options = {
            user,
            pass,
            dbName
        }
        return mongoose.createConnection(uri, options)
    }
}
