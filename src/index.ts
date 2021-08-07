import http from 'http'
import app from './server'
import appConfig from './config'
import ormConfig from './orm.config'
 
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
