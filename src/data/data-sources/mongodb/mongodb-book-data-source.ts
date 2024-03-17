import { BookRequestModel, BookResponseModel } from "../../../domain/models/book";
import { BookDataSource } from "../../interfaces/data-sources/book-data-source";
import { NoSQLDatabaseWrapper } from "../../interfaces/data-sources/nosql-database-wrapper";

export class MongoDBBookDataSource implements BookDataSource {

    private db: NoSQLDatabaseWrapper
    constructor(db: NoSQLDatabaseWrapper) {
        this.db = db
    }
    async deleteOne(id: String) {
        await this.db.deleteOne(id)
    }
    async updateOne(id: String, data: BookRequestModel) {
        await this.db.updateOne(id, data)
    }
    async getOne(id: String): Promise<BookResponseModel> {
        const result = await this.db.find({ _id: id })
        return result.map(item => ({
            id: item._id.toString(),
            title: item.title,
            author: item.author,
            price: item.price,
            isbn: item.isbn,
            language: item.language,
            numberOfPages: item.numberOfPages,
            publisher: item.publisher
        }))[0]
    }

    async create(book: BookRequestModel) {
        await this.db.insertOne(book);
    }

    async getAll(): Promise<BookResponseModel[]> {
        const result = await this.db.find({})
        return result.map(item => ({
            id: item._id.toString(),
            title: item.title,
            author: {
                name: item.author.name,
                country: item.author.country,
                birthDate: item.author.birthDate
            },
            price: item.price,
            isbn: item.isbn,
            language: item.language,
            numberOfPages: item.numberOfPages,
            publisher: item.publisher
        }));
    }

}