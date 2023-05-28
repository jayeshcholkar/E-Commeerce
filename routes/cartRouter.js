const cartRouter = require('express').Router()
const cart = require('../controllers/cartController')

cartRouter.post('/add/:id', cart.addToCart)

module.exports = cartRouter