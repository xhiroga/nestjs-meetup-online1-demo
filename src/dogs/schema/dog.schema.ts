import { REQUEST } from "@nestjs/core";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Request } from 'express';
import { MongoConnectionMapProvider } from "src/mongo-connection-map.provider";

export type DogDocument = Dog & Document;

@Schema()
export class Dog {
    @Prop()
    name: string;

    @Prop()
    age: number;

    @Prop()
    breed: string;
}

export const DogSchema = SchemaFactory.createForClass(Dog);

export const DogModelInjectionToken = "DogModel"
export const dogModelFactory = {
    provide: DogModelInjectionToken,
    useFactory: (mongoConnectionMapProvider: MongoConnectionMapProvider, request: Request & { tenantId: string }) => {
        const tenantId = request.headers['x-tenant-id'] as string // 依存性注入はGuardの実行よりも早いので、Guardの結果を使うことができない。
        console.debug(`dogModelFactory.useFactory(): tenantId=${tenantId}`)
        return mongoConnectionMapProvider.getConnection(tenantId).model("Dog", DogSchema)
    },
    inject: [MongoConnectionMapProvider, REQUEST]
}
