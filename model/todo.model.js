const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    }
});

const todoModel = mongoose.model('todo', todoSchema);
//sfafds

module.exports = todoModel;