## Requirements

[Node.js](https://nodejs.org/en/), [MongoDB Server](https://docs.mongodb.com/manual/installation/)

## Run the app locally
- git clone https://github.com/batuhangunaydin/hubx-backend-case.git

- `npm install`
- `npm run start` - This will start the application and run on port 4000
- `npm run dev` - This will start the application in development mode
- `npm run test` to test the application

### Add env variables before Using it

 ```
NODE_ENV=****
MONGO_URL=*****
MONGO_DB_NAME=*****
MONGO_DB_USER=*****
MONGO_DB_PASSWORD=*****
PORT=******
 ```

## Run the app on docker
- git clone https://github.com/batuhangunaydin/hubx-backend-case.git
- run `docker compose build`
- run `docker compose up`



# Folder Structure
``` bash
/src
│── main.ts
│── server.ts
│── presentation
│   ├── routers
│   │   └── book-router.ts
│   └── utils
│       └── book-utils.ts
├── domain
│   ├── interfaces
│   │   ├── repositories
│   │   │    └── book-repository.ts
│   │   └── use-cases
│   │       └── book
│   │           ├── create-book-use-case.ts
│   │           ├── delete-book-use-case.ts
│   │           ├── get-all-books-use-case.ts
│   │           ├── get-one-book-use-case.ts
│   │           └── update-book-use-case.ts
│   ├── models
│   │   ├── book.ts
│   │   └── author.ts
│   ├── repositories
│   │   └── book-repository.ts
│   └── use-cases
│       └── book
│           ├── create-book.ts
│           ├── delete-book.ts
│           ├── get-all-books.ts
│           ├── get-one-book.ts
│           └── update-book.ts
└── data
    ├── interfaces
    │   └── data-sources
    │       ├── nosql-database-wrapper.ts
    │       ├── sql-database-wrapper.ts
    │       └── book-data-source.ts
    └── data-sources
        └── mongodb
            ├── mongodb-book-data-source.ts
            └── mongodb-utils.ts
```

## Features

- CRUD operations for Books
- REST API Request object validations - Basic
- Setup docs
- Test cases with jest


## REST Services
The application exposes a few REST endpoints

`HTTP` `GET`  /books

`HTTP` `POST` /books

`HTTP` `PUT`  /books/:id

`HTTP` `DELETE`  /books/:id

