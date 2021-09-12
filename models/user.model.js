const mongoose = require('mongoose')

const {Schema} = mongoose

const UserSchema = Schema({
  fullName: {
    type:String,
    required: "Cannot create user without name"
  },
  userName: {
    type: String,
    required: "Cannot create user without username"
  },

  email:{
    type: String,
    required: "Cannot create user without email",
    unique: "Account already exists with this email"
  },
  password:{
    type:String,
    required:"Cannot create user without password"
  },
  posts:[{type: Schema.Types.ObjectId, ref:"Post"}],
  followers:[{type: Schema.Types.ObjectId, ref:"User"}],
  following:[{type: Schema.Types.ObjectId, ref:"User"}],
  notifications:[],
  bio: String,
  gender: String,
  dob: Date
})

const User = mongoose.model("User", UserSchema)

module.exports = {User}