const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {User} = require('../models/user.model')
const {Posts} = require('../models/posts.model');
const { authVerify } = require("../utils/authVerify");

const saltRounds = 10;
const secret =
  "gEf3gs2kMagd2CHDXpEjwGJlbVewlqE7ARhD2UIYUJsM8V9c71E4rYGI0AXIn5J2pAi2TrMQHD7FAJOTtLIYIShHDjZjTwvzHodjwutvbTcFCnksFiCBFpqpQqucxyairN4X3hQbmiuKqJQW9XSeblgU5v2BQrEZs86YhgrGxQtWujl3NMu9NRwa9x9noEY7OnuabuIAYNCmsnGC39iq32nBOPvtA4BP+sVuMKW6Qd6//lSr1pSzYHZ9KMYUDnTDvnXQ3q5uSpCGcRTS3//G/nfUdjxjcbz1z9B2hvL+Oh/RXNI1DeFdwphwP9pbJqICm81l1WUe0H7Vs/6irJEq6w==";

  // All user fetch route
  router.route('/')
  .get(authVerify, async(req,res)=>{
    console.log("All users route")
    const allUsers = await User.find({})
    res.json({message:"all user found success", allUsers:allUsers})
  })

router
  .route("/signup")
  // Signup
  .post(async (req, res) => {
    try {
      const user = req.body;
      console.log(user)
      bcrypt.hash(user.password, saltRounds, async function (err, hash) {
        const NewUser = new User({ ...user, password: hash });
        await NewUser.save();
        return res.json({
          status: "Signup successful",
          user: NewUser
        });
      });
    } catch (error) {
      res
        .status(404)
        .json({ status: "failed to signup", message: error.message });
    }
  });

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });

    console.log(userName, password, req.body);

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userId: user._id }, secret, {
            expiresIn: "24h",
          });
           res.json({
            status: "login success",
            user: user,
            token: token,
          });
        } else {
          res.status(404).json({ status: "Your password is wrong", errorMessage: err });
        }
      
    });
  } catch (error) {
    res.json({ status: "User not found", errorMessage: error.message });
  }
});

router.route('/edit')
.post(authVerify, async(req, res) => {
  const token = req.token
  const newDetails = req.body
  const {userId} = req.user
  const userFind = {_id: userId}
  const currentUser = await User.findOneAndUpdate(userFind, newDetails, {new: true})
  console.log(newDetails)
  res.json({user: currentUser, token:token})

})

router.route('/otherUser/:userId')
.get(authVerify, async(req,res) => {
  const {userId} = req.params
  const otherUser = await User.findById(userId);
  res.json({otherUserdata:otherUser})

})


module.exports = router;
