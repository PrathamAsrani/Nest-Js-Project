import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
    Fiction = 'Fiction',
    NonFiction = 'Non-Fiction',
    Science = 'Science',
    History = 'History',
    Biography = 'Biography',
    Fantasy = 'Fantasy',
    Mystery = 'Mystery',
    Romance = 'Romance',
    Thriller = 'Thriller',
}

@Schema({
    timestamps: true, // Automatically add createdAt and updatedAt fields
    // versionKey: true, // Add __v field for versioning to main consistency with data in the DB and frontend
})

export class Book {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    author: string;

    @Prop({ required: true, type: [String], enum: Category })
    category: Category[];

    @Prop({ required: true })
    publishedDate: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);