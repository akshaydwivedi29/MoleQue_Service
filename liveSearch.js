const mongoose = require('mongoose');

const TestListSchema = new mongoose.Schema({
    testname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('TestList', TestListSchema);