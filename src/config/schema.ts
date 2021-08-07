import Joi from 'joi'

export const ConfigSchema = Joi.object({
  PORT: Joi.number().optional().default(4000),
  NODE_ENV: Joi.string().optional().default('development'),
  
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().optional(),
  DATABASE_PORT: Joi.number().optional().default(5432),
 
}).required()
