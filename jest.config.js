module.exports = {
  preset: 'jest-preset-angular',
  setupTestFrameworkScriptFile: '<rootDir>/setup-jest.ts',
  globals: {
    'ts-jest': {
      tsConfigFile: 'src/tsconfig.spec.json',
    },
    __TRANSFORM_HTML__: true,
  },
  transform: {
    '^.+\\.(ts|js|html)$':
      '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
  },
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js', 'html', 'json'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  modulePathIgnorePatterns: ['dist'],
};
