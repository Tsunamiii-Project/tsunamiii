import type { Config } from '@jest/types'
import 'dotenv/config'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from '../../tsconfig.json'

const config: Config.InitialOptions = {
	cache: false,
	ci: process.env.CI as unknown as boolean,
	preset: 'ts-jest',
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/../../',
	}),
}

export default config
