const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    text: String,
    date: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
});

// Export model
module.exports = mongoose.model("Note", NoteSchema);