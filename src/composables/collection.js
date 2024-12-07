import { reactive, toRefs } from 'vue';

// Create a book class
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

  // Method to update book data
  update(field, value) {
    this[field] = value;
  }
}


// Create a collection class
class Collection {
  constructor() {
    this.books = reactive([]);
    this.loadFromLocalStorage();
  }

  // Method to load books from local storage
  loadFromLocalStorage() {
    const storedCollection = localStorage.getItem('collection');
    if (storedCollection) {
      this.books = JSON.parse(storedCollection).map(book => new Book(book));
    }
  }

  // Method to save books to local storage
  saveToLocalStorage() {
    localStorage.setItem('collection', JSON.stringify(this.books.map(book => book)));
  }

  // Method to get books
  getBooks() {
    return this.books;
  }

  // Method to add a book to the collection
  addBook(book) {
    if (this.books.some(b => b.id === book.id)) {
      throw new Error(`Le livre est déjà dans la collection`);
    }
    validateBook(book);
    this.books.push(book);
    this.saveToLocalStorage();
  }

  // Method to remove a book from the collection
  removeBook(id) {
    console.log('Collection de livres :', this.books);
    console.log('Suppression du livre avec l\'ID :', id);
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      this.books = this.books.slice(0, index).concat(this.books.slice(index + 1));
    }
    console.log('Nouvelle collection de livres :', this.books);
    this.saveToLocalStorage();
  }

  // Method to update a book
  updateBook(field, value, id) {
    const book = this.books.find(book => book.id === id);
    if (book) {
      book.update(field, value);
    }
    this.saveToLocalStorage();
  }

  // Method to add a book from Google Api
  async addBookFromGoogle(id) {
    const response = getBookById(id);
    const data = await response.json();

    const book = new Book({
      id: data.id,
      title: data.volumeInfo.title,
      authors: data.volumeInfo.authors,
      description: data.volumeInfo.description,
      isbn_13: data.volumeInfo.industryIdentifiers[1].identifier,
      page_count: data.volumeInfo.pageCount,
      publisher: data.volumeInfo.publisher,
      published_date: data.volumeInfo.publishedDate,
      average_rating: data.volumeInfo.averageRating,
      cover: data.volumeInfo.imageLinks.thumbnail,
    });

    this.addBook(book);
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

const my_collection = new Collection();

export { Book, Collection, my_collection };