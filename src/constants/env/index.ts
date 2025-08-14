import { cacheSchema, dbSchema, envSchema, jwtSchema, redisSchema } from './validator.zod'

export const ENV = envSchema.parse({
  APP_MODE: process.env.NODE_ENV || process.env.APP_MODE,
  APP_NAME: process.env.APP_NAME,
  APP_BASEURL: process.env.APP_BASEURL,
  HOSTNAME: process.env.SERVER_HOSTNAME,
  PORT: process.env.SERVER_PORT,
  CORS: process.env.CORS_WHITELIST,
  OPENAI_KEY: process.env.OPENAI_API_KEY,
  TZ: process.env.TZ
})

export const DB = dbSchema.parse({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

export const DATABASE_URL = `postgresql://${DB.user}:${DB.password}@${DB.host}:${DB.port}/${DB.name}`

export const REDIS = redisSchema.parse({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
})

export const CACHE = cacheSchema.parse({
  ttl: process.env.CACHE_TTL,
  max: process.env.CACHE_MAX
})

export const JWT = jwtSchema.parse({
  secret: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISS,
  ttl: process.env.JWT_TTL
})
