import { Controller, Body, Param, Get, Post, Put, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Types } from 'mongoose';

@Controller('book')
export class BookController {
    /**
     *
     */
    constructor(private readonly bookService: BookService) {}

    @Get()
    async getBooks() : Promise<Book[]>{
        return await this.bookService.getBooks();
    }
    
    @Get(':Id')
    async findBookById(
        @Param('Id') Id: string
    ) : Promise<Book | null> {
        if (!Types.ObjectId.isValid(Id)) {
            throw new BadRequestException(`Invalid ID format: ${Id}`);
        }
    
        const book = await this.bookService.findBookById(Id);
    
        if (!book) {
            throw new NotFoundException(`Book with ID ${Id} not found`);
        }
    
        return book;
    }

    // @Post('create')
    @Post()
    async createBook(
        @Body() book: CreateBookDto
    ): Promise<Book> {
        return await this.bookService.createBook(book);
    }

    @Put(':Id')
    async updateBook(
        @Param('Id') Id: string,
        @Body() book: UpdateBookDto
    ): Promise<Book | null> {
        if(!Types.ObjectId.isValid(Id)){
            throw new BadRequestException(`Invalid ID format: ${Id}`);
        }

        return this.bookService.updateBook(Id, book).then((book) => {
            if(!book) {
                throw new NotFoundException(`Book with ID ${Id} not found`);
            }
            return book;
        });
    }

    @Delete(':Id')
    async deleteBook(
        @Param('Id') Id: string
    ): Promise<Book | null> {
        if(!Types.ObjectId.isValid(Id)){
            throw new BadRequestException(`Invalid ID format: ${Id}`);
        }

        return this.bookService.deleteBook(Id).then((book) => {
            if(!book){
                throw new NotFoundException(`Book with ID ${Id} not found`);
            }
            return book;
        });
    }
}
