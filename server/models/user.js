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

//Create Model instace
var User = mongoose.model('user', userSchema, 'users');

//Make Available For Node
module.exports = User;