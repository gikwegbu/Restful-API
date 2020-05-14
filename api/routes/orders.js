const express = require('express')
// Using The express router
const router = express.Router();

router.get('/', (req, res, next) => { /** Getting all the orders */
    res.status(200).json({
        message: 'Orders  were fetched. /orders'
    })
})

router.post('/', (req, res, next) => { /** Creating new order */
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Orders  were Created.',
        order: order
    })
})

router.get('/:orderId', (req, res, next) => { /** Getting a particular Order */
    res.status(200).json({
        message: 'Order Retrieved',
        orderId: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => { /** Deleting a particular Order */
    res.status(200).json({
        message: 'Order Deleted',
        orderId: req.params.orderId
    })
})


module.exports = router;