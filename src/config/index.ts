import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import {ConfigSchema} from './schema'
import { Sequelize } from 'sequelize-typescript'
import Bet, { initBet } from '../database/models/Bet'
import User, { initUser } from '../database/models/User'
 
 
 
export class AppConfig {
  private readonly _env: Record<string, string>
  constructor(envFilePath?: string) {
    const envExists = envFilePath && fs.existsSync(envFilePath)
    envExists && dotenv.config({path: envFilePath})
    const {value, error} = ConfigSchema.validate(process.env, {allowUnknown: true, stripUnknown: true})
    if (error) {
      throw new Error(`Missing Required Environment Variables | ${error.message}`)
    }
    this._env = value
  }

  public get port(): number {
    return +this._env.PORT
  }


  public get environment(): string {
    return this._env.NODE_ENV
  }

  public get ormPostgresOptions(): Sequelize {
    const sequelize = new Sequelize(
      {
        database: this._env.DATABASE_NAME,
        dialect: 'postgres',
        username:   this._env.DATABASE_USERNAME,
        password: this._env.DATABASE_PASSWORD,
        port: 5432,
        repositoryMode: true,
        logging: false,
        models: [User, Bet],
        define: {
          freezeTableName: false,
          timestamps: false,
        },
      });
       initBet(sequelize)
       initUser(sequelize)

      sequelize.addModels([User, Bet])

      sequelize.authenticate()
    return sequelize
  } 
 
}

let ENV = process.env.NODE_ENV
if (!ENV || ENV.indexOf('dev') > -1) {
  ENV = 'local'
}
const ENV_FILE_PATH = `.env.${ENV}`

export default new AppConfig(ENV_FILE_PATH)
