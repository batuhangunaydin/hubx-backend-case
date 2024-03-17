import { BookResponseModel } from "../../models/book";

export interface GetAllBooksUseCase {
    execute(): Promise<BookResponseModel[]>;
}