const bcrypt = require('bcryptjs');
const saltRounds = 10;

const CryptoHandler = {
  hash(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  },
  compare(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function (err, comparisonResult) {
        if (err) reject(err)
        resolve(comparisonResult)
      });
    })
  }
}

module.exports = CryptoHandler;