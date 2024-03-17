import { BookRequestModel } from "../../domain/models/book";

export function ValidateBookRequest(bookRequest: BookRequestModel): boolean {
    if (
        !bookRequest ||
        typeof bookRequest !== 'object' ||
        !bookRequest.title ||
        typeof bookRequest.title !== 'string' ||
        !bookRequest.author ||
        typeof bookRequest.author !== 'object' ||
        !bookRequest.author.name ||
        typeof bookRequest.author.name !== 'string' ||
        !bookRequest.author.country ||
        typeof bookRequest.author.country !== 'string' ||
        !bookRequest.author.birthDate ||
        typeof bookRequest.author.birthDate !== 'string' ||
        typeof bookRequest.price !== 'number' ||
        bookRequest.price < 0 ||
        !bookRequest.isbn ||
        typeof bookRequest.isbn !== 'string' ||
        !bookRequest.language ||
        typeof bookRequest.language !== 'string' ||
        typeof bookRequest.numberOfPages !== 'number' ||
        bookRequest.numberOfPages < 0 ||
        typeof bookRequest.publisher !== 'string' ||
        !bookRequest.publisher
    ) {
        return false;
    }

    return true; 
}