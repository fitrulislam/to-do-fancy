const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()

const port = process.env.PORT || 4000

const url = `mongodb://${process.env.USER}:${process.env.PASS}@ds247759.mlab.com:47759/todofancy`
mongoose.connect(url, (err) => {
  if (!err) console.log('connected to database')
  else throw new Error(err)
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('ini home')
})

app.use('/list', require('./routes/list'))

app.listen(port, () => {
  console.log(`app running on ${port}`)
})
