import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import morgan from 'morgan'
import hpp from 'hpp'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import config from './config'
import { errorHandler, logHandler } from './modules/handler'
import todoRouter from './routes/todoRouter'
import userRouter from './routes/userRouter'
import todoUserRouter from './routes/todoUserRouter'

const app = express()
const { PORT } = config

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'))
  app.use(hpp())
  app.use(helmet({ contentSecurityPolicy: false }))
  app.use(
    cors({
      origin: ['http://localhost', 'http://localhost:3000', 'http://localhost:9052'],
      credentials: true,
    }),
  )
} else {
  app.use(morgan('dev'))
  app.use(
    cors({
      origin: true,
      credentials: true,
    }),
  )
}

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.header('Pragma', 'no-cache')
  next()
})

app.set('etag', false)
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/todo', todoRouter)
app.use('/api/v2/todo', todoUserRouter)
app.use('/api/user', userRouter)
app.use(logHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})

export default app
