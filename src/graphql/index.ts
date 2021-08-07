import {ContextFunction} from 'apollo-server-core'
import {ApolloServer} from 'apollo-server-express'
 import express from 'express'
 import {ExpressContext} from 'apollo-server-express/dist/ApolloServer'

// import {EntityManager, getConnection} from 'typeorm'
import {buildSchemaSync} from 'type-graphql'
import {DataServiceFactory} from '../database/services/Factory'
import config from '../config'
// import {User} from '../database/entities'
// import {ServiceFactory} from '../services'
import {resolvers} from './resolvers'
import { Sequelize } from 'sequelize-typescript'
// import errorTrackingPlugin from './extensions/errorTracker.plugin'

export interface IGraphqlContext {
//   user?: User
  req: Express.Request
  entityManager?: Sequelize
  dsFactory?: DataServiceFactory
//   externalFactory?: ServiceFactory
}

 

const graphqlApp = express()

export const getGraphqlServer = (context: ContextFunction<ExpressContext, IGraphqlContext> | IGraphqlContext): ApolloServer => {
  const schema = buildSchemaSync({resolvers, emitSchemaFile: {path: `${__dirname}/generated/schema.gql`}})
  return new ApolloServer({
    schema,
    context,  
  })
}


const graphqlContext: ContextFunction<ExpressContext, IGraphqlContext> = ({req, connection}): IGraphqlContext => {
   if (connection) return connection.context

  const {user, trxContext: trx, dsFactory} = req
 
  return {req, entityManager: trx?.manager, dsFactory}
}

export const graphqlServer = getGraphqlServer(graphqlContext)

graphqlServer.applyMiddleware({
  app: graphqlApp as any,
  path: '/graphql',
  cors: {
    origin: '*',
    credentials: true,
  },
})

export default graphqlApp
