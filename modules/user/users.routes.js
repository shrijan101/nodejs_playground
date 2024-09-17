const express = require("express");
const userController = require("./user.controller");

// const db = require("./user.controller");

const userRoutes = express.Router();

userRoutes.post("/create", userController.createUser);
userRoutes.post("/login", userController.login);
userRoutes.get("/fetch", userController.getUsers);
userRoutes.get("/fetch/:id", userController.getUserByEmail);
userRoutes.put("/update/:id", userController.updateUser);
userRoutes.delete("/delete/:id", userController.deleteUser);

module.exports = userRoutes;
