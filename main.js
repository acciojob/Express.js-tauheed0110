const express = require('express');
const app = express();
app.use(express.json());

// Define the routes and implement the CRUD operations for the books collection

const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
