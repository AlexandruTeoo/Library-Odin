class Library{
    library = [];

    addBookToLibrary(book){
        this.library.push(book);
    }

    renderLibrary(){
        const libraryDiv = document.querySelector(".library");
        libraryDiv.innerHTML = "";

        this.showBooks();
    }

    showBook(book){
        const bookLibrary = document.querySelector(".library");
        const bookCard = document.createElement("div");

        bookCard.classList.add("bookCard");
        bookCard.dataset.id = book.id;

        const bookTitle = document.createElement("h3");
        bookTitle.classList.add("bookTitle");
        bookTitle.innerText = book.title;

        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("bookAuthor");
        bookAuthor.innerText = book.author;

        const bookPages = document.createElement("p");
        bookPages.classList.add("bookPages");
        bookPages.innerText = book.pages + " pages";

        const btns = document.createElement("div");
        btns.classList.add("btns");

        const readBook = document.createElement("button");
        readBook.classList.add("btn", "read");

        readBook.innerText = book.read ? "Read" : "Not read";

        if (readBook.innerText === "Read")
        {
            readBook.classList.add("read-true");
        }
        else
        {
            readBook.classList.remove("read-true");
        }

        readBook.addEventListener("click", () => {
            const bookToToggle = this.library.find(b => b.id === book.id);
            bookToToggle.read = !bookToToggle.read;
            myLibrary.renderLibrary();
        });

        const deleteBookBtn = document.createElement("button");
        deleteBookBtn.classList.add("btn");
        deleteBookBtn.classList.add("delete");
        deleteBookBtn.innerText = "Delete Book";
        deleteBookBtn.addEventListener("click", () => {
            (this.library).splice(
                this.library.findIndex(b => b.id === book.id),
                1);
            this.renderLibrary();
        });

        btns.appendChild(readBook);
        btns.appendChild(deleteBookBtn);

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(btns);

        bookLibrary.appendChild(bookCard);
    }

    showBooks(){
        this.library.forEach(book => this.showBook(book));
    }
}

class Book{
    constructor(title, author, pages) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false;
    }
    info(){
        let text =  `${this.title} + " by " + ${this.author} + ", " + ${this.pages.toString()} + " pages, ")`;
        if (this.read === false)
            text = text.concat(`not read yet`);
        else
            text = text.concat(`read it`);
        return text;
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295);
const theHobbit2 = new Book("The Hobbit 2", "J.R.R. Tolkien blah blah blah", 295);
const theHobbit3 = new Book("The Hobbit 3", "J.R.R. Tolkien", 295);
const theHobbit4 = new Book("The Hobbit 4", "J.R.R. Tolkien", 295);

const myLibrary = new Library();

myLibrary.addBookToLibrary(theHobbit);
myLibrary.addBookToLibrary(theHobbit2);
myLibrary.addBookToLibrary(theHobbit3);
myLibrary.addBookToLibrary(theHobbit4);

console.log (theHobbit.info());

myLibrary.showBooks();

const addBookBtn = document.getElementById("addBookBtn");
const modalOverlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");

addBookBtn.addEventListener("click", () => {
    modalOverlay.classList.add("active");
});

closeModal.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
});

modalOverlay.addEventListener("click", (e) => {
    if(e.target === modalOverlay) {
        modalOverlay.classList.remove("active");
    }
});

modal.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const author = authorInput.value.trim();
    const pages = pagesInput.value.trim();

    if (title === "" || author === "" || pages === "") {
        alert("Please fill in all fields");
        return
    }

    myLibrary.addBookToLibrary(new Book(title, author, Number(pages)));

    myLibrary.renderLibrary();

    modal.reset();
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "";
});
