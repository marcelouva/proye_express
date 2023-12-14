const mongoose = require('mongoose');
const {Schema}  = mongoose;

const ActivitySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    fileUrl: { type: String }
});


const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;

