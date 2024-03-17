//test/domain/use-cases/book/get-all-books.test.ts
import { BookRepository } from "../../../../src/domain/interfaces/repositories/book-repository";
import { BookRequestModel, BookResponseModel } from "../../../../src/domain/models/book";
import { GetAllBooks } from '../../../../src/domain/use-cases/book/get-all-books'

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

    test("should return data", async () => {
        const ExpectedResult = [{ id: "1", title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" }]

        jest.spyOn(mockBookRepository, "getBooks").mockImplementation(() => Promise.resolve(ExpectedResult))
        const getAllBooksUse = new GetAllBooks(mockBookRepository)
        const result = await getAllBooksUse.execute();
        expect(result).toStrictEqual(ExpectedResult)

    });

})