const db = require("./models/mongoose");
const faker = require("faker");
const { User } = require("./models/mongoose");
const { lorem } = require("faker");

const seeder = {
  createData: async () => {
    for (let i = 0; i < 8; i++) {
      let username = faker.internet.userName();

      let user = new db.User({
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: username,
        email: faker.internet.email(),
        description: faker.lorem.words(40),
        avatar: faker.image.avatar(),
        password: "root",
      });

      for (let r = 0; r < 10; r++) {
        let tweet = new db.Tweet({
          content: faker.lorem.words(30),
          author: user._id,
          date_created: faker.date.past(),
          likes: [user._id],
        });
        await tweet.save();
        user.list_tweets.push(tweet);
      }
      await user.save();
    }
    let users = await db.User.find({});
    let tweets = await db.Tweet.find({});

    for (let k = 0; k < tweets.length; k++) {
      for (let i = 0; i < users.length; i++) {
        // console.log(typeof users[i]._id + " Id user- " + users[i]._id);
        // console.log(typeof tweets[k].author + " Id autor- " + tweets[k].author);
        if (String(users[i]._id) === String(tweets[k].author)) {
          db.User.findOneAndUpdate(
            { _id: tweets[k].author },
            { $push: { list_tweets: tweets[k]._id } },
            (error, success) => {
              if (error) {
                console.log(error);
              } else {
                // console.log(success);
              }
            }
          );
        }
      }
    }

    //MYSTERY HAT
    let user_names = [];
    for (let i = 0; i < users.length; i++) {
      user_names.push(users[i]._id);
    }
    for (let k = 0; k < users.length; k++) {
      let value = Math.floor(Math.random() * (user_names.length - 1 - 1 + 1) + 1);
      for (let r = 0; r < value; r++) {
        if (user_names[r] !== users[k]._id) {
          db.User.findOneAndUpdate(
            { _id: users[k]._id },
            { $push: { list_users_followers: user_names[r] } },
            (error, success) => {
              if (error) {
                console.log(error);
              } else {
                // console.log(success);
              }
            }
          );
          db.User.findOneAndUpdate(
            { _id: user_names[r] },
            { $push: { list_users_following: users[k]._id } },
            (error, success) => {
              if (error) {
                console.log(error);
              } else {
                console.log(success);
              }
            }
          );
        }
      }
    }
  },
};
module.exports = seeder;
