const User = require("../models/userModel")
const bcrypt = require('bcrypt')

const signup = async(req,res)=>{
    try{
        const {username, password} = req.body
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username,
            password: hashedPassword
        })
        res.status(201).json({
            status: "success",
            data: newUser
        })
    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

const login = async(req,res)=>{
    try{
        const {username, password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        }
        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid){
            return res.status(400).json({
                status: "fail",
                message: "Invalid credentials"
            })
        }
        req.session.user = user
        return res.status(200).json({
            status: "success",
            message: "Logged in",
            data: user
        })
    }
    catch(err){
        return res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

module.exports = {
    signup,
    login
}