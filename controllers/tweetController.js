const db = require("../models/mongoose");

const tweetController = {
  store: async (req, res) => {
    const tweet = new db.Tweet({
      content: req.body.content,
      author: req.user.id,
      date_created: Date.now(),
    });
    await tweet.save();

    const user = await db.User.findOne({ _id: req.user.id });
    console.log(tweet);
    await user.list_tweets.push(await tweet._id);

    await user.save();
    res.json(tweet);
  },

  delete: async (req, res) => {
    const tweet = await db.Tweet.findOneAndUpdate(
      { tweet: req.params.tweetId }
      /*  {tweet: } */
    );
    await tweet.save();
    /* if (user) {
        res.status(200).json({ message: "200 OK, token eliminado" });
      } else {
        res.status(404).json({ message: "404, datos invalidos" });
      } */
    res.json(tweet);
  },

  updateLike: (req, res) => {
    null;
  },
};
module.exports = tweetController;
