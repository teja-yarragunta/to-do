const mongoose = require("mongoose");

const mongoURI = "ichata mi mongo uri pettandi";

const connectDb = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("connected to the db"))
    .catch((err) => console.log("error connecting to the database"));
};

module.exports = { connectDb };
