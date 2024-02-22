let books = [];
let currentlyEditing = null;

function addBook() {
    const bookName = document.getElementById('bookName').value;
    const authorName = document.getElementById('authorName').value;
    const bookDescription = document.getElementById('bookDescription').value;
    const pagesNumber = parseInt(document.getElementById('pagesNumber').value);
    if (bookName && authorName && bookDescription && !isNaN(pagesNumber)) {
        const book = {
            name: bookName,
            authorName: authorName,
            bookDescription: bookDescription,
            pagesNumber: pagesNumber
        };
        books.push(book);
        showbooks();
        clearInputs();
    } else {
        alert('Please fill in all fields correctly.');
    }
}

function showbooks() {
    const booksDiv = books.map((book, index) => {
        if (index === currentlyEditing) {
            // If currently editing, display input fields for editing
            return `<div>
                <h1>Edit Book ${index + 1}</h1>
                <label for="editBookName">Book Name:</label><br />
                <input type="text" id="editBookName" value="${book.name}" /><br /><br />
                <label for="editAuthorName">Author Name:</label><br />
                <input type="text" id="editAuthorName" value="${book.authorName}" /><br /><br />
                <label for="editBookDescription">Book Description:</label><br />
                <textarea id="editBookDescription">${book.bookDescription}</textarea><br /><br />
                <label for="editPagesNumber">No. of Pages:</label><br />
                <input type="number" id="editPagesNumber" value="${book.pagesNumber}" /><br /><br />
                <button onclick="saveBook(${index})">Save</button>
                <button onclick="cancelBook(${index})">Cancel</button>
            </div>`;
        } else {
            // If not editing, display book details
            return `<div>
                <h1>Book Number: ${index + 1}</h1>
                <p><strong>Book Name:</strong> ${book.name}</p>
                <p><strong>Author Name:</strong> ${book.authorName}</p>
                <p><strong>Book Description:</strong> ${book.bookDescription}</p>
                <p><strong>No. of Pages:</strong> ${book.pagesNumber} pages</p>
                <button onclick="editBook(${index})">Edit</button>
                <button onclick="deleteBook(${index})">Delete</button>
            </div>`;
        }
    }).join('');
    document.getElementById('books').innerHTML = booksDiv;
}

    function clearInputs() {
        document.getElementById('bookName').value = '';
        document.getElementById('authorName').value = '';
        document.getElementById('bookDescription').value = '';
        document.getElementById('pagesNumber').value = '';
    }

    function deleteBook(delBook){
        books.splice(delBook, 1);
        showbooks();
    }

    function editBook(index) {
        currentlyEditing = index;
        showbooks(); // Refresh the view to display the edit fields
    }
    
    function saveBook(index) {
        const editedBook = {
            name: document.getElementById('editBookName').value,
            authorName: document.getElementById('editAuthorName').value,
            bookDescription: document.getElementById('editBookDescription').value,
            pagesNumber: parseInt(document.getElementById('editPagesNumber').value)
        };
    
        if (editedBook.name && editedBook.authorName && editedBook.bookDescription && !isNaN(editedBook.pagesNumber)) {
            books[index] = editedBook;
            currentlyEditing = null;
            showbooks(); // Refresh the view to display saved changes
        } else {
            alert('Please fill in all fields correctly.');
        }
    }

    function cancelBook(index){
        currentlyEditing = null;
        showbooks();
    }