const mongoose = require('mongoose');
const {Schema}  = mongoose;

const ActivitySchema = new Schema({
    sequenceNumber: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    theoreticalExplanation: { type: String },
    imageUrl: { type: String },
    instructions: { type: String }
});


const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;

