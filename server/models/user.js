// --------------------------------------------------
//  User Model
// --------------------------------------------------
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set Fields
var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//Make Available For Node
module.exports = (mongoose.models && mongoose.models.User) ? mongoose.models.User : mongoose.model('User', userSchema, 'users');