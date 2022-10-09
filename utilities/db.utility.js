/* external imports */
const mongoose = require("mongoose");
const colors = require("colors");

/**
 * Error: MongooseError: Operation `users.insertOne()` buffering timed out after 10000ms
 * https://stackoverflow.com/questions/65680842/error-mongooseerror-operation-users-insertone-buffering-timed-out-after-1
 */
function dbConnection() {
  mongoose
    .connect(process.env.DB_URI, {
      dbName: "demo-group-project",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: true
    })
    .then(() =>
      console.log(colors.yellow.bold("Success: establishing DB connection"))
    )
    .catch((error) =>
      console.log(colors.red.underline(`Error: ${error.name}`))
    );
}

module.exports = dbConnection;
