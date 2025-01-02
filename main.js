const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());
// Define the routes and implement the CRUD operations for the books collection

let books = [];

// read the file json data
function readJsonFile(){
  fs.readFile('./books.json', (error, data) => {
    if(error){
      console.log('Error occured while reading data from file.');
      return;
    }
    books = JSON.parse(data);
    console.log('Reading file is done.')
  })
}
readJsonFile();
function writeJsonFile(){
  fs.writeFile('./books.json', JSON.stringify(books, null, 2), (err) => {
    if(err){
      console.log('Error occured while writing file');
      return;
    }
    console.log('Writing file is done.')
  })
}

app.get('/books', (req, res) =>{
  res.json({status: "success", data: books});
})
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find(book => book.id == id);
  if(book){
    res.json({status: 'success', data: book});
    return;
  }
  res.status(404).json({status: "failed", message: "Book not found with the given id."});
})

// create a route to create book
app.post('/books', (req, res) =>{
  books.push({...req.body});
  res.json({status: "success", data: books});
  writeJsonFile();
})
// create a route to update a book
app.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find(book => book.id == id);
  if(book){
    books = books.map(book => {
      if(book.id == id){
        return {...req.body}
      }
      return book;
    })
    return res.json({status: 'success', data: books});
    writeJsonFile();
  }
  res.status(404).json({status: "failed", message: "Book not found with given id."});
})
// create route to delete a book
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find(book => book.id == id);
  if(book){
    books = books.filter(book => book.id != id);
    return res.json({status: 'success', data: books});
    writeJsonFile();
  }
  res.status(404).json({status: "failed", message: "Book not found with given id."});

})
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
