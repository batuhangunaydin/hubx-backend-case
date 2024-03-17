import { BookRequestModel, BookResponseModel } from "../../models/book";
import { BookRepository } from "../../interfaces/repositories/book-repository";
import { CreateBookUseCase } from "../../interfaces/use-cases/create-book-use-case";

export class CreateBook implements CreateBookUseCase {
    bookRepository: BookRepository
    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(book: BookRequestModel) {
        await this.bookRepository.createBook(book)
    }
}