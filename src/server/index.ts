import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import graphqlApp from '../graphql'
import { useTransaction } from './transaction'

const app = express()

app.use(compression())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
)
app.all('/', (req, res) => res.status(200).send({status: 'ok'}))
app.use('*', useTransaction)
app.use(graphqlApp)
 
export default app
