import { Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
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
    useFactory: (mongoConnectionMapProvider: MongoConnectionMapProvider, request) => {
        const tenantId = request.params.tenantId
        console.debug(`dogModelFactory.useFactory(): tenantId=${tenantId}`)
        return mongoConnectionMapProvider.getConnection(tenantId).model("Dog", DogSchema)
    },
    inject: [MongoConnectionMapProvider, REQUEST]
}
