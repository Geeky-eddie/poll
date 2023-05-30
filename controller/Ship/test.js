// Node.js program to demonstrate the 
// fs.writeFile() method 
  
// Import the filesystem module 
const fs = require('fs'); 
  
let data = "This is a file containing a collection of books.\n"; 
  
fs.appendFile("books.txt", data, (err) => { 
  if (err) 
    console.log(err); 
  else { 
    console.log("File written successfully\n"); 
  } 
}); 

