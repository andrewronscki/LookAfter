// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()
// const nano = require('nano')('http://andre:123456@localhost:5984').use('products')

// app.use(bodyParser.urlencoded({ extended: true }))
// app.set('view engine', 'ejs')

// app.listen(3000, () => {
//     console.log('Server running on port 3000')
// })

// app.get('/', (req, res) => {
//     res.render('index.ejs')
// })

// app.post('/show', (req, res) => {
//     nano.insert(req.body)
//     console.log('Salvo no banco de dados')    
//     res.redirect('/')
// })

// app.get('/get', (req, res) => {
//     nano.list({include_docs: true}).then((body) => {
//         res.send({data: body.rows})
//         console.log(body);
//     })
// })

// app.delete('/delete', (req, res) => { 
//     nano.destroy('8acc12dea2683dc92eb803fb8801119c', '1-169fd8d70cd1d178b31c9f109cb26dbc')
//     console.log('documento excluido')
// })

// var code = "1" 
// nano.view("myproducts", "products_by_code", function (err, body, header) { 
//     nano.get(code, function (error, existing) { 
//         if (!error) { 
//             existing.Author = "Tanzim Saqib"
//             nano.insert(existing, code, function (err, body, header) { 
//                 if (!err) { 
//                     response.writeHead(200, { "Content-Type": "text/plain" }); 
//                     response.end("products updated. Response: " + JSON.stringify(body) + "\n"); 
//                 } 
//             }) 
//         } 
//     }); 
// });




