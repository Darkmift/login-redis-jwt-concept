const CryptoHandler = require('./services/bcrypt.service');

const storedUsers = [
  { username: 'joe', password: '1234' },
  { username: 'bob', password: '5632' },
  { username: 'bill', password: '9999' },
];

(async () => {
  try {
    const users = await Promise.all(storedUsers.map(async u => ({ ...u, password: await CryptoHandler.hash(u.password) })))
    console.log("🚀 ~ file: encrypt.script.js ~ line 15 ~ users", users)
  } catch (error) {
    console.log("🚀 ~ file: encrypt.script.js ~ line 14 ~ error", error)
  }
})()

