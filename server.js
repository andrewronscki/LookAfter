const express = require('express')
const app = express()
const nano = require("nano")("http://adminuser:adminpassword@localhost:5984").use("mylibrary")
const http = require("http")
const server = http.createServer(function (request, response) { 
    
    app.insert('/criar', function(res,req) {
        const book = { 
            Title: "A Brief History of Time", 
            Author: "Stephen Hawking", 
            Type: "Paperback – Unabridged, September 1, 1998", 
            ISBN: "978-0553380163"
        }
     
        nano.use("mylibrary").insert(book, book.ISBN, function(err, body, header) { 
            if(err) { 
                response.writeHead(500, { "Content-Type": "text/plain" }) 
                response.end("Inserting book failed. " + err + "\n")
            } else { 
                response.writeHead(200, { "Content-Type": "text/plain" })
                response.end("Book inserted. Response: " + JSON.stringify(body) + "\n") 
            } 
        })    
    })
    
    app.get('/lista', function(res, req) {
        const isbn = "978-0553380163"
        nano.view("mylibrary", "books_by_isbn", function (err, body, header) { 
            if (err) { 
                response.writeHead(500, { "Content-Type": "text/plain" })
                response.end("Querying books failed. " + err + "\n"); } 
            else { 
                response.writeHead(200, { "Content-Type": "text/plain" })
                response.end("Books queried. Response: " + JSON.stringify(body) + "\n")
            } 
        })    
    })
    
    app.put('/atualizar', function(res, req) {
        const isbn = "978-0553380163"
        nano.view("mylibrary", "books_by_isbn", function (err, body, header) { 
            nano.get(isbn, function (error, existing) { 
                if (!error) { 
                    existing.Author = "Tanzim Saqib" 
                    nano.insert(existing, isbn, function (err, body, header) { 
                        if (!err) { 
                            response.writeHead(200, { "Content-Type": "text/plain" }) 
                            response.end("Book updated. Response: " + JSON.stringify(body) + "\n")
                        } 
                    }) 
                } 
            })
        })    
    })
    
    app.delete('/delete', function(res, req) {
        const isbn = "978-0553380163"
        nano.view("mylibrary", "books_by_isbn", function (err, body, header) {
            nano.get(isbn, function (error, existing) {
                if (!error) {
                    nano.destroy(isbn, existing._rev, function (err, body, header) {
                        if (!error) {
                            response.writeHead(200, { "Content-Type": "text/plain" })
                            response.end("Book deleted. Response: " + JSON.stringify(body) + "\n")
                        }
                    })
                }
            })
        })    
    })

})
 
server.listen(8000) 
console.log("Server running at http://127.0.0.1:8000/")




