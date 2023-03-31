const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref:'user'}, //like foreign key 
    title: { type: String, required: true },
    tag: { type: String, default: "General" },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('notes', NotesSchema)