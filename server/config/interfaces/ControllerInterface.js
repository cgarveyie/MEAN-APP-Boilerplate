import MongoDB from "../database/MongoDB";

export default class ControllerInterface {
    constructor() {
        this.db = new MongoDB();
    };
}