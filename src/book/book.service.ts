import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
    /**
     * Dependency injection of the Book model using Mongoose.
     */
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) { }

    async getBooks(): Promise<Book[]> {
        return await this.bookModel.find().exec();
    }

    async findBookById(Id: string): Promise<Book | null> {
        return await this.bookModel.findById(Id).exec();
    }

    async createBook(book: Book): Promise<Book> {
        return await this.bookModel.create(book);
    }

    async updateBook(Id: string, book: Book): Promise<Book | null> {
        return await this.bookModel.findByIdAndUpdate(Id, book, {
            new: true, // if not found then creates new one
            runValidators: true, // do the validation as per props
        }).exec();
    }

    async deleteBook(Id: string): Promise<Book | null> {
        return await this.bookModel.findByIdAndDelete(Id).exec();
    }
}
