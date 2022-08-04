import express from 'express'
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './exceptions/notFoundError';
import mongoose from 'mongoose';

const app = express();

app.use(express.json())

app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)

app.all('*', async (req,res,next) => {
    next(new NotFoundError())
})

app.use(errorHandler)


const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
        console.log('connected')
    } catch (error) {
        console.error(error)
    }
    app.listen(3000, async ()=> {
        console.log('Listening on port 3000!!!!!!')
    })
}
start()
