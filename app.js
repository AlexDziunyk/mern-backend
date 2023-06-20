require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const blogRoutes = require('./routes/blogs')
const userRoutes = require('./routes/users')

//express app
const app = express()

app.use(cors())

//middleware
app.use(express.json())


app.get('/', (req, res) => {
    res.redirect('/api/blogs')
})

//routes
app.use('/api/blogs', blogRoutes)
app.use('/api/user', userRoutes)

//connect to mongodb
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log('starting the server')
        })
    })
    .catch(err => console.log(err))





