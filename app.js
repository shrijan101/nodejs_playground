const express = require("express");
const userRoutes = require("./modules/user/users.routes");
const bodyParser = require("body-parser");

const app = express();
//MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/users", userRoutes);
//PORT
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
