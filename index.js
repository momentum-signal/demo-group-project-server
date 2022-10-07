/**
 * Title: A group project demonstration
 * Description: A simple and minimal group project to demonstrate GitHub team workflow & collaboration
 * Author: Momentum Signal
 * Date: 05/10/2022
 */

/* external imports */
const express = require("express");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();

/* internal imports */
const dbConnection = require("./utilities/db.utility");
const errorHandler = require("./middlewares/error.middleware");

/* router level connection */

/* application level connection */
const app = express();
const port = process.env.PORT || 5000;

/* middleware connection */
app.use(cors());

/* router connection */

/* global error handler */
app.use(errorHandler);

/* db connection */
dbConnection();

/* enable connection */
app.get("/", (req, res) => {
  try {
    res.status(200).json({
      acknowledgement: true,
      message: "OK",
      description: "The request is OK",
    });
  } catch (error) {
    res.status(204).json({
      acknowledgement: false,
      message: "No Content",
      description:
        "The request has been successfully processed, but is not returning any content",
    });
  }
});

/* enable port */
app.listen(port, () => {
  console.log(colors.cyan.bold(`Success: listening on port ${port}`));
});
