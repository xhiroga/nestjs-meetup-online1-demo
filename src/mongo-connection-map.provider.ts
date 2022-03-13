import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import mongoose, { Connection } from "mongoose";


@Injectable()
export class MongoConnectionMapProvider {
    connectionMap = new Map<string, Connection>()
    constructor(
        private readonly configService: ConfigService
    ) { }

    getConnection(dbName: string): Connection {
        if (this.connectionMap.has(dbName)) {
            return this.connectionMap.get(dbName)
        } else {
            const connection = this.createConnection(dbName)
            this.connectionMap.set(dbName, connection)
            return connection
        }
    }

    // TODO: コネクションごとに異なるRoleを持つユーザーを指定するのが望ましい。
    private createConnection(dbName: string): Connection {
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
