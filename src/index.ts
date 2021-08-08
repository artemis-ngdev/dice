import http from 'http'
import appConfig from './config'
import ormConfig from './orm.config'
import express from 'express'
import { useTransaction } from './server/transaction'
import graphqlApp from './graphql'
 
export const initDatabaseConnection = async () => {
  try {
    return ormConfig
  } catch (e) {
    if (e) {
    throw e
    }
  }
}

let _server: http.Server
const app = express()

app.use('*', useTransaction)
app.use(graphqlApp)

const startServer = async () =>
  initDatabaseConnection().then(async (ormConfig) => {
    await ormConfig.sync();
    const {port} = appConfig
    _server = http.createServer(app)
    _server.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`, {address: _server.address()})
    })
  })

startServer().catch((e) => {
  console.error("Error During Server Startup", e);
})
