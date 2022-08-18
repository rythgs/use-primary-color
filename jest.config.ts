import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  collectCoverage: true,
  errorOnDeprecated: true,
  testEnvironmentOptions: { resources: 'usable' },
  testEnvironment: 'jsdom',
}

export default config
