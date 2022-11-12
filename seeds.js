import mongoose from "mongoose";
import User from "./modules/users.js";
mongoose.connect("mongodb://localhost:27017/mariaDB");

const users = [
  {
    name: "cyrus",
    password: 123456,
  },

  {
    name: "Sinthiya",
    password: 123456,
  },
];

User.insertMany(users).then((res) => {
  console.log(`user inserted`);
});
