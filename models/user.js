const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  password: String
}, {
  timestamps: true
})


//Check if passwords match
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

//Password Hash Middlewarey
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hashSync(this.password, salt)
    return next()
  }
})

module.exports = mongoose.model('user', userSchema, 'auth_users')