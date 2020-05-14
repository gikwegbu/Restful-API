const express = require('express') 
const app = express(); /* Init Express */
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')



const productRoute = require('./api/routes/products')
const orderRoute = require('./api/routes/orders') 

// Connecting to DB
mongoose.connect('mongodb+srv://mr-browny:noderestapi@node-rest-api-f7u4e.mongodb.net/noderestapi?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true  })
// const db =mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDb COnnection Error:'))

// Middlewares 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Handling Cross Origin Resourse Sharing (CORS) errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') /* This will not send the response, but adjust it, the '*' means every site can access it, since it is a resstful api, but for personal site, restrict it http://mysite.com */
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization') /* You can use asterix '*' to accept every thing  */
    if(req.method === 'OPTIONS'){ /* NB: a broswer always sends the method options first when making a get, post request */
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({}); /* Since i dont need to render any response, then i use just empty json({}) */
    }
    next();
})

app.use('/products', productRoute); /* This is a filter to direcet any route that is hitting the /products endpoint, then it redirectes it to the product api route */
app.use('/orders', orderRoute)  /* This is a filter to direcet any route that is hitting the /orders endpoint, then it redirectes it to the product api route */

// Handling Errors on routes
app.use((req, res, next) => { /** The next is a function used by the middleware to call the next line of function */
    const error = new Error('Not Found')
    error.status = 404
    next(error) /** This sends error to the next function after this middleware */
})

app.use((error, req, res, next) => {
    // This error phase is used to catch any error that occurs on the server.
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;