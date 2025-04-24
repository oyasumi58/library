const myLibrary = [];

function Book(title,author,pageno,read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageno = pageno;
    this.read = read;
}

let book;

function addBookToLibrary(title,author,pageno,read) {
    book = new Book(title,author,pageno,read);
    myLibrary.push(book);
    createCard(book);
    return `${book.title} has been placed in the library!`;
}

//test add 3 books
addBookToLibrary('The hobbit','JRR tolkien',65,false)
addBookToLibrary('The cat','FRR Feline',650,false)
addBookToLibrary('The dog','WRR Wolf',6500,false)

//DOM stuff
function createCard(book) {
    let bookObj = book;
    console.log(bookObj.author);
    let gridCon = document.querySelector(".container");
    let cardNode = document.createElement("div");
    cardNode.setAttribute("class","card");
    gridCon.appendChild(cardNode);
    
    let bookTitle = document.createElement("p");
    bookTitle.textContent = book.title;

    let bookAuthor = document.createElement("p");
    bookAuthor.textContent = `${book.author}`;
    let bookPageNo = document.createElement("p");
    bookPageNo.textContent = `${book.pageno}`;
    //console.log(bookAuthor);

    cardNode.appendChild(bookTitle);
    cardNode.appendChild(bookAuthor);
    cardNode.appendChild(bookPageNo);
}

