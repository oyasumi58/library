const myLibrary = [];
let book;

// function Book(title,author,pageno,read) {
//     this.id = crypto.randomUUID();
//     this.title = title;
//     this.author = author;
//     this.pageno = pageno;
//     this.read = read;
// } //turn into a contructor function within class

class Book {
    constructor(title,author,pageno,read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pageno = pageno;
        this.read = read;
    }

    toggleRead(button) {
        const toggleButton = button;
        if (this.read === true) {   
            this.read = false;
            toggleButton.textContent = `Read: false`;
            toggleButton.style.background = "rgb(204, 110, 110)"
            toggleButton.style.border = "4px solid red";
        } else if (this.read === false) {
            this.read = true;
            toggleButton.textContent = `Read: true`;
            toggleButton.style.background = "rgb(137, 196, 137)"
            toggleButton.style.border = "4px solid green";
        } else {
            console.log(`read state error`);
        }
    }
}


// Book.prototype.toggleRead = function(button) { //can turn into instance method within class

//     const toggleButton = button;
//     if (this.read === true) {   
//         this.read = false;
//         toggleButton.textContent = `Read: false`;
//         toggleButton.style.background = "rgb(204, 110, 110)"
//         toggleButton.style.border = "4px solid red";
//     } else if (this.read === false) {
//         this.read = true;
//         toggleButton.textContent = `Read: true`;
//         toggleButton.style.background = "rgb(137, 196, 137)"
//         toggleButton.style.border = "4px solid green";
//     } else {
//         console.log(`read state error`);
//     }
// }

//adds book to library array
function addBookToLibrary(title,author,pageno,read) {
    book = new Book(title,author,pageno,read);
    myLibrary.push(book);
    Object.setPrototypeOf(book,Book.prototype);
    //createCard(book);
    return `${book.title} has been placed in the library!`;
}

//test add 3 books
addBookToLibrary('The hobbit','JRR tolkien',65,false)
addBookToLibrary('The cat','FRR Feline',650,false)
addBookToLibrary('The dog','WRR Wolf',6500,true)

let bookObj;
const gridCon = document.querySelector(".container");
//Handles placing of DOM nodes and stuff
function createCard(book) {
    bookObj = book;
    //console.log(bookObj.author);
    
    let cardNode = document.createElement("div");
    cardNode.setAttribute("class","card");
    gridCon.appendChild(cardNode);
    
    let bookTitle = document.createElement("h3");
    bookTitle.textContent = book.title;
    let bookAuthor = document.createElement("p");
    bookAuthor.textContent = `Author: ${book.author}`;
    let bookPageNo = document.createElement("p");
    bookPageNo.textContent = `Pages: ${book.pageno}`;
    //read state stuff
    let bookRead = document.createElement("button");
    bookRead.setAttribute("class","read");
    bookRead.setAttribute("type","button");
    bookRead.textContent = `Read: ${book.read}`;
    if (bookRead.textContent === 'Read: true') {
        bookRead.style.background = "rgb(137, 196, 137)"
        bookRead.style.border = "4px solid green";
    } else if(bookRead.textContent === 'Read: false') {
        bookRead.style.background = "rgb(204, 110, 110)"
        bookRead.style.border = "4px solid red";
    }
    //console.log(bookAuthor);

    //delete button
    let delButtonNode = document.createElement("button");
    delButtonNode.setAttribute("type","button");
    delButtonNode.setAttribute("class","delbutton");
    delButtonNode.textContent = "Delete Book";
    delButtonNode.setAttribute("data-id",book.id);

    //console.log(delButtonNode);
    cardNode.appendChild(bookTitle);
    cardNode.appendChild(bookAuthor);
    cardNode.appendChild(bookPageNo);
    cardNode.appendChild(bookRead);
    cardNode.appendChild(delButtonNode);
    let infoArray = [cardNode, bookRead];
    return infoArray;
}


// To loop thru array and place cards
const newbutton = document.createElement("button");
newbutton.setAttribute("type","button");
newbutton.textContent = `+ New Book`;

function placeCard() {
    gridCon.replaceChildren(); //To reset
    for (book of myLibrary) {
        cardNodeArray = createCard(book);
        console.log(cardNodeArray);
        addTogButton(book,cardNodeArray[0]);
    }
    addDelButton();
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
//close dialog with background
dialog.addEventListener("click", (e) => {
    if (e.target === dialog) { //dialog element is the bg, rest is children
        dialog.close();
        e.stopPropagation(); //to prevent it from bubbling to dialog if clicked on child
    }
})

//buttons
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

// cancelButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     dialog.close();
// });

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
    //console.log(`${bookTitle} ${bookAuthor} ${bookPageno} ${bookRead}`)
    console.log(Number(bookPageno));
    //Adding to library
    if (bookTitle != false && bookAuthor != false && (Number(bookPageno) > 0 && !Number.isNaN(Number(bookPageno)))) {
        addBookToLibrary(bookTitle,bookAuthor,bookPageno,bookRead);
        placeCard();
        dialog.close();
    } else if (bookTitle == false) {
        alert("State a title")
    } else if (bookAuthor == false) {
        alert("State an author")
    } else if (Number(bookPageno) <= 0 || Number.isNaN(Number(bookPageno))) {
        alert("Page number is invalid");
    }
});


function addDelButton() {
    const delButton = document.querySelectorAll(".delbutton");
    delButton.forEach(function(button) {button.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Are you sure you want to do this?")) {
            let cardId = button.getAttribute("data-id");
            console.log(cardId);
            for (i=0; i < myLibrary.length; i++) {
                console.log(myLibrary[i].id);
                if (myLibrary[i].id === cardId) {
                    console.log(`deleted ${myLibrary[i].title}`);
                    myLibrary.splice(i,1);
                    break;
                } else {
                    console.log("Pass");
                }
            }
            placeCard();
        } else {
            return
        }
    })});
}

function addTogButton(bookObj,bookNode) {
    const toggleButton = bookNode.querySelector(".read");
    toggleButton.addEventListener("click",() => {bookObj.toggleRead(toggleButton)});
}
