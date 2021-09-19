const express = require('express')
const app = express()
const router = express.Router()
const {authVerify} = require("../utils/authVerify")
const {User} = require("../models/user.model")
const {Posts} = require("../models/posts.model")

router.route("/new")
.post(authVerify, async (req, res) => {
    try {
      const { userId } = req.user;
      const postData = req.body;
      const currentUser = await User.findById(userId);
      const NewPost = new Posts({
        ...postData,
        author: userId,
        authorName: currentUser.fullName,
      });
      await NewPost.save();
      currentUser.posts.push(NewPost._id);
      await currentUser.save();
      res.json({ message: "Posted successfully", newPost: NewPost });
    } catch (error) {
      console.log(error, "ballo");
      res.json({ message: error.message });
    }
})


router.route("/:userId")
.post(authVerify,async(req, res)=>{
  const {userId} = req.user
  const currentUser = await User.findOne({_id:userId}).populate({
    path:"posts",
    model:"User"
  })
  res.json({message: "posts fetched", allPosts: currentUser.posts})

})

router.route("/like/:postId")
.post(authVerify, async(req, res)=>{
  const {postId} = req.params
  const {userId} = req.user
  const post = await Posts.findById(postId)

  post.likes.push(userId)
  post.save()
  console.log(post)
  res.status(200).json({
    message:"Post Liked",
    postId
  })
})

router.route("/unlike/:postId")
.post(authVerify, async(req, res)=>{
  const {postId} = req.params
  const {userId} = req.user
  const post = await Posts.findById(postId)

  post.likes.pull(userId)
  post.save()
  console.log(post)
  res.status(200).json({
    message:"Post Unliked",
    postId
  })
})

router.route("/comment/:postId")
.post(authVerify, async(req, res)=>{
  const postId = req.params;
  const {userId} = req.user;
  const comment = req.body;

  const currentUser = await User.findById(userId)
  const currentPost = await Posts.findById(postId)

  currentPost.comments.push({
    user: userId,
    name: currentUser.fullName,
    comment: comment
  })

  await currentPPost.save()

  res.json({
    message: "comment posted",
    commentData: currentPost.comments,
    postId,
  });
})

module.exports = router