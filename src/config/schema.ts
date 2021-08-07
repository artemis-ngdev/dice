import Joi from 'joi'

export const ConfigSchema = Joi.object({
  PORT: Joi.number().optional().default(4000),
  NODE_ENV: Joi.string().optional().default('development'),
  DATABASE_URL: Joi.string().required()
}).required()
