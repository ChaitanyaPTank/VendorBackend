const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelName = Schema({
    property: Number
}, {
    timestamps: true
});

module.exports = mongoose.Model('Model', ModelName);