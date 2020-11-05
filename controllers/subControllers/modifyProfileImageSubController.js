const formidable = require("formidable");
const validateLoginSubController = require("./validateLoginSubController");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

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

var bucketResource = "arn:aws:s3:::" + process.env.AWS_BUCKET_NAME + "/*";
readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;
var bucketPolicyParams = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Policy: JSON.stringify(readOnlyAnonUserPolicy),
};

s3.putBucketPolicy(bucketPolicyParams, function (err, data) {
  if (err) {
    // display error message
    console.log("Error");
  } else {
    console.log("Success");
  }
});

const modifyProfileImageSubController = async (req, res) => {
  if (
    (await validateLoginSubController(req, res, req.headers["x-access-token"])) === true
  ) {
    s3.createBucket({ Bucket: process.env.AWS_BUCKET_NAME }, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log("Bucket Created Successfully", data.Location);
    });

    const form = formidable({
      multiples: true,
      uploadDir: "./public/images",
      keepExtensions: true,
    });
    form.parse(req, async (err, fields, files) => {
      const imagen = "./public/images/" + path.basename(files.foto.path);
      const fileContent = fs.readFileSync(imagen);
      const params = {
        ACL: "public-read",
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: path.basename(files.foto.path),
        ContentType: "image/jpeg",
        Body: fileContent,
      };
      s3.upload(params, async function (err, data) {
        console.log(data.Location);
      });

      // await db.User.update({ _id: req.user._id }, { avatar: imagen });
    });

    return res.send(true);
  }
  res.status(401).json({ auth: false, messague: "Not auth" });
};
module.exports = modifyProfileImageSubController;
