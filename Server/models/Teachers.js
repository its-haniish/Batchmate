const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    }
});


const Teachers = new mongoose.model('Teacher', teacherSchema);

module.exports = Teachers;
