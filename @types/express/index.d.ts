import * as express from "express"
import { DataServiceFactory } from "../../src/database/services/Factory"
import {ServiceFactory} from '../../src/services'

declare global {
  namespace Express {
    interface Request {
      trxContext?: any
      dsFactory?: DataServiceFactory
     }
  }
}