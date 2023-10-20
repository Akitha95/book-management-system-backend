import dotenv from "dotenv";
dotenv.config();

export const PORT = 5555;

export const mongoDBURL = `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_USER_PASSWORD}@cluster0.m7yw8s2.mongodb.net/book-collection?retryWrites=true&w=majority`;
