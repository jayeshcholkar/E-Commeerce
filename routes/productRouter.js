const productRouter = require('express').Router()
const product = require('../controllers/productController')
const upload = require('../middleware/imageStorage')

productRouter.get('/list', product.productList)
productRouter.patch('/update/:id', product.updateProduct)
productRouter.delete('/delete/:id', product.deleteProduct)
productRouter.get('/details/:pid', product.productDetails)
productRouter.post('/add', upload.array('productImage'), product.addProduct)

module.exports = productRouter
