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

/* router level connection */

/* application level connection */
const app = express();
const port = process.env.PORT || 5000;

/* middleware connection */
app.use(cors());

/* router connection */

/* global error handler */

/* db connection */

/* enable connection */
app.status(200).json({
  acknowledgement: true,
  message: "OK",
  description: "The request is OK",
});

/* enable port */
app.listen(port, () => {
  console.log(colors.green.bold(`Success: listening on port ${port}`));
});
