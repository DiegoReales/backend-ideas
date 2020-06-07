const mongoose = require('mongoose');
const { compareSync, hashSync, genSaltSync } = require('bcryptjs') 
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.methods.comparePassword = function (password) {
  return compareSync(password, this.password);
}

UserSchema.methods.toJSON = function () {
  let user =  this.toObject()
  delete user.password;
  return user;
}

UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = genSaltSync(10);
    const hashPassword = hashSync(user.password, salt);
    user.password = hashPassword;
  }
  next();
});

module.exports = mongoose.model('user', UserSchema);