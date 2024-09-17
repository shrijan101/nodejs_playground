// const pool = require("../db/database");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const { where } = require("sequelize");
const User = require("../user/users.model");
const jwt = require("jsonwebtoken");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Test",
  password: "shrijan123",
  port: "5432",
});

const SECRET_KEY = "secret";

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const getUser = await User.findOne({ where: { email: email } });

    if (!getUser) {
      return res
        .status(401)
        .json({ error: "This email does not exist in the system" });
    }
    // console.log(getUser);

    const isPasswordValid = await verifyPassword(password, getUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "invalid email or passowrd" });
    }
    const access_token = jwt.sign(
      { id: getUser.dataValues.id, email: getUser.dataValues.email },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    console.log("this is stokennnnnnnnnnnn", access_token);
    return res.status(200).json({ message: "Login Successful", access_token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred during login" });
  }
};

const getUsers = async (req, res) => {
  try {
    const getUser = await User.findAll({});

    if (!getUser) {
      return res
        .status(401)
        .json({ error: "Problem with your route or no data exists" });
    }
    return res.status(200).json({ getUser });
  } catch (error) {
    return res.status(500).json({ error: "no data is being fetched" });
  }
};

const getUserByEmail = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const getUser = await User.findOne({ where: { id: id } });
    if (!getUser) {
      return res
        .status(401)
        .json({ error: "This email does not exist in the system" });
    }
    return res.status(200).json({ getUser });
  } catch (error) {
    return res.status(500).json({ error: "no data is being fetched" });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: "Name,Password and email are required" });
  }

  try {
    const hashedPassword = await hashPassword(password);

    const createUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).send(`User added with ID: ${createUser}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating user" });
  }
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  login,
  getUsers,
  getUserByEmail,
  createUser,
  updateUser,
  pool,
  deleteUser,
};
