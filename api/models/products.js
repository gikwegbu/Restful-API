const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})


module.exports = mongoose.model('Product', productSchema)

// The export takes mongoose.model()
// This has two parameters, the name used to export it and the schema
// NB: by convention, alwasys use uppercase for the name
// Schema is like a blueprint, or model, used in building things.