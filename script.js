const myLibrary = [];

function Book(name,author,read) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.read = read;
}

function addBookToLibrary(name,author,read) {
    let book = new Book(name,author,read);
    myLibrary.push(book);
    return `${book.name} has been placed in the library!`;
}

console.log(addBookToLibrary('The hobbit','JRR tolkien',false));