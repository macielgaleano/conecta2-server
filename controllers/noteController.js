const db = require("../models/mongoose");
const createNoteSubController = require("./subControllers/createNoteSubController");
const deleteNoteSubController = require("./subControllers/deleteNoteSubController");

const noteController = {
  createNote: (req, res) => createNoteSubController(req, res),
  delete: (req, res) => deleteNoteSubController(req, res),
};
module.exports = noteController;
