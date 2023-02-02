const express = require('express')
const router = express.Router()
const reviewsCtrl = require('../controllers/reviews')
const ensureLoggedIn = require('../config/ensureLoggedIn') 

router.post('/movies/:id/reviews', ensureLoggedIn, reviewsCtrl.create)
router.delete('/reviews/:id', ensureLoggedIn, reviewsCtrl.delete)
router.put('/reviews/:movieId/:reviewId', ensureLoggedIn, reviewsCtrl.update)
router.get('/reviews/:id/edit', ensureLoggedIn, reviewsCtrl.edit)

module.exports = router