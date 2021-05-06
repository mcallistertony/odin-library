//init library as an empty aray that will store books in object format
let myLibrary = [];

//Book constructor function
function Book(title, author, pages, language, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.read = read;
    this.date = new Date().toISOString().slice(0, 10);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

//ficitonal books to check how it looks
let hobbitBook = new Book(
        'zhe Hobbit',
        'J.R.R Tolkien',
        196,
        'English',
        'read'
)

let harryBook = new Book(
        'arry Potter',
        'J.K. Rowling',
        425,
        'English',
        'not-read'
)

function toggleReadCss(card) {
    card.classList.toggle('read');
    
}

function toggleReadObject(card) {
    //to switch the read status of the card text
    let statusSectionContainer = card.querySelector('.status-section-container');
    let bookTitle = statusSectionContainer.getAttribute('id').replace('status-container-', ''); //get the title from the book 
    let bookFound = myLibrary.find(book => book.title === `${bookTitle}`);//get the book from the library
    let bookFoundIndex = myLibrary.findIndex(book => book.title === `${bookTitle}`); //find the index of the book in the library to modify it than replace it
    let replaceString = (bookFound.read === 'read') ? 'not-read' : 'read'; //edit the book object
    myLibrary[bookFoundIndex].read = replaceString;
    console.log(myLibrary);
}

function toggleReadText(card) {
    let statusSectionButton = card.querySelector('.status-section-container')
            .querySelector('button');
    statusSectionButton.textContent = (statusSectionButton.textContent === 'read') ? 'not read' : 'read';
    countBooks();
}



function toggleActive() {
    //get the modal and toggle them active
    let modal = document.querySelector('#add-new-modal')
    modal.classList.toggle('active');
    //get the opacity layer and toggle it active
    let opacityLayer = document.querySelector('#add-new-opacity');
    opacityLayer.classList.toggle('active');
}

//add fictional books to the library
addBookToLibrary(hobbitBook);
addBookToLibrary(harryBook);



function displayBooks(myLibrary) {
    //Sort the library by the default values of name and asc.
    myLibrary.forEach(book => {
        let card = document.createElement('div');//create the div
        card.classList.add('book-card')//set the class style for a card
        //Create the H2 for the book card
        let h2 = document.createElement('h2');//put an h2 to hold the book title
        h2.textContent = book.title;//set h2 text content equal to book.title
        card.appendChild(h2);//append the h2 to the card

        //create the other params for the book
        for (let key in book) { //For each param of book
            if (key === 'title' || key === 'read') continue; //except title because its not a 'p' element
            const p = document.createElement('p'); //create a P element to store the value
            p.setAttribute('id', `card-${key}`) //set the id for the p
            //set a prefix for the value
            let prefix;
            switch (key) {
                case 'author':
                    prefix = 'BY:';
                    break;
                case 'pages':
                    prefix = 'Number of pages:';
                    break;
                case 'language':
                    prefix = 'Language:'
                    break;
                case 'date':
                    prefix = 'Date added:'
                    break;
            }
            p.textContent = `${prefix} ${book[key]}`;
            card.appendChild(p);
        }

        //create the change status section of card
        const statusSectionContainer = document.createElement('div'); //container for the section
        statusSectionContainer.classList.add('status-section-container');
        statusSectionContainer.setAttribute('id', `status-container-${book.title}`);
        card.appendChild(statusSectionContainer); //add container to the card
        let statusSectionText = document.createElement('label');//create p to hold the label
        statusSectionText.textContent = 'change status:'; //set the text for the text label
        statusSectionContainer.append(statusSectionText);
        let statusSectionButton = document.createElement('button');

        //set the status section button depending on it read status      
        statusSectionButton.textContent = (book.read === 'not-read') ? 'not read' : 'read'; // depends on the 
        statusSectionContainer.appendChild(statusSectionButton);

        //add event listener on the button og the change status
        statusSectionButton.addEventListener('click', (e) => {toggleReadCss(e.target.parentNode.parentNode)});
        statusSectionButton.addEventListener('click', (e) => {toggleReadObject(e.target.parentNode.parentNode)});
        statusSectionButton.addEventListener('click', (e) => {toggleReadText(e.target.parentNode.parentNode)});

        //cehck if the book is read
        if (book.read === 'read') toggleReadCss(card);

        let bookGrid = document.querySelector('#book-grid');//select the container
        //append the card to the book grid
        bookGrid.appendChild(card);
    });
}

function resetGrid() {
    let bookGrid = document.querySelector('#book-grid');//get the grid containuer
    bookGrid.textContent = '';//set it to the content = '' to remove all child nodes
}

function alertWrongInput() {
    alert('please fill all fields')
}
function verifyInputs() {
    //get values
    let titleValue = document.querySelector('#title-input').value.toLowerCase();
    let authorValue = document.getElementById('author-input').value.toLowerCase();
    let pagesValue = document.getElementById('pages-input').value;
    let languageValue = document.getElementById('language-input').value.toLowerCase();
    let statusValue = document.getElementById('read-input').value;

    //check if all fields are set
    return (titleValue && authorValue && pagesValue && languageValue && (statusValue === 'read' || statusValue === 'not-read')) ? //check for all inputs
    new Book(titleValue, authorValue, pagesValue, languageValue, statusValue) : //if input are valid return true
    false; //else return false
}

function resetModalFields() {
    let titleValue = document.querySelector('#title-input');
    let authorValue = document.getElementById('author-input');
    let pagesValue = document.getElementById('pages-input');
    let languageValue = document.getElementById('language-input');
    let statusValue = document.getElementById('read-input');

    titleValue.value = '';
    authorValue.value = '';
    pagesValue.value = '';
    languageValue.value = '';
    statusValue.value = 'Did you read this book?';
}

function addBookLibrary() {
    let bookData = verifyInputs(); //check if we have received the book data
    (bookData) ? addBookToLibrary(bookData) : alertWrongInput(); //if we have, add the book to the book library array else, alert to fill all fields
    resetGrid();//reset the grid by removing all currently displayed books
    displayBooks(myLibrary); //refresh the books displayed
    resetModalFields();//clear to modal form fields
    toggleActive();//close the modal
    orderLibrary();
    countBooks();
}

function sort(field1, field2) {
    if (field1 === 'name' && field2 === 'asc') {
        myLibrary = myLibrary.sort((bookA, bookB) => {return (bookA.title > bookB.title) ? 1 : -1});
    };
    if (field1 === 'name' && field2 === 'desc') {
        myLibrary = myLibrary.sort((bookA, bookB) => {return (bookA.title > bookB.title) ? -1 : 1});
    };
    if (field1 === 'date' && field2 === 'asc') {}; //NOT WIRED NOT RELEVANT FOR THE EXERCISE
    if (field1 === 'date' && field2 === 'desc') {}; //NOT WIRED NOT RELEVANT FOR THE EXERCISE
}

function orderLibrary() {
    //get values of the order choices
    let orderDateNameVal = orderDateName.value;
    let orderAscDescVal = orderAscDesc.value;
    

    //sort the array
    if (orderDateNameVal === 'name') {
        if (orderAscDescVal === 'asc') {
            sort('name', 'asc');
        } else if (orderAscDescVal === 'desc') {
            sort('name', 'desc');
        }
    } else if (orderDateNameVal === 'date') {
        if (orderAscDescVal === 'asc') {
            sort('date', 'asc');
        } else if (orderAscDescVal === 'des') {
            sort('date', 'desc');
        }
    }

    //reset the grid
    resetGrid();
    displayBooks(myLibrary); //refresh the books displayed

};

function countBooks() {
    let totalBooks = (document.querySelectorAll('.book-card')).length;
    let booksRead = (document.querySelectorAll('.read')).length;
    let booksNotRead = totalBooks - booksRead;
    
    //select the number inputs in the dashboard
    const totalBooksCountField = document.querySelector('#totalBooksCount');
    const readBooksCountField = document.querySelector('#readBooksCount');
    const notReadBooksCountField = document.querySelector('#notReadBooksCount');

    totalBooksCountField.textContent = totalBooks;
    readBooksCountField.textContent = booksRead;
    notReadBooksCountField.textContent = booksNotRead;
}

//add event listener on the add new book button
const addBookBtn = document.querySelector('#add-book-btn');
addBookBtn.addEventListener('click', toggleActive);

//add event listener on the close button
const closeBtn = document.querySelector('#modal-close-btn');
closeBtn.addEventListener('click', toggleActive);

//ad event listener on the add button
const modalAddBtn = document.querySelector('#modal-add-btn');
modalAddBtn.addEventListener('click', addBookLibrary);

//ADD EVENT LISTENERS ON THE ORDER BY BUTTONS
const orderDateName = document.querySelector('#order-by-select');
orderDateName.onchange = () => {orderLibrary()};

const orderAscDesc = document.querySelector('#order-date');
orderAscDesc.onchange = () => {orderLibrary()};

displayBooks(myLibrary);
orderLibrary();
countBooks();