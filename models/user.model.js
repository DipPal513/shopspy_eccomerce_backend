import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: Number
    },

    password: {
        type: String,
        require: true,
        min: 2,
    },
    adress: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export { User }