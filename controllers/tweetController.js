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

  updateLike: async (req, res) => {
    console.log(req.params.tweetid, req.user.id);
    let tweet = await db.Tweet.findOne({
      $and: [
        { _id: req.params.tweetid },
        {
          likes: {
            $in: [req.user.id],
          },
        },
      ],
    });
    console.log(tweet);
    if (tweet !== null) {
      tweet
        ? tweet.likes.filter((el) => el !== req.user.id)
        : tweet.likes.push(req.user.id);
      tweet.save();
      res.status.json({ message: "200OK" });
    } else {
      res.status(403).json({ message: "404, el recurso no existe" });
    }
  },
};
module.exports = tweetController;
