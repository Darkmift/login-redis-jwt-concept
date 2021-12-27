const CryptoHandler = require('../../services/bcrypt.service')

const storedUsers = [
  {
    _id: 'b6619eab-f2b5-481f-b3f4-ad8e8dbe11d7',
    username: 'joe',
    password: '$2a$10$Af4xENC/YTZ2sQXfXoL.BeWMb7FRjQM/n5kVDsBqNl.jC4MSJJROa'
  },
  {
    _id: 'c11b1363-21db-4f9d-bc57-12b6aeb6ddf6',
    username: 'bob',
    password: '$2a$10$h0DNOflo0NXomqc/wiEG3.vBpPGNwwCvqSjEK5JZEucK5gD564pAK'
  },
  {
    _id: '3fdbddcc-4fff-4819-96fd-104b9e06ed77',
    username: 'bill',
    password: '$2a$10$MoFyttZDdUAzshIfj1BsBuBfdzWmT9E/NqZX2hdlIifjtvY/3POHC'
  }
]

function _removePassword(user) {
  const returnUser = JSON.parse(JSON.stringify(user))
  delete returnUser.password;

  return returnUser
}

const login = async ({ username, password }) => {
  try {
    const user = storedUsers.find(u => u.username === username);

    if (!user) return [null, 'not found']

    // compare pw hash from user input vs db stored pw
    const hashResult = await CryptoHandler.compare(password, user.password)
    if (!hashResult) {
      return [null, 'not authorized']
    }

    return [_removePassword(user), null]
  } catch (error) {
    console.log("🚀 ~ file: user.service.js ~ line 19 ~ login ~ error", error)
    return [null, error]
  }
};


module.exports = {
  login
};