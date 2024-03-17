import { BookRepository } from "../../interfaces/repositories/book-repository";
import { UpdateBookUseCase } from "../../interfaces/use-cases/update-book-use-case";
import { BookRequestModel } from "../../models/book";


export class UpdateBook implements UpdateBookUseCase {
    bookRepository: BookRepository
    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(id: String, data: BookRequestModel) {
        await this.bookRepository.updateBook(id, data);
    }
}