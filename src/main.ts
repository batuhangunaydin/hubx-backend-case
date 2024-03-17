import server from './server'
import BookRouter from './presentation/routers/book-router'
import { GetAllBooks } from './domain/use-cases/book/get-all-books'
import { BookRepositoryImpl } from './domain/repositories/book-repository'
import { CreateBook } from './domain/use-cases/book/create-book'
import { UpdateBook } from './domain/use-cases/book/update-books'
import { DeleteBook } from './domain/use-cases/book/delete-book'
import { connectToMongoDB } from './data/data-sources/mongodb/mongodb-utils'

(async () => {
    const dataSource = await connectToMongoDB();

    const bookMiddleWare = BookRouter(
        new GetAllBooks(new BookRepositoryImpl(dataSource)),
        new CreateBook(new BookRepositoryImpl(dataSource)),
        new UpdateBook(new BookRepositoryImpl(dataSource)),
        new DeleteBook(new BookRepositoryImpl(dataSource))
    )

    server.use("/books", bookMiddleWare)
    server.listen(4000, () => console.log("Running on http://localhost:4000"))

})()
