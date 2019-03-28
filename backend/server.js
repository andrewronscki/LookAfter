const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const nano = require('nano')('http://andre:123456@localhost:5984').use('products')

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log('Server running on port 3000')
    app.get('/', (req, res) => {
        res.render('index.ejs')
    })
    
    app.post('/show', (req, res) => {
        nano.insert(req.body)
        console.log('Salvo no banco de dados')    
        res.redirect('/')
    })
    
    app.get('/get', (req, res) => {
        nano.view("myproducts", "products_by_id", (err, body, header) => { 
            if (err) { 
                res.writeHead(500, { "Content-Type": "text/plain" })
                res.end( "Querying books failed. " + err + "\n" ) 
            } else { 
                res.writeHead( 200, { "Content-Type": "text/plain" })
                res.end( "Products queried. Response: " + JSON.stringify(body) + "\n" )
            } 
        }) 
    })
    
    app.get('/update', (req, res) => {
        const id = '8acc12dea2683dc92eb803fb8803482d'
        nano.view("myproducts", "products_by_id", (err, body, header) => { 
            nano.get(id, (err, existing) => { 
                if (!err) { 
                    existing.disabled = false
                    nano.insert(existing, id, (err, body, header) => { 
                        if (!err) { 
                            res.writeHead(200, { "Content-Type": "text/plain" })
                            res.end("Produto atualizado: " + JSON.stringify(body) + "\n")
                        } 
                    }) 
                } 
            })
        })
    })
    app.get('/delete', (req, res) => {
        const id = '8acc12dea2683dc92eb803fb8804c176'
        nano.view("myproducts", "products_by_id", (err, body, header) => { 
            nano.get(id, (err, existing) => { 
                if (!err) { 
                    existing.disabled = true
                    nano.insert(existing, id, (err, body, header) => { 
                        if (!err) { 
                            res.writeHead(200, { "Content-Type": "text/plain" })
                            res.end("Produto atualizado: " + JSON.stringify(body) + "\n")
                        } 
                    }) 
                } 
            })
        })
    })
    app.get('/comprar', (req, res) => {
        const id = '8acc12dea2683dc92eb803fb8803139f'
        nano.view("myproducts", "products_by_id", (err, body, header) => { 
            nano.get(id, (err, existing) => {
                const amount = body.rows[0].value.amount
                const bought = body.rows[0].value.bought
                console.log(amount, bought)   
                if (!err) { 
                    const resultAmount = amount - 1
                    const resultBought = bought + 1 
                    console.log(resultAmount, resultBought)                  
                    existing.amount = resultAmount
                    existing.bought = resultBought
                    console.log(existing)
                    nano.insert(existing, id, (err, body, header) => { 
                        if (!err) { 
                            res.writeHead(200, { "Content-Type": "text/plain" })
                            res.end("Produto atualizado: " + JSON.stringify(body) + "\n")
                            
                        } 
                    }) 
                } 
            })
        })
    })
})

