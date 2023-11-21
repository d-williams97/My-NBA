const express = require("express");
const cors = require("cors");

const app = express(); // creates an express application that allows us to use express middleware provided by the express framework.
app.use(express.json()); // middleware that parses incoming requests with JSON payloads (HTTP post requests with a content type of application/json). It makes the data available on the request.body
app.use(cors); // stops any cross origin resource sharing errors we may get from browsers.

app.listen(3001, () => {
  console.log("API is live");
});
