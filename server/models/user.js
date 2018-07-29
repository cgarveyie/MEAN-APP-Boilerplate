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


// export default class User {

//     constructor(user) {
//         this.name = 'User';
//         this.email = user ? user.email : null;
//         this.password = user ? user.password : null;
//     }

//     getSchema() {
//         if (!this.schema) {
//             let userSchema = new Schema({
//                 email: {
//                     type: String,
//                     required: true
//                 },
//                 password: {
//                     type: String,
//                     required: true
//                 }
//             });

//             if (mongoose.models && mongoose.models.User) {
//                 this.schema = mongoose.models.User;
//             } else {
//                 this.schema = mongoose.model('User', userSchema)
//             }

//         }

//         return this.schema;
//     }

//     setEmail(email) {
//         this.email = email;
//         return this;
//     }

//     setEmail(password) {
//         this.password = password;
//         return this;
//     }

//     getEmail() {
//         return this.email;
//     }

//     getPassword() {
//         return this.password;
//     }

//     getName() {
//         return this.name;
//     }
// }