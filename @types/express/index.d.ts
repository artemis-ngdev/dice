import * as express from "express"
// import { QueryRunner } from "typeorm"
import { User } from "../../src/database/entities"
import { DataServiceFactory } from "../../src/database/services/Factory"
import { IAuthToken } from "../../src/typings"
import {ServiceFactory} from '../../src/services'

declare global {
  namespace Express {
    interface Request {
      uid?: string
      trxContext?: any
      user?: User
      // authToken?: IAuthToken
      dsFactory?: DataServiceFactory
      // externalFactory?: ServiceFactory
    }
  }
}