import { BookResponseModel } from "../../models/book";
import { BookRepository } from "../../interfaces/repositories/book-repository";
import { GetAllBooksUseCase } from "../../interfaces/use-cases/get-all-books-use-case";

export class GetAllBooks implements GetAllBooksUseCase {
    bookRepository: BookRepository
    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(): Promise<BookResponseModel[]> {
        const result = await this.bookRepository.getBooks()
        return result
    }
}