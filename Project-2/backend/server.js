// Initializing Server
const express = require("express");
const server = express();
const port = 3000;
const mongoose = require("mongoose"); // import mongoose
require("dotenv").config(); // import dotenv
const { DB_URI } = process.env; // To grab the same variable from the dotenv file
const cors = require("cors"); // For disabling default browser securityy
const Product = require("./models/product"); // Importing the model schema

// Middleware
server.use(express.json()); // To ensure data is transmitted as JSON
server.use(express.urlencoded({extended: true})); // To ensure data is encoded and decoded while transmission
server.use(cors());

// Database connection and server listening
mongoose.connect(DB_URI).then(() => {
    server.listen(port, () => {
        console.log(`Database is connected\n Server is listening on ${port} \n http://localhost:3000`)
    })
})
.catch((error) => console.log(error.message));

// Root route
server.get("/", (request, response) => {
    response.send("Server is Live!");
});

// GET all the data from contacts collection
server.get("/products", async (request, response) => {
    try {
        const products = await Product.find();
        response.send(products);
    } catch (error) {
        response.status(500).send({ message: error.message});
    }
});

// POST a new contact to DB
server.post("/products", async (request, response) => {
    const { productName, brand, image, price } = request.body;
    const newProduct = new Product({
        id: crypto.randomUUID(),
        productName,
        brand,
        image,
        price,
    });
    try {
        await newProduct.save();
        response.status(200).send({ message: `Product is added successfully`});
    } catch (error) {
        response.status(400).send({ message: error.message });
    }
});

// DELETE a product from DB by it's id
server.delete("/products/:id", async (request, response) => {
    const { id } = request.params;
    try {
        await Product.findByIdAndDelete(id);
        response.send({ message: `Product is deleted with id ${id}`});
    } catch (error) {
        response.status(400).send({ message: error.message });
    }
});

// GET one product by id
server.get("/products/:id", async (request, response) => {
    const { id } = request.params;
    try {
        const productToEdit = await Product.findById(id);
        response.send(productToEdit);
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});

// PATCH a product by id
server.patch("/products/:id", async (request, response) => {
    const { id } = request.params;
    const { productName, brand, image, price } = request.body;
    try {
        await Product.findByIdAndUpdate(id, {
            productName,
            brand,
            image,
            price,
        });
        response.send({ message: `Product has been updated with id ${id}`});
    } catch (error) {
        response.status(500).send({ message: error.message });
    }
});