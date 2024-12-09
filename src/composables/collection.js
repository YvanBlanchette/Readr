import { inject, ref, toRefs } from 'vue';


//* Creating a book class
class Book {
  constructor({
    id = '',
    cover = '',
    title = '',
    authors = '',
    description = '',
    isbn_13 = '',
    page_count = 0,
    publisher = '',
    published_date = '',
    average_rating = 0,
    my_rating = 0,
    status = '',
  }) {
    this.id = id;
    this.cover = cover;
    this.title = title;
    this.authors = authors;
    this.description = description;
    this.isbn_13 = isbn_13;
    this.page_count = page_count;
    this.publisher = publisher;
    this.published_date = published_date;
    this.average_rating = average_rating;
    this.my_rating = my_rating;
    this.status = status;
  }


  // Method to update the book data
  update(field, value) {
    this[field] = value;
  }
}



//* Creating a collection class
class Collection {
  constructor() {
    this.books = ref([]);
    this.loadFromLocalStorage();
  }


  // Method to load books from local storage
  loadFromLocalStorage() {
    const storedCollection = localStorage.getItem('collection');
    // If there is a collection in local storage, get it
    if (storedCollection) {
      this.books.value = JSON.parse(storedCollection).map(book => new Book(book));
    }
  }


  // Method to save books to local storage
  saveToLocalStorage() {
    localStorage.setItem('collection', JSON.stringify(this.books.value.map(book => book)));
  }


  // Method to get the books
  getBooks() {
    return this.books.value;
  }


  // Method to add a book to the collection
  addBook(book) {
    if (this.books.value.some(b => b.id === book.id)) {
      throw new Error(`Le livre est déjà dans la collection`);
    }
    // Validate the book data
    validateBook(book);
    // Push the book to the collection
    this.books.value.push(book);
    // Save the collection to local storage
    this.saveToLocalStorage();
  }


  // Method to remove a book from the collection
  removeBook(id) {
    // Find the index of the book with the given id
    const index = this.books.value.findIndex(book => book.id === id);

    // If the book is found, remove it
    if (index !== -1) {
      this.books.value.splice(index, 1);
    }

    // Save the updated collection to local storage
    this.saveToLocalStorage();
  }
}

// Function to validate book data
function validateBook(book) {
  if (!book.id) {
    throw new Error('L\'identifiant du livre est requis');
  }
  if (!book.title) {
    throw new Error('Le titre du livre est requis');
  }
  if (!book.authors) {
    throw new Error('Les auteurs du livre sont requis');
  }
  if (!book.description) {
    throw new Error('La description du livre est requise');
  }
  if (!book.isbn_13) {
    throw new Error('Le ISBN du livre est requis');
  }
  if (!book.page_count) {
    throw new Error('Le nombre de pages du livre est requis');
  }
  if (!book.publisher) {
    throw new Error('Le nom de l\'editeur du livre est requis');
  }
  if (!book.published_date.slice(0, 4)) {
    throw new Error('La date de publication du livre est requise');
  }
  if (book.average_rating === undefined) {
    book.average_rating = 0;
  }
}

// Create a new collection instance
const my_collection = new Collection();

// Export the collection
export { Book, Collection, my_collection };