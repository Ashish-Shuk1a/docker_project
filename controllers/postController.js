const Post = require("../models/postModel")

const getAllPosts = async (req,res)=>{
    try{
        const posts = await Post.find()
        res.status(200).json({
            status: "success",
            data: posts
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

const getPost = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: post
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

const createPost = async (req,res)=>{
    try{
        const post = await Post.create(req.body)
        res.status(201).json({
            status: "success",
            data: post
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

const updatePost = async (req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: "success",
            data: post
        })
    }
    catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

const deletePost = async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success"
        })
    }catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}