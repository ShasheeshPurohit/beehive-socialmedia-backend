const express = require("express");
const router = express.Router();
const { secret, authVerify } = require("../utils/authVerify");
const {Posts} = require("../models/posts.model")
const {User} = require("../models/user.model")


router.route('/')
.get(authVerify, async(req,res) => {
    const {userId} = req.user
    const currentUser = await User.findById(userId).populate({
        path:'following',
        model:'User'
    }).populate({
        path:'following',
        populate:{
          path: 'posts',
          model: 'Posts'
        }
    }).populate({
      path:'posts',
      model:'Posts'
    })
    

   

    
    let newAllPosts = []

    const userPosts = currentUser.posts.map((post)=>newAllPosts.push(post))

    const allPosts = currentUser.following.map(item => {
        return item.posts.map(item2 => {
             return newAllPosts.push(item2)
         })
    })

     sortedArray = newAllPosts.sort((a,b) => b.createdAt - a.createdAt)

    res.json({message:"isme data aana chahiye",feedData:sortedArray})
})



module.exports = router