const db = require("../models/mongoose");
const { User } = require("../models/mongoose");
const formidable = require("formidable");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
var jwt = require("jsonwebtoken");
const { send } = require("process");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
});

var readOnlyAnonUserPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "AddPerm",
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [""],
    },
  ],
};

const userController = {
  //Static
  store: async (req, res) => {
    const user = await new db.User({
      name: req.body.name,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: "/images/anonimo.png",
      description: "Suba una nueva descripcion en configuracion",
    });
    user.save();
    res.json(user);
  },

  show: async (req, res) => {
    const user = await db.User.findOne(
      { username: req.params.username },
      { token: 0, password: 0 }
    );
    if (user !== null) {
      return res.json(
        await db.Tweet.find({ author: user._id }).sort({
          date_created: "desc",
        })
      );
    } else {
      res.status(403).json({ message: "404, el recurso no existe" });
    }
  },

  //Users
  updateImg: async (req, res) => {
    let bucketResource = "arn:aws:s3:::" + process.env.AWS_BUCKET_NAME + "/*";
    readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;
    let bucketPolicyParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Policy: JSON.stringify(readOnlyAnonUserPolicy),
    };
    s3.putBucketPolicy(bucketPolicyParams, function (err, data) {
      if (err) {
        res.status(500).json({ message: "Internal server error" + err });
      } else {
        console.log("Success");
      }
    });
    s3.createBucket({ Bucket: process.env.AWS_BUCKET_NAME }, function (err, data) {
      if (err) res.status(500).json({ message: "Internal server error" + err });
      else console.log("Bucket Created Successfully", data.Location);
    });

    const form = formidable({
      multiples: true,
      uploadDir: "./public/images",
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      if (files) {
        console.log(files);
        const imagen = "./public/images/" + path.basename(files.imagen.path);
        const fileContent = fs.readFileSync(imagen);
        const params = {
          ACL: "public-read",
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: path.basename(files.imagen.path),
          ContentType: "image/jpeg",
          Body: fileContent,
        };
        s3.upload(params, async function (err, data) {
          const user = await db.User.find({ _id: req.user.id });
          user.avatar = data.Location;
          user.sava();
          return res.json({ status: 200, data: data.location });
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    });
  },

  updateData: async (req, res) => {
    await db.User.findOneAndUpdate(
      { _id: req.user._id },
      {
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        description: req.body.description,
        email: req.body.email,
        password: User.hashPassword(req.body.password),
      }
    ).exec((user, err) => {
      if (user) {
        res.status(200).json({ message: "200,OK usuario modificado" });
      } else {
        res.status(403).json({ message: "404, el recurso no existe" });
      }
      if (err) {
        res.status(500).json({ message: "Internal server error" + err });
      }
    });
  },
  allSuggestion: async (req, res) => {
    let users = await db.User.find({
      _id: {
        $nor: req.user.id,
      },
    }).select("_id");
    let users_id = [];
    users.forEach((user) => {
      users_id.push(user._id);
    });
    let foollowing = await db.User.find({
      $and: [
        {
          list_users_following: {
            $nin: users_id,
          },
        },
      ],
    })
      .limit(6)
      .select("_id username name lastname avatar")
      .exec((err, items) => {
        return res.json(items);
      });
  },
  all: (req, res) => {
    null;
  },
  updateFollow: (req, res) => {
    null;
  },
  updateUnfollow: (req, res) => {
    null;
  },
};
module.exports = userController;
