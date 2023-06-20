const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema
const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function(login, password) {

    //validation
    if(!login || !password) {
        throw Error('All fields must be filled')
    }
    if(login.length < 4) {
        throw Error('Login is too short')
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Password has to contain at least: one upper letter, one lower letter , special symbol and length more than eight symbols')
    }

    const exists = await this.findOne({login})
    if(exists) {
        throw Error('Login already in use')
    }
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const user = await this.create({login, password: hash})

    return user
}

//static login method
userSchema.statics.login = async function(login, password) {
    if(!login || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({login})
    if(!user) {
        throw Error('Incorrect login or password')
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match) {
        throw Error('Incorrenct login or password')
    }
    return user
}


module.exports = mongoose.model('User', userSchema)

