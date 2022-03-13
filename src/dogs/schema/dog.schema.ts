import { REQUEST } from "@nestjs/core";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Request } from 'express';
import { MongooseProvider } from "src/mongoose.provider";

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
    useFactory: (MongooseProvider: MongooseProvider, request: Request) => {
        const tenantId = request.params.tenantId
        console.debug(`dogModelFactory.useFactory(): tenantId=${tenantId}`)
        return MongooseProvider.getConnection(tenantId).model("Dog", DogSchema)
    },
    inject: [MongooseProvider, REQUEST]
}
