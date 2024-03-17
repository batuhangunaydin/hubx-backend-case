import { BookRepository } from "../../../../src/domain/interfaces/repositories/book-repository";
import { BookRequestModel, BookResponseModel } from "../../../../src/domain/models/book";
import { DeleteBook } from '../../../../src/domain/use-cases/book/delete-book'

describe("Get All Books Use Case", () => {

    class MockBookRepository implements BookRepository {
        deleteBook(id: String): void {
            throw new Error("Method not implemented.");
        }
        updateBook(id: String, data: BookRequestModel): void {
            throw new Error("Method not implemented.");
        }
        getBook(id: String): Promise<BookResponseModel> {
            throw new Error("Method not implemented.");
        }
        createBook(book: BookRequestModel): void {
            throw new Error("Method not implemented.");
        }
        getBooks(): Promise<BookResponseModel[]> {
            throw new Error("Method not implemented.");
        }
    }
    let mockBookRepository: BookRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockBookRepository = new MockBookRepository()
    })

    test("should return true", async () => {
        const id = "1";

        jest.spyOn(mockBookRepository, "deleteBook").mockImplementation(() => Promise.resolve())
        const getAllBooksUse = new DeleteBook(mockBookRepository)
        await getAllBooksUse.execute(id);
        expect(mockBookRepository.deleteBook).toBeCalledTimes(1)

    });

})