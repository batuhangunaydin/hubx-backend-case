import { BookRequestModel } from "../../models/book";

export interface UpdateBookUseCase {
    execute(id: String, data: BookRequestModel): void;
}