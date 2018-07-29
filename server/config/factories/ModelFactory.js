import FactoryInterface from "../interfaces/FactoryInterface";
import User from "../../models/user";

export default class ModelFactory extends FactoryInterface {

    constructor(model) {
        super();
        return ModelFactory.create(model);
    }

    static create(model) {

        switch (model) {
            case 'user':
                return new User;
                break;
            default:
                return null;
                break;
        }

    }
}