const reviewRouter = require('express').Router()
const review = require('../controllers/reviewController')
const upload = require('../middleware/imageStorage')

reviewRouter.post('/add/:pid', upload.array('productImage'), review.addReview)
reviewRouter.delete('/delete/:id', review.deleteReview)
reviewRouter.patch('/update/:id', review.updateReview)

module.exports = reviewRouter
