const express = require('express')
const router = express.Router()
const {User} = require('../models/user.model')
const {authVerify} = require('../utils/authVerify')

router.route("/clear")
.delete(authVerify, async(req, res)=>{
  console.log("notifications cleared!")
  const token = req.token
  const {userId} = req.user
  const currentUser = await User.findById(userId)
  currentUser.notifications = []
  await currentUser.save()
  res.json({message: "Notifications cleared", user:currentUser, token:token})
})

module.exports = router