const mongoose = require ('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  manager: String,
  description: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task'
    }
  ]
});

module.exports = mongoose.model ('Project', projectSchema);