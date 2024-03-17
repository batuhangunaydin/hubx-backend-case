import { BookResponseModel } from "../../models/book";

export interface GetOneBookUseCase {
    execute(id: String): Promise<BookResponseModel | null>;
}