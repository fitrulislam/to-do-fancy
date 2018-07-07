const List = require('../models/list.js')
const jwt = require('jsonwebtoken')
let secret = process.env.SECRET

module.exports = {
  create: (req, res) => {
    let decoded = jwt.verify(req.headers.token, secret)
    let objList = {
      userId: decoded.id,
      todo: req.body.todo,
      status: 'unfinished'
    }
    const newList = new List(objList)
    newList.save()
      .then(list => {
        res.status(201).json({
          message: 'list created',
          data: list
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'something went wrong'
        })
      })
  },
  read: (req, res) => {
    let decoded = jwt.verify(req.headers.token, secret)
    List.find({
      userId: decoded.id
    })
      .then(list => {
        res.status(200).json({
          message: 'list by id',
          data: list
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'something went wrong'
        })
      })
  },
  edit: (req, res) => {
    List.findOne({
      _id: req.params.id
    })
      .then(todo => {
        if (todo.status == 'unfinished') {
          List.update({
            _id: req.params.id
          }, {
            status: 'finished'
          })
            .then(one => {
              res.status(200).json({
                message: 'data updated'
              })
            })
            .catch(err => {
              res.status(500).json({
                message: 'something went wrong'
              })
            })
        } else {
          List.update({
            _id: req.params.id
          }, {
            status: 'unfinished'
          })
            .then(two => {
              res.status(200).json({
                message: 'data updated'
              })
            })
            .catch(err => {
              res.status(500).json({
                message: 'something went wrong'
              })
            })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'something went wrong'
        })
      })
  },
  delete: (req, res) => {
    List.findByIdAndRemove({
      _id: req.params.id
    })
      .then(list => {
        res.status(200).json({
          message: 'data deleted'
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'something went wrong'
        })
      })
  }
}
