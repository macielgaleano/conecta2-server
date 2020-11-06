const db = require("../models/mongoose");

const tweetController = {
  store: (req, res) => {
    null;
  },
  delete: (req, res) => {
    null;
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
      res.status.json({ message: "200OK" });
    } else {
      res.status(403).json({ message: "404, el recurso no existe" });
    }
  },
};
module.exports = tweetController;
