import { z } from 'zod'

export const envSchema = z.object({
  APP_MODE: z.union([z.literal('production'), z.literal('development')]).default('development'),
  APP_NAME: z.string().default('project_name'),
  APP_BASEURL: z.string().default('http://www.example.com'),
  HOSTNAME: z.string().default('localhost'),
  PORT: z.string().default('3448'),
  CORS: z
    .string()
    .default('')
    .transform((value) => value.split(',').filter((v) => v.trim() !== '')),
  OPENAI_KEY: z.string().default('your-api-key'),
  TZ: z.string().default('Asia/Singapore')
})

export const dbSchema = z.object({
  host: z.string().default('127.0.0.1'),
  port: z.string().default('5432'),
  name: z.string().default('postgres'),
  user: z.string().default('postgres'),
  password: z.string().default('password')
})

export const redisSchema = z.object({
  host: z.string().default('127.0.0.1'),
  port: z.string().default('32768')
})

export const cacheSchema = z.object({
  ttl: z
    .string()
    .default('3600000')
    .transform((value) => parseInt(value)),
  max: z
    .string()
    .default('100')
    .transform((value) => parseInt(value))
})

export const jwtSchema = z.object({
  secret: z.string().default('your-secret-key'),
  issuer: z.string().default('your-issuer'),
  ttl: z.string().default('1h')
})
