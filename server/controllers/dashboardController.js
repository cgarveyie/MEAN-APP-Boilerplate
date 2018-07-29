// --------------------------------------------------
//  Dashboard Controller
// --------------------------------------------------

import ControllerInterface from "../config/interfaces/ControllerInterface";
import User from "../models/User";


export default class DashboardController extends ControllerInterface {

    constructor() {
        super();
    }


    //Get Users
    getUsers(req, res) {
        User.find({}, (err, users) => {
            if (err) {
                console.log(err);
            }
            res.status(200).json(users);
        });
    }
}