import { BookRequestModel, BookResponseModel } from "../../models/book";

export interface BookRepository {
    createBook(book: BookRequestModel): void;
    deleteBook(id: String): void;
    updateBook(id: String, data: BookRequestModel): void;
    getBooks(): Promise<BookResponseModel[]>;
    getBook(id: String): Promise<BookResponseModel | null>;
}