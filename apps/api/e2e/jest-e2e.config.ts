import type { Config } from '@jest/types'
import 'dotenv/config'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from '../../../tsconfig.json'

const config: Config.InitialOptions = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '.',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>/../../',
	}),
}

export default config
