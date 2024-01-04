import mongoose from 'mongoose';
import { User } from '../models/user.model.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js';

const loginController = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        return res.send({
            success: false,
            message: "user does not exist please register"
        });
    }
    const isValidPass = comparePassword(password, user.password);
    if (!isValidPass) {
        return res.status(500).send({ success: false, message: "Password does not match.." });
    }
    res.status(200).send({
        success:true,
        message:"Login success!",
        user
    })
}
const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, adress } = req.body;
        if (!username) {
            return res.send({ error: "Name is required!" })
        }
        if (!password) {
            return res.send({ error: "password is required!" })
        }
        if (!email) {
            return res.send({ error: "email is required!" })
        }
        if (!adress) {
            return res.send({ error: "adress is required!" })
        }
        if (!phone) {
            return res.send({ error: "phone is required!" })
        }

        // 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "user already exist please login"
            })
        }
        // hasing password
        const hashedPassword = await hashPassword(password);
        // saving user into database
        const user = await new User({ username, email, password: hashedPassword, adress, phone }).save();
        // sending user to frontend
        res.status(200).send({ success: true, message: "registration success!", user })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in registration",
            error
        })

    }
}


export { loginController, registerController };