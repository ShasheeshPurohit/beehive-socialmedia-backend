const express = require("express");
const router = express.Router();
const { secret, authVerify } = require("../utils/authVerify");
const {Posts} = require("../models/posts.model")
const {User} = require("../models/user.model")


router.route('/')
.get(authVerify, async(req,res) => {
    const {userId} = req.user
    const currentUser = await User.findById(userId).populate({
      path:'posts',
      model:'Posts'
    })
    
    let newAllPosts = []

    const userPosts = currentUser.posts.map((post)=>newAllPosts.push(post))

     sortedArray = newAllPosts.sort((a,b) => a.createdAt - b.createdAt)

    res.json({message:"isme data aana chahiye",feedData:sortedArray})
})


module.exports = router