class Book {
    constructor(title, author, isbn) {
        this.title = title,
        this.author = author,
        this.isbn = isbn
    }
}


class UI {
    addBookToList(book) {
        const tableBody = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="delete">X</a></td>
            </tr>    
        `;
        tableBody.appendChild(row);
    }

    clearFormFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
    
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
    
        container.insertBefore(div, form);
    
        setTimeout(() => {
            div.remove();
        }, 3000)
    }
}


class Storage {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Storage.getBooks();
        const ui = new UI();
        books.forEach((book) => {
            ui.addBookToList(book);
        });

    }

    static addBook(book) {
        const books = Storage.getBooks();
        
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Storage.getBooks();

        const filtered = books.filter((book) => {
            return book.isbn !== isbn;
        })

        localStorage.setItem('books', JSON.stringify(filtered));

    }
}

// DOM Loaded event
document.addEventListener('DOMContentLoaded', Storage.displayBooks);

// add event listener
document.querySelector('#book-form').addEventListener('submit', (e) => {
    const bookTitle = document.querySelector('#title').value;
    const bookAuthor = document.querySelector('#author').value;
    const bookISBN = document.querySelector('#isbn').value;

    const ui = new UI();

    if (bookTitle === '' || bookAuthor === '' || bookISBN === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        const book = new Book(bookTitle, bookAuthor, bookISBN);
        ui.addBookToList(book);
        ui.clearFormFields();
        ui.showAlert('Successfully added', 'success');

        Storage.addBook(book);
    }

    e.preventDefault();
})


// delete book when 'x' clicked
document.querySelector('#book-list').addEventListener('click', (e) => {

    const ui = new UI();

    if (e.target.className === 'delete') {
        ui.deleteBook(e.target);
        ui.showAlert('Successfully deleted', 'success');
        Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
    }

    e.preventDefault();
});