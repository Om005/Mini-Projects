import mongoose from 'mongoose'

let DataSchema = new mongoose.Schema({
    site: String,
    username: String,
    password: String,
    e_mail: String
}, { collection: "PasswordData"})

export const Data = mongoose.model('Passwords', DataSchema)