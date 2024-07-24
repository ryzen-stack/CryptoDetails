const { Schema,model} = require('mongoose');

let userSchema = new Schema({
    Firstname: {
        type: String,
        required: { value: true, message: "Firstname is mandatory" },
        minlength: 3

    },
    Lastname: {
        type: String,
        default:''
    },
    age: {
        type: Number,
        required: { value: true, message: "age is mandatory" },
        validate: {
            validator: function (v) {
                return v > 18;
            },
            message: props => `${props.value} is not a valid age! Age must be above 18.`
        }
    },
    mobile: {
        type: Number,
        required: { value: true, message: "mobile is mandatory" },
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number! Mobile number must be 10 digits.`
        }
    },
    email:{
        type: String,
        required: { value: true, message: "email is mandatory" },

    },
    gender:{
        type: String,
        required: { value: true, message: "gender is mandatory" },
    },
    password: {
        type: String,
        required: true,
        minlength:[8,"password minimum characters should have 8 "]
    },
    role:{
        type:String,
        required:true
    }

})

module.exports = model('users',userSchema)