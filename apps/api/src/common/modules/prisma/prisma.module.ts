import { Module } from '@nestjs/common'
import { Services } from '../../utils/constants'
import { PrismaService } from './services'

const providersAndExports = [
	{
		provide: Services.Prisma,
		useClass: PrismaService,
	},
]

@Module({
	providers: providersAndExports,
	exports: providersAndExports,
})
export class PrismaModule {}
