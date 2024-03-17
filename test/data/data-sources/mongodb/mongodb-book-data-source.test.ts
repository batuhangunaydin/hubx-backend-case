import { MongoDBBookDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-book-data-source'
import { NoSQLDatabaseWrapper } from '../../../../src/data/interfaces/data-sources/nosql-database-wrapper';


describe("MongoDB DataSource", () => {

    let mockDatabase: NoSQLDatabaseWrapper

    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new MongoDBBookDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{ _id:"1", title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn:"123456789", language:"tr", numberOfPages:320, publisher:"kubi"  }]))
        const result = await ds.getAll();
        expect(mockDatabase.find).toHaveBeenCalledWith({})
        expect(result).toStrictEqual([{ id:"1", title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn:"123456789", language:"tr", numberOfPages:320, publisher:"kubi"  }])
    })


    test("create", async () => {
        const ds = new MongoDBBookDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({ insertedId: "1" }))
        await ds.create({ title: "Test Book", author: { name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z" }, price: 19.99, isbn:"123456789", language:"tr", numberOfPages:320, publisher:"kubi" });
        expect(mockDatabase.insertOne).toHaveBeenCalledWith({ title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn:"123456789", language:"tr", numberOfPages:320, publisher:"kubi"  })
    })

    test("deleteOne", async () => {
        const ds = new MongoDBBookDataSource(mockDatabase);
        await ds.deleteOne("1");
        expect(mockDatabase.deleteOne).toHaveBeenCalledWith("1")
    })

    test("updateOne", async () => {
        const ds = new MongoDBBookDataSource(mockDatabase);
        await ds.updateOne("1", { title: "Test Book", author: {name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z"}, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" });
        expect(mockDatabase.updateOne).toHaveBeenCalledWith("1", { title: "Test Book", author: { name: "batuhan", country:"turkey", birthDate: "2024-01-14T13:19:16.052Z" }, price: 19.99, isbn: "123456789", language: "tr", numberOfPages: 320, publisher: "kubi" })
    })

})