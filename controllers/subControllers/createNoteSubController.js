const db = require("../../models/mongoose");
const jwt = require("jsonwebtoken");
const validateLoginSubController = require("./validateLoginSubController");

const createNoteSubController = async (req, res) => {
  /*  if (
    (await validateLoginSubController(
      req,
      res,
      req.headers["Authorization"]
    )) === true
  ) { */
  /* const decoded = jwt.verify(
      req.headers["Authorization"],
      process.env.SECRET
    ); */

  const user = await db.User.find(
    {
      tokens: {
        $in: [decoded],
      },
    },
    { password: 0 }
  );

  const note = new db.Note({
    content: req.body.content,
    author: user._id,
    date_created: Date.now(),
  });
  await note.save();
  /* const note_saved = db.Note.findOne({ content: req.body.content_text }); */
  user.list_tweets.push(note);
  await user.save();
  res.json(note);

  res.status(401).json({ auth: false, messague: "Not auth" });
};
module.exports = createNoteSubController;
