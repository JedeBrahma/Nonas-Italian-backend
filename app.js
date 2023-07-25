const express = require("express");
const cors = require("cors");
const menuData = require("./menuData.json");
const app = express();

app.use(cors());

//health check
app.get("/", (request, response) => {
  response.status(200).json({ data: "Service is running!" });
});
// get all menu items
app.get("/items", (request, response) => {
  try {
    const { items } = menuData;
    response.status(200).json({ data: items });
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});
// get items by id
app.get("/items/:id", (request, response) => {
  try {
    const { id } = request.params;
    const { items } = menuData;
    const item = items.find((item) => item.id === id);
    if (item) {
      response.status(200).json({ data: item });
    } else {
      response.status(404).json({ error: `no items found with id of ${id}` });
    }
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
});

module.exports = app;
