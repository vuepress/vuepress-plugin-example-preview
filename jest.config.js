module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/*.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.(vue)$': 'vue-jest',
    '\\.svg$': 'jest-raw-loader',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@source/(.*)$': '<rootDir>/docs/$1',
    '^\\!?raw-loader\\!@source/(.*)$': '<rootDir>/docs/$1',
    '^\\!?raw-loader\\!(.*)$': '$1',
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/lib/icons/*.svg',
    '<rootDir>/test/*.js',
    '<rootDir>/test/.*.js',
    '<rootDir>/test/*/*.js',
    '<rootDir>/lib/highlight.js',
    '<rootDir>/lib/loadLanguages.js',
  ],
  testURL: 'http://localhost/',
}
