const jwt = require('jsonwebtoken')
const { SECRET_JWT } = process.env

const sign = (user) => new Promise((resolve, reject) => {
  jwt.sign({ user }, SECRET_JWT, { expiresIn: 60 * 60 }, (err, token) => {
    console.log("🚀 ~ file: jwt.service.js ~ line 6 ~ jwt.sign ~ SECRET_JWT", SECRET_JWT)
    err ? reject(err) : resolve(token)
  })
})

const verify = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, SECRET_JWT, null, (err, decodedToken) => {
    err ? reject(err) : resolve(decodedToken)
  })
})

module.exports = {
  sign,
  verify
}