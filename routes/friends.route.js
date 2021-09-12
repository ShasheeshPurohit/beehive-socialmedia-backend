const express = require('express')
const router = express.Router()
const {User} = require('../models/user.model')
const {authVerify} = require('../utils/authVerify')

router.route("/")
.get(authVerify, async(req, res)=>{
  const {userId} = req.user;
  const followers = await User.findById(userId).populate({
    path: 'followers',
    model: 'User'
  })
  const following = await User.findById(userId).populate({
    path: 'following',
    model: 'User'
  })
  

  res.json({message: "success", followers: followers.followers, following: following.following})
})

router.route("/follow/:friendUserId")
.post(authVerify, async(req, res)=>{
  const {userId} = req.user
  const {friendUserId} = req.params
  const friendUser = await User.findById(friendUserId)
  console.log(friendUser)

  const currentUser = await User.findById(userId)
  await currentUser.save()

 
  currentUser.following.push(friendUserId)
  await currentUser.save()

  friendUser.followers.push(userId)
  await friendUser.save()

  const following = await User.findById(userId).populate({
    path:"following",
    model:"User"
  })

  const followers = await User.findById(userId).populate({
    path:"followers",
    model:"User"
  })
  
  res.json({message:"Followed user", followers: followers.followers, following: following.following})
})

router.route("/unfollow/:friendUserId")
.post(authVerify, async(req, res)=>{
  const {userId} = req.user
  const {friendUserId} = req.params;
  const currentUser = await User.findById(userId)
  
  currentUser.following.pull(friendUserId)
  await currentUser.save()

  const friendUser = await User.findById(friendUserId)

  friendUser.followers.pull(userId)
  await friendUser.save()

  const followers = await User.findById(userId).populate({
    path: 'followers',
    model: 'User'
  })

  const following = await User.findById(userId).populate({
    path:'following',
    model: 'User'
  })

  res.json({message: "unFollowed user", followers: followers.follwers, following: following.following})
})

module.exports = router
