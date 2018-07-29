import ModelFactory from '../factories/ModelFactory';

const moogoose = require('mongoose');

export default class MongoDB {

    constructor() {
        this.host = ''
        this.user = ''
        this.password = ''

        //Connect to db
        let url = `mongodb+srv://${this.user}:${this.password}@${this.host}`;
        moogoose.connect(url, err => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('Connected to MongoDB');
            }
        });
    }

    insert(to, data) {
        //Get model instance 
        let model = new ModelFactory(to);

        if (!model) {
            throw new Error(`Error occured, model not exist`)
        }

        let schema = model.getSchema();

        try {
            schema.save((err, _res) => {
                if (err) {
                    throw new Error(`Error occured, can not insert data to ${model.getName()}`)
                }

                return _res;
            })
        } catch (error) {
            console.error(error)
        }
    }
}
