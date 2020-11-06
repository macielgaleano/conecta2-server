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
    const tweet = await db.Tweet.deleteOne({ tweet: req.params.tweetId });

    res.status(200).json({ status: 200, message: "tweet eliminado correctamente" });
  },

  updateLike: async (req, res) => {
    let tweet = await db.Tweet.findOne({
      _id: req.params.tweetid,
    });
    if (tweet !== null) {
      const validation = tweet.likes.filter((el) => el !== req.user.id);
      const forDelete = tweet.likes.filter((el) => el === req.user.id);
      console.log(validation.length, validation);
      validation.length > 0 ? (tweet.likes = forDelete) : tweet.likes.push(req.user.id);
      tweet.save();
      res.status(200).json({ status: 200, message: "200OK", tweet: tweet });
    } else {
      res.status(403).json({ status: 403, message: "404, el recurso no existe" });
    }
  },
};
module.exports = tweetController;
