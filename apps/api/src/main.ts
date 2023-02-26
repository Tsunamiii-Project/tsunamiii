import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import connectRedis from 'connect-redis'
import session from 'express-session'
import * as passport from 'passport'
import { createClient } from 'redis'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	const port = process.env.PORT
	const RedisStore = connectRedis(session)
	const redisClient = createClient({ legacyMode: true })
	await redisClient.connect()

	app.use(
		session({
			name: 'SESSION_ID',
			secret: process.env.SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 86400000,
			},
			store: new RedisStore({ client: redisClient }),
		}),
	)
	app.use(passport.initialize())
	app.use(passport.session())

	await app.listen(port)
	Logger.log(`🚀 Application API is running on: http://localhost:${port}`)
}
bootstrap()
