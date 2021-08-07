import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import {ConfigSchema} from './schema'
import { Sequelize } from 'sequelize-typescript'
import Bet, { initBet } from '../models/Bet'
import User, { initUser } from '../models/User'
 import { DataTypes } from 'sequelize/types';

const CURRENT_FOLDER = path.basename(path.join(__dirname, '..'))

const BASE_PATH = `${CURRENT_FOLDER}`

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

  public get server() {
    return {
      allowAuthSpoofing: Boolean(this._env.ALLOW_AUTH_SPOOFING),
      cookieDomain: this._env.COOKIE_DOMAIN,
      traceGraphql: Boolean(this._env.TRACE_GRAPHQL),
      showOriginalError: Boolean(this._env.SHOW_ORIGINAL_ERROR),
    }
  }

  public get environment(): string {
    return this._env.NODE_ENV
  }

  public get isTestMode(): boolean {
    return !['production', 'staging'].includes(this.environment)
  }

  public get logLevel(): string {
    return this._env.LOGGER_LEVEL
  }
 
  public get ormPostgresOptions(): Sequelize {
    const sequelize = new Sequelize(
      // this._env.DATABASE_URL,
      {
        database: 'dice',
        dialect: 'postgres',
        username: 'postgres',
        password: '',
        port: 5432,
        repositoryMode: true,
        logging: false,
        models: [User, Bet],
        // modelPaths:  [`${BASE_PATH}/models/*`],
        // sync: { force: true },
        // models: [__dirname + '/models'] // or [Player, Team],
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
