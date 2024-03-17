import { BookRequestModel, BookResponseModel } from "../../../domain/models/book";

export interface BookDataSource {
    create(book: BookRequestModel): void;
    getAll(): Promise<BookResponseModel[]>;
    deleteOne(id: String): void;
    updateOne(id: String, data: BookRequestModel): void;
    getOne(id: String): Promise<BookResponseModel | null>;
}