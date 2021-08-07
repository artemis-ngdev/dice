import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import graphqlApp from '../graphql'
import { useTransaction } from './transaction'
// import {handleClientError, handleServerError} from './middlewares/error'
// import {useTransaction} from './transaction'
// import authMiddleware from './middlewares/auth'
// import authMiddleware from './middlewares/auth'

const app = express()
// #region Register System Middlewares

app.use(compression())
// app.use(helmet())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)
/// #endregion

app.all('/', (req, res) => res.status(200).send({status: 'ok'}))
app.all('/favicon.ico', (req, res) => res.status(200).send())
// app.use(authMiddleware)
// graphql
app.use('*', useTransaction)


app.use(graphqlApp)

// // #region Error Handlers
// app.use(handleClientError)

// app.use(handleServerError)
// // #endregion
export default app
