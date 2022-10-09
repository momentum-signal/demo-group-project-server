/* external imports */
const mongoose = require("mongoose");
const colors = require("colors");

function dbConnection() {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "demo-group-project",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() =>
      console.log(colors.yellow.bold("Success: establishing DB connection"))
    )
    .catch((error) =>
      console.log(colors.red.underline(`Error: ${error.name}`))
    );
}

module.exports = dbConnection;
