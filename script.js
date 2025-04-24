const myLibrary = [];
let book;

function Book(title,author,pageno,read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pageno = pageno;
    this.read = read;
}

Book.prototype.removeBook = function() {};
//Object.setPrototypeOf(book,Book.prototype);



//adds book to library array
function addBookToLibrary(title,author,pageno,read) {
    book = new Book(title,author,pageno,read);
    myLibrary.push(book);
    //createCard(book);
    return `${book.title} has been placed in the library!`;
}

//test add 3 books
addBookToLibrary('The hobbit','JRR tolkien',65,false)
addBookToLibrary('The cat','FRR Feline',650,false)
addBookToLibrary('The dog','WRR Wolf',6500,false)

let bookObj;
const gridCon = document.querySelector(".container");
//Handles placing of DOM nodes and stuff
function createCard(book) {
    bookObj = book;
    //console.log(bookObj.author);
    
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

// To loop thru array and place cards
const newbutton = document.createElement("button");
newbutton.setAttribute("type","button");
newbutton.textContent = `+ New Book`;

function placeCard() {
    gridCon.replaceChildren(); //To reset
    for (book of myLibrary) {
        createCard(book);
    }
    gridCon.appendChild(newbutton); // this is to occur last
}



placeCard();
console.log(myLibrary);

//new book button stuff


const dialog = document.querySelector("dialog");
const submitButton = document.querySelector(".submit");
const cancelButton = document.querySelector(".cancel");
const resetButton = document.querySelector(".reset");

const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPageno = document.getElementById("pageno");
const inputRead = document.getElementById("read");


newbutton.addEventListener("click", () => {
   dialog.showModal();
});

resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPageno.value = "";
    inputRead.checked = false;
});

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let bookTitle = inputTitle.value;
    let bookAuthor = inputAuthor.value;
    let bookPageno = inputPageno.value;
    let bookRead;
    if (inputRead.checked) {
        bookRead = true;
    } else {
        bookRead = false;
    }
    console.log(`${bookTitle} ${bookAuthor} ${bookPageno} ${bookRead}`)
});

