import axios from 'axios'
import { ref } from 'vue'

// constantS for Google Api
const API_KEY = 'AIzaSyDJNTW0_KiEok_giUQdMdi1xMLFFtY7b5w'
const API_URL = 'https://www.googleapis.com/books/v1/volumes'


//! Get books by genre
export const getBooksByGenre = async (genre) => {
  
  // Building the url for the api call
  const url = `${API_URL}?q=subject:${genre}&key=${API_KEY}`;

  // Get all books
  try {
    const response = await axios.get(url);

    // Mapping the books data
    const mappedBooks = response.data.items.map((book) => {
      return {
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        isbn_13: book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers[1] ? book.volumeInfo.industryIdentifiers[1].identifier : book.volumeInfo.industryIdentifiers[0].identifier,
        page_count: book.volumeInfo.pageCount,
        publisher: book.volumeInfo.publisher,
        published_date: book.volumeInfo.publishedDate,
        average_rating: book.volumeInfo.averageRating,
        cover: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/no_book_cover.svg',
        status: 'none',
      }
    });
    return { items: mappedBooks };
  } catch (error) {
    console.error('Erreur lors de la récupération des livres:', error);
    throw error;
  }
};



//! Search for books
export const searchBooks = async (query) => {

  // Cleaning up the query term
  const cleanQuery = cleanUpQuery(query);

  // Building the url for the api call
  const url = `${API_URL}?q=${cleanQuery}&key=${API_KEY}`;

  // Search for books using the query term
  try {
    const response = await axios.get(url);

    // Mapping the books data
    const mappedBooks = response.data.items.map((book) => {
      const volumeInfo = book.volumeInfo || {};
      return {
        id: book.id,
        title: volumeInfo.title,
        authors: volumeInfo.authors,
        description: volumeInfo.description,
        isbn_13: volumeInfo.industryIdentifiers && volumeInfo.industryIdentifiers[1] ? volumeInfo.industryIdentifiers[1].identifier : volumeInfo.industryIdentifiers[0].identifier,
        page_count: volumeInfo.pageCount,
        publisher: volumeInfo.publisher,
        published_date: volumeInfo.publishedDate,
        average_rating: volumeInfo.averageRating,
        cover: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '/no_book_cover.svg',
        status: 'none',
      }
    });
    return { items: mappedBooks };
  } catch (error) {
    // If there is an error, throw the error
    console.error('Erreur lors de la récupération des livres:', error);
  }
};



//! Get a specific book by id
export const getBookById = async (id) => {

  // Building the url for the api call
  const url = `${API_URL}/${id}?key=${API_KEY}`;

  // Get a specific book
  try {
    const response = await axios.get(url);
    // If not found, throw an error
    if (!response.data) {
      throw new Error('Livre non trouvé');
    }

    // Get the book data
    const book = response.data;
    // Mapping the book data
    const mappedBook = {
      id: book.id,
      title: book.volumeInfo && book.volumeInfo.title,
      authors: book.volumeInfo && book.volumeInfo.authors,
      description: book.volumeInfo && book.volumeInfo.description,
      isbn_13: book.volumeInfo && book.volumeInfo.industryIdentifiers && book.volumeInfo.industryIdentifiers.length > 0 ? book.volumeInfo.industryIdentifiers[0].identifier : null,
      page_count: book.volumeInfo && book.volumeInfo.pageCount,
      publisher: book.volumeInfo && book.volumeInfo.publisher,
      published_date: book.volumeInfo && book.volumeInfo.publishedDate,
      average_rating: book.volumeInfo && book.volumeInfo.averageRating,
      cover: book.volumeInfo && book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : '/no_book_cover.svg',
    };

    return mappedBook;
  } catch (error) {
    // If there is an error, throw the error
    console.error('Erreur lors de la récupération des livres:', error);
    throw error;
  }
};


// Function to clean up the query term
const cleanUpQuery = (query) => {
  return query.replace(/ /g, "+");
}
