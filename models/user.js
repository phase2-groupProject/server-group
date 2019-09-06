const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, `Email can not be empty`],
        validate: [{
            validator: function emailFormat(email) {
                let checkFormat = /\S+@\S+\.\S+/;
                return checkFormat.test(email);
            },
            message: props => `props is a invalid email format`
        }, {
            validator: function emailUnique(email) {
                return User.findOne({ email: this.email })
                    .then(function (user) {
                        if (user) {
                            return false;
                        } else {
                            return true;
                        }
                    })
                    .catch(function (err) {
                        return false;
                    })
            },
            message: props => `Email ${props.value} already registered by another user`
        }]
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
        versionKey: false
})

const users = mongoose.model('users', userSchema)

module.exports = users