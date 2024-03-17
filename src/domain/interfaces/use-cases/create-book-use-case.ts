import { BookRequestModel, BookResponseModel } from "../../models/book";

export interface CreateBookUseCase {
    execute(book: BookRequestModel): void;
}