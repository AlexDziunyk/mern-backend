const express = require('express')
const router = express.Router()
const {getAllBlogs, getSingleBlog, createBlog, deleteBlog, updateBlog} = require('../controllers/blogController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

router.get('/', getAllBlogs)

router.get('/:id', getSingleBlog)

router.post('/create', createBlog)

router.patch('/:id', updateBlog)

router.delete('/:id', deleteBlog)



module.exports = router
