module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['html', 'json', 'lcov', ['text', {skipFull: true}]],
};