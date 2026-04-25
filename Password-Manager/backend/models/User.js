import mongoose from 'mongoose'

let UserSchema = new mongoose.Schema({
    email: String,
    password: String,
}, { collection: "UserData"})

export const User = mongoose.model('Users', UserSchema)