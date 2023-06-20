const Blog = require('../models/blogModel')
const mongoose = require('mongoose')

//get all blogs
const getAllBlogs = async (req, res) => {
    //const user_id = req.user._id

    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json(blogs);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//get a single blog
const getSingleBlog = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such blog'})
    }

    const blog = await Blog.findById(id)

    if(!blog) {
        return res.status(404).json({err: 'No such blog'})
    }
    res.status(200).json(blog)
}

//create new blog
const createBlog = async (req, res) => {
    const {title, description} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!description) {
        emptyFields.push('description')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({ err: 'Please fill in all these fields', emptyFields})
    }

    try {
        const user_id = req.user._id
        const blog = await Blog.create({title, description, user_id})
        res.status(200).json(blog)
    } catch(err) {
        res.status(400).json({err: err.message})
    }
}

//delete one blog
const deleteBlog = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such blog'})
    }

    const blog = await Blog.findOneAndDelete({_id: id})

    if(!blog) {
        return res.status(400).json({err: 'No such blog'})
    }
    res.status(200).json(blog)
}

//update a blog
const updateBlog = async(req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such blog'})
    }

    const blog = await Blog.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!blog) {
        return res.status(400).json({err: 'No such blog'})
    }
    res.status(200).json(blog)
}

module.exports = {getAllBlogs, getSingleBlog, createBlog, deleteBlog, updateBlog}
