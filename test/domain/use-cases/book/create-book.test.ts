import { BookRepository } from "../../../../src/domain/interfaces/repositories/book-repository";
import { BookRequestModel, BookResponseModel } from "../../../../src/domain/models/book";
import { CreateBook } from '../../../../src/domain/use-cases/book/create-book'

describe("Create Book Use Case", () => {
    class MockBookRepository implements BookRepository {
        createBook(book: BookRequestModel): void {
            throw new Error("Method not implemented.");
        }
        deleteBook(id: String): void {
            throw new Error("Method not implemented.");
        }
        updateBook(id: String, data: BookRequestModel): void {
            throw new Error("Method not implemented.");
        }
        getBooks(): Promise<BookResponseModel[]> {
            throw new Error("Method not implemented.");
        }
        getBook(id: String): Promise<BookResponseModel> {
            throw new Error("Method not implemented.");
        }

    }

    let mockBookRepository: BookRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockBookRepository = new MockBookRepository()
    })

    test("should return true", async () => {
        const InputData = { id: "1", title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" }

        jest.spyOn(mockBookRepository, "createBook").mockImplementation(() => Promise.resolve(true))
        const createBookUseCase = new CreateBook(mockBookRepository)
        await createBookUseCase.execute(InputData);
        expect(mockBookRepository.createBook).toBeCalledTimes(1)

    });

})