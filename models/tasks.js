const mongoose = require ('mongoose');

const taskSchema = new mongoose.Schema({
  text: String
});

module.exports = mongoose.model ('Task', taskSchema);