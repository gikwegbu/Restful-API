const express = require('express') 
const router = express.Router(); /* Using The express router */
const mongoose = require('mongoose')

// requiring the product model schema
const Product = require('../models/products')

router.get('/', (req, res, next)=> { /* Get all the products */
    res.status(200).json({
        message: 'Handling Get Request to /products'
    })
})


router.post('/', (req, res, next)=> { /* Post to product db */ 
    const product = new Product({  /* This is a js constructor fn */
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    }); 
    product
        .save()
        .then(result => console.log(result) )
        .catch(err =>  console.log(err) );

    console.log(product)
    res.status(201).json({
        message: 'Handling Post Request to /products',
        createdProduct: product
    })
})

router.get('/:productId', (req, res, next)=> { /** Fetching a specific product with it's ID */
   const id = req.params.productId;
   console.log(id)
    Product.findById(id)
        .select(' name price _id')
        .exec()
        .then(doc => {
            console.log(doc)
            res.status(200).json({
                message: 'Product found Successfully',
                data: doc
            }) 
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        }) 

        next()
})

router.patch('/:productId', (req, res, next)=> { /* Update a particular product with it's Id */
    res.status(200).json({
        message: 'Updated a Product'
    })
})


router.delete('/:productId', (req, res, next)=> { /* Delete a particular product with it's Id */
    res.status(200).json({
        message: 'Deleted a  Product'
    })
})

module.exports = router;