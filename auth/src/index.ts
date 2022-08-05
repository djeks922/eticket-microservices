import {Express} from 'express'
import mongoose from 'mongoose';
import app from './app'

const start = async (app: Express) => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined')
    }


    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('Connected to Database')
    } catch (error) {
        console.error(error)
    }
    app.listen(3000, async ()=> {
        console.log('Listening on port 3000!!!!!!')
    })
}
start(app)
