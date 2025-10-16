const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://teja-yarragunta-db:QqYvnD08ZXezZmyy@db.31eftdt.mongodb.net/todo";

const connectDb = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("connected to the db"))
    .catch((err) => console.log("error connecting to the database"));
};

module.exports = { connectDb };
