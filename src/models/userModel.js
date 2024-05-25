import mongoose from "mongoose";
import { type } from "os";

const userSchema =new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },

    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Please provide a password"],
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,


})

// mongoose.models.users checks if the model is already there or not if it is there then no need to connect again and if its not there so mongoose.model("users", userSchema) will execute
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User