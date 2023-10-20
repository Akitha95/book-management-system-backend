import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Create a new Book
router.post("/", async (request, response) => {
  try {
    // for validation
    if (!request.body.title || !request.body.author || !request.body.isbn) {
      return response.status(400).send({
        message: "All fields are required",
      });
    }

    const isbn = request.body.isbn;

    // Check for duplicate
    const duplicate = await Book.findOne({ isbn }).lean().exec();

    if (duplicate) {
      return response.status(409).json({
        message: "Duplicate ISBN",
      });
    }

    // Create new book
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      isbn: request.body.isbn,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get all books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get one book from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Update a Book
router.put("/:id", async (request, response) => {
  try {
    // for validation
    if (!request.body.title || !request.body.author || !request.body.isbn) {
      return response.status(400).send({
        message: "All fields required",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({
        message: "Book not found",
      });
    }

    return response.status(200).send({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete a book
router.delete("/:isbn", async (request, response) => {
  try {
    const { isbn } = request.params;

    const result = await Book.findOneAndDelete({ isbn }).lean().exec();

    if (!result) {
      return response.status(404).json({
        message: "Book not found",
      });
    }

    return response.status(200).send({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
