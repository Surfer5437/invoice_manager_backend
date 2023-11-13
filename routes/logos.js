// import { ensureAdmin } from "../middleware/auth";

const express = require("express");

const app = express();
app.use(express.static('logos'))

module.exports = app;
