import mongoose from 'mongoose';


export default function connectDB() {

    try {
        // connection
        mongoose.connect("mongodb://localhost:27017").then(() => {
            console.log("connection success!")
        })
    } catch (error) {

        console.log("connection rejected..!!! ", error)
    }
}