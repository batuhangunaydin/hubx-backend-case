import { BookDataSource } from "../../data/interfaces/data-sources/book-data-source";
import { BookRequestModel, BookResponseModel } from "../models/book";
import { BookRepository } from "../interfaces/repositories/book-repository";

export class BookRepositoryImpl implements BookRepository {
    bookDataSource: BookDataSource
    constructor(bookDataSource: BookDataSource) {
        this.bookDataSource = bookDataSource
    }

    async deleteBook(id: String) {
        await this.bookDataSource.deleteOne(id)
    }

    async updateBook(id: String, data: BookRequestModel) {
        await this.bookDataSource.updateOne(id, data);
    }

    async getBook(id: String): Promise<BookResponseModel | null> {
        const result = await this.bookDataSource.getOne(id);
        return result;
    }

    async createBook(book: BookRequestModel) {
        await this.bookDataSource.create(book)
    }

    async getBooks(): Promise<BookResponseModel[]> {
        const result = await this.bookDataSource.getAll()
        return result;
    }
}