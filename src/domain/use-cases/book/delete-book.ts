import { BookRepository } from "../../interfaces/repositories/book-repository";
import { DeleteBookUseCase } from "../../interfaces/use-cases/delete-book-use-case";

export class DeleteBook implements DeleteBookUseCase {
    bookRepository: BookRepository
    constructor(bookRepository: BookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(id: String) {
        await this.bookRepository.deleteBook(id)
        
    }
}