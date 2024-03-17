import { Author } from "./author";

export interface BookRequestModel {
    title: string;
    author: Author;
    price: Number;
    isbn: string;
    language: string;
    numberOfPages: Number;
    publisher: string;
}

export interface BookResponseModel {
    id: string;
    title: string;
    author: Author;
    price: Number;
    isbn: string;
    language: string;
    numberOfPages: Number;
    publisher: string;
}