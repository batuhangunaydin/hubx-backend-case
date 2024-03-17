export interface NoSQLDatabaseWrapper {
    find(query: object): Promise<any[]>
    insertOne(doc: any): Promise<any>
    deleteOne(id: String): void
    updateOne(id: String, data: object): void
}