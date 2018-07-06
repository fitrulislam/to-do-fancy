const router = require('express').Router()
const listController = require('../controllers/listController')
const { auth } = require('../middleware/auth')

router
  .post('/create', auth, listController.create)
  .get('/read', auth, listController.read)
  .put('/edit/:id', listController.edit)
  .delete('/delete/:id', listController.delete)

module.exports = router
