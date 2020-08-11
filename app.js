// book constructor
function Book(title, author, isbn) {
    this.title = title,
    this.author = author,
    this.isbn = isbn
}


// ui constructor
function UI() {}


UI.prototype.addBookToList = function (book) {

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

UI.prototype.showAlert = function (message, className) {
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

UI.prototype.clearFormFields = function () {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}




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
    }

    e.preventDefault();
})