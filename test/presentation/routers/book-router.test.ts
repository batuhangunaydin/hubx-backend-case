import request from "supertest";
import { BookRequestModel, BookResponseModel } from "../../../src/domain/models/book";
import { CreateBookUseCase } from "../../../src/domain/interfaces/use-cases/create-book-use-case";
import { GetAllBooksUseCase } from "../../../src/domain/interfaces/use-cases/get-all-books-use-case";
import BookRouter from '../../../src/presentation/routers/book-router'
import server from '../../../src/server'
import { UpdateBookUseCase } from "../../../src/domain/interfaces/use-cases/update-book-use-case";
import { DeleteBookUseCase } from "../../../src/domain/interfaces/use-cases/delete-book-use-case";
import { NoSQLDatabaseWrapper } from '../../../src/data/interfaces/data-sources/nosql-database-wrapper';


class MockGetAllBooksUseCase implements GetAllBooksUseCase {
    execute(): Promise<BookResponseModel[]> {
        throw new Error("Method not implemented.")
    }
}

class MockCreateBookUseCase implements CreateBookUseCase {
    execute(book: BookRequestModel): Promise<BookResponseModel> {
        throw new Error("Method not implemented.")
    }
}

class MockUpdateBookUseCase implements UpdateBookUseCase {
    execute(id: String, data: BookRequestModel): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}

class MockDeleteBookUseCase implements DeleteBookUseCase {
    execute(id: String): Promise<boolean> {
        throw new Error("Method not implemented.")
    }
}

describe("Book Router", () => {
    let mockCreateBookUseCase: CreateBookUseCase;
    let mockGetAllBooksUseCase: GetAllBooksUseCase;
    let mockUpdateBookUseCase: UpdateBookUseCase;
    let mockDeleteBookUseCase: DeleteBookUseCase;

    let mockDatabase: NoSQLDatabaseWrapper;

    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
        }
    })

    beforeAll(() => {
        mockGetAllBooksUseCase = new MockGetAllBooksUseCase()
        mockCreateBookUseCase = new MockCreateBookUseCase()
        mockUpdateBookUseCase = new MockUpdateBookUseCase()
        mockDeleteBookUseCase = new MockDeleteBookUseCase()
        server.use("/books", BookRouter(mockGetAllBooksUseCase, mockCreateBookUseCase, mockUpdateBookUseCase, mockDeleteBookUseCase))
    })

    /*beforeEach(() => {
        jest.clearAllMocks();
    })*/

    

    describe("POST /books", () => {

        test("POST /books", async () => {
            let InputData = { title: "Test Book", author: {name:"batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn:"123456789", language:"tr", numberOfPages:320, publisher:"kubi" }
            jest.spyOn(mockCreateBookUseCase, "execute").mockImplementation(() => Promise.resolve({id: "aa", ...InputData}))
            const response = await request(server).post("/books").send(InputData)
            expect(response.status).toBe(201)
        });

        test("POST /books returns 500 on use case error", async () => {
            const InputData = { id: "1", title: "Test Book", author: {name:"batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn:"123456789", language:"tr", numberOfPages:320, publisher:"kubi"  }
            jest.spyOn(mockCreateBookUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/books").send(InputData)
            expect(response.status).toBe(500)
        });
    })

    describe("GET /books", () => {
        test("should return 200 with data", async () => {
            const ExpectedData = [{ id: "1", title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn:"123456789", language:"tr", numberOfPages:320, publisher:"kubi"  }];
            jest.spyOn(mockGetAllBooksUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/books")

            expect(response.status).toBe(200)
            expect(mockGetAllBooksUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toMatchObject(ExpectedData)

        });

        test("GET /books returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllBooksUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/books")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        });
    })

    describe("DELETE /books", () => {

        test("DELETE /books", async () => {
            jest.spyOn(mockDeleteBookUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).delete("/books/aa").send()
            expect(response.status).toBe(200)
        });

        test("DELETE /books returns 500 on use case error", async () => {
            jest.spyOn(mockDeleteBookUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).delete("/books/bb").send()
            expect(response.status).toBe(500)
        });
    })

    describe("UPDATE /books", () => {

        test("UPDATE /books", async () => {
            jest.spyOn(mockUpdateBookUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).put("/books/aa").send()
            expect(response.status).toBe(200)
        });

        test("UPDATE /books returns 500 on use case error", async () => {
            jest.spyOn(mockUpdateBookUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).put("/books/bb").send()
            expect(response.status).toBe(500)
        });
    })

})