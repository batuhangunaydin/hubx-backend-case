import { BookResponseModel } from "../../models/book";
import { BookRepository } from "../../interfaces/repositories/book-repository";
import { GetOneBookUseCase } from "../../interfaces/use-cases/get-one-book-use-case";

export class GetOneBooks implements GetOneBookUseCase {
    bookRepository: BookRepository
    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(id: String): Promise<BookResponseModel | null> {
        const result = await this.bookRepository.getBook(id)
        return result
    }
}