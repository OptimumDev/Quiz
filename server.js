const express = require("express");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.static("static"));