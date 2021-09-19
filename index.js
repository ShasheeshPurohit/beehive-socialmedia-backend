const express = require('express');
const {initializeDBConnection} = require("./db/db.connect")
const cors = require('cors')
const app = express();


const feed = require('./routes/feed.route');
const friends = require('./routes/friends.route');
const notification = require('./routes/notification.route');
const post = require('./routes/post.route');
const user = require('./routes/user.route');
const timeline = require('./routes/timeline.route')


app.use(express.json())
app.use(cors())

app.use("/feed", feed)
app.use("/friends", friends)
app.use("/notifications", notification)
app.use("/post", post)
app.use("/user", user)
app.use("/timeline", timeline)


initializeDBConnection()

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(process.env.PORT || 5000, () => {
  console.log('server started');
});