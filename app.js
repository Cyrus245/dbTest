import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./modules/users.js";
mongoose.connect("mongodb://localhost:27017/mariaDB");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  User.find().then((response) => {
    res.render("home", {
      users: response,
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/", (req, res) => {
  const { name, password } = req.body;

  const newUser = new User({
    name,
    password,
  });
  newUser.save().then((res) => {
    console.log(`new user successfully saved`);
  });
  res.redirect("/");
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  User.findOne({ name }).then((response) => {
    if (Number(password) === response.password) {
      res.render("approved", {
        name: response.name,
      });
    } else {
      res.render("error");
    }
  });
});

app.listen(3000, (req, res) => {
  console.log(`server started on port 3000`);
});
