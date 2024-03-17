import { BookDataSource } from "../../../src/data/interfaces/data-sources/book-data-source";
import { BookRepository } from "../../../src/domain/interfaces/repositories/book-repository";
import { BookRequestModel, BookResponseModel } from "../../../src/domain/models/book";
import { BookRepositoryImpl } from "../../../src/domain/repositories/book-repository";

class MockBookDataSource implements BookDataSource {
    deleteOne(id: String): void {
        throw new Error("Method not implemented.");
    }
    updateOne(id: String, data: BookRequestModel): void {
        throw new Error("Method not implemented.");
    }
    getOne(id: String): Promise<BookResponseModel> {
        throw new Error("Method not implemented.");
    }
    create(book: BookRequestModel): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<BookResponseModel[]> {
        throw new Error("Method not implemented.");
    }
}

describe("Book Repository", () => {
    let mockBookDataSource: BookDataSource;
    let bookRepository: BookRepository

    beforeEach(() => {
        jest.clearAllMocks();
        mockBookDataSource = new MockBookDataSource()
        bookRepository = new BookRepositoryImpl(mockBookDataSource)
    })

    describe("getAllBooks", () => {
        test("should return data", async () => {
            const expectedData = [{ id:"1", title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" }]
            jest.spyOn(mockBookDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData))
            const result = await bookRepository.getBooks();
            expect(result).toBe(expectedData)
        });
    })

    describe("createBook", () => {
        test("should make create ds call", async () => {
            jest.spyOn(mockBookDataSource, "create").mockImplementation(() => Promise.resolve())
            await bookRepository.createBook({ title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" });
            expect(mockBookDataSource.create).toHaveBeenCalledWith({ title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" })
        });
    })


    describe("deleteBook", () => {
        test("should make deleteOne ds call", async () => {
            jest.spyOn(mockBookDataSource, "deleteOne").mockImplementation(() => Promise.resolve())
            const result = await bookRepository.deleteBook("123");
            expect(mockBookDataSource.deleteOne).toHaveBeenCalledWith("123")
        });
    })

    describe("updateBook", () => {
        test("should make updateOne ds call", async () => {
            jest.spyOn(mockBookDataSource, "updateOne").mockImplementation(() => Promise.resolve())
            await bookRepository.updateBook("123", { title: "Test", author: { name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" });
            expect(mockBookDataSource.updateOne).toHaveBeenCalledWith("123", { title: "Test", author: { name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" })
        });
    })

    describe("getBook", () => {
        test("should make getOne ds call", async () => {
            jest.spyOn(mockBookDataSource, "getOne").mockImplementation(() => Promise.resolve({ id:"123", title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" }))
            const result = await bookRepository.getBook("123");
            expect(mockBookDataSource.getOne).toHaveBeenCalledWith("123")
            expect(result).toStrictEqual({ id:"123", title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" })
        });
    })

})