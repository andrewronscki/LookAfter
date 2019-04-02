const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
const nano = require('nano')('http://andre:123456@localhost:5984').use('products')
const moment = require('moment')
moment.locale('pt-br')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(3000, () => {
    console.log('Server running on port 3000')  
})

app.post('/add', (req, res) => {
    nano.insert(req.body, (err, body, header) => {
        if(!err) {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end(JSON.stringify(req.body))
        }else {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end( 'Falha ao inserir produto. ' + err + '\n' )
        }
    })
    
})

app.get('/get', (req, res) => {
    nano.view('myproducts', 'products_by_id', (err, body, header) => { 
        if(!err) { 
            res.writeHead( 200, { 'Content-Type': 'text/plain' })
            res.end(JSON.stringify(body.rows.map(product => product.value)))
        }else {
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end( 'Falha ao buscar produtos. ' + err + '\n' )               
        } 
    }) 
})

app.put('/update', (req, res) => {
    const id = req.body._id
    const model = req.body.model
    const description = req.body.description
    const size = req.body.size
    const amount = req.body.amount
    nano.view('myproducts', 'products_by_id', (err, body, header) => {             
        nano.get(id, (err, existing) => { 
            if(!err) { 
                existing.model = model
                existing.description = description
                existing.size = size
                existing.amount = amount
                nano.insert(existing, id, (err, body, header) => { 
                    if(!err) { 
                        res.writeHead(200, { 'Content-Type': 'text/plain' })
                        res.end(JSON.stringify(body))
                    }else {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end( 'Falha ao atualizar produto. ' + err + '\n' )
                    }
                }) 
            } 
        })
    })
})

app.put('/delete', (req, res) => {
    const id = req.body._id
    nano.view('myproducts', 'products_by_id', (err, body, header) => { 
        nano.get(id, (err, existing) => { 
            if(!err) { 
                existing.disabled = true
                nano.insert(existing, id, (err, body, header) => { 
                    if(!err) { 
                        res.writeHead(200, { 'Content-Type': 'text/plain' })
                        res.end(JSON.stringify(body))
                    }else {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end( 'Falha ao deletar produto. ' + err + '\n' )
                    }
                }) 
            } 
        })
    })
})

app.put('/buy', (req, res) => {
    const id = req.body._id
    const amount = req.body.amount
    const bought = req.body.bought
    nano.view('myproducts', 'products_by_id', (err, body, header) => { 
        nano.get(id, (err, existing) => { 
            if(!err) { 
                const resultAmount = amount - 1
                const resultBought = bought + 1                 
                existing.amount = resultAmount
                existing.bought = resultBought
                if(existing.firstDate == '') {
                    existing.firstDate = moment()
                }else {
                    existing.secondDate = moment()
                    const first = existing.firstDate
                    const second = existing.secondDate
                    existing.resetStock = second.diff(first, 'minutes') * resultAmount    
                }
                nano.insert(existing, id, (err, body, header) => { 
                    if(!err) { 
                        res.writeHead(200, { 'Content-Type': 'text/plain' })
                        res.end(JSON.stringify(body))                        
                    }else {
                        res.writeHead(500, { 'Content-Type': 'text/plain' })
                        res.end( 'Falha ao comprar produto. ' + err + '\n' )
                    } 
                }) 
            } 
        })
    })
})

