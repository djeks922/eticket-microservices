import express from 'express'
import cookieSession from 'cookie-session'
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './exceptions/notFoundError';

const app = express();
app.set('trust proxy', true)
// app.enable('trust proxy')
app.use(express.json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
}))

app.use(currentUserRouter)
app.use(signUpRouter)
app.use(signInRouter)
app.use(signOutRouter)

app.all('*', async (req,res,next) => {
    next(new NotFoundError())
})

app.use(errorHandler)


export default app