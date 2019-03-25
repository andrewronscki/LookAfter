const nano = require("nano")("http://adminuser:adminpassword@localhost:5984")
const http = require("http")
const server = http.createServer(function (request, response) { 
    nano.db.create("mylibrary", function (err, body, header) { 
        if (err) { 
            response.writeHead(500, { "Content-Type": "text/plain" })
            response.end("Database creation failed. " + err + "\n")
        } else { 
            response.writeHead(200, { "Content-Type": "text/plain" })
            response.end("Database created. Response: " + JSON.stringify(body) + "\n")
        } 
    })
})

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


 
server.listen(8000) 
console.log("Server running at http://127.0.0.1:8000/")




