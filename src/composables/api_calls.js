import axios from 'axios'
import { ref } from 'vue'


// Get books by genre
export const getBooksByGenre = async (genre) => {

  // Api Url
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&key=AIzaSyDJNTW0_KiEok_giUQdMdi1xMLFFtY7b5w`;

  // Get all books
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des livres:', error);
    throw error;
  }
};


// Search for books
export const searchBooks = async (query) => {

  // Cleaning up the query term
  const cleanQuery = cleanUpQuery(query);

  // Api Url
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${cleanQuery}&key=AIzaSyDJNTW0_KiEok_giUQdMdi1xMLFFtY7b5w`;

  // Search for books using the query term
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des livres:', error);
    throw error;
  }
};


// Get a specific book by id
export const getBookById = async (id) => {

  // Api Url
  const apiUrl = `https://www.googleapis.com/books/v1/volumes/${id}&key=AIzaSyDJNTW0_KiEok_giUQdMdi1xMLFFtY7b5w`;

  // Get a specific book
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des livres:', error);
    throw error;
  }
};


// Function to clean up the query term
const cleanUpQuery = (query) => {
  return query.replace(/ /g, "+");
}
