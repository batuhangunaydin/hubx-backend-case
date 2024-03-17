import express from 'express'
import { Request, Response } from 'express'
import { CreateBookUseCase } from '../../domain/interfaces/use-cases/create-book-use-case'
import { GetAllBooksUseCase } from '../../domain/interfaces/use-cases/get-all-books-use-case'
import { UpdateBookUseCase } from '../../domain/interfaces/use-cases/update-book-use-case'
import { DeleteBookUseCase } from '../../domain/interfaces/use-cases/delete-book-use-case'


export default function BooksRouter(
    getAllBooksUseCase: GetAllBooksUseCase,
    createBookUseCase: CreateBookUseCase,
    updateBookUseCase: UpdateBookUseCase,
    deleteBookUseCase: DeleteBookUseCase
) {
    const router = express.Router()

    router.post('/', async (req: Request, res: Response) => {
        try {
            await createBookUseCase.execute(req.body);
            res.status(201).send({ message: "Created"});
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Error saving data" });
        }
    });

    router.get('/', async (req: Request, res: Response) => {
        try {
            const books = await getAllBooksUseCase.execute();
            res.status(200).send(books);
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" });
        }
    });

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            console.log("params: ", req.params.id);
            await updateBookUseCase.execute(req.params.id, req.body);
            res.status(200).send({ message: "Updated" });
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Error updating data" });
        }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            await deleteBookUseCase.execute(req.params.id);
            res.status(200).send({ message: "Deleted" });
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ message: "Error deleting data" });
        }
    });

    return router;
}