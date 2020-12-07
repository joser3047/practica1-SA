module.exports = {
    testEnvironment: 'node',
    rootDir: './',
    collectCoverage: true,
    coverageDirectory: '<rootDir>/../coverage',
    coverageThreshold: {
        global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
        }
    }
}