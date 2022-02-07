import {Application, Router} from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { v4 } from "https://deno.land/std@0.122.0/uuid/mod.ts";

const router = new Router();

interface Book {
    id: string,
    title: string,
    author: string;
}

let books: Book[] = [
    {
        id:"1",
        title:"Book One",
        author: "One"
    },
    {
        id:"2",
        title:"Book Two",
        author: "Two"
    },
    {
        id:"3",
        title:"Book Three",
        author: "Three"
    }
];

router
    .get('/', (context) => {
        context.response.body = "Hello world!!";
    })
    .get('/books', (context) => {
        context.response.body = books;
    })
    .post("/book", async (context) => {
        const body = await context.request.body();

        if(!context.request.hasBody) {
            context.response.status = 400
            context.response.body = "데이터가 없습니다."
        } else {
            
            const myUUID = crypto.randomUUID();
       
            const book: Book= await body.value;
            book.id = myUUID;

            books.push(book);
            context.response.status = 201;
            context.response.body = book;

        }

    })



console.log('http://localhost:8080');

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port : 8080});