/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // fix for d3 regarding ESM and CJS
  // moduleNameMapper: {
  //   'd3': '<rootDir>/node_modules/d3/dist/d3.min.js',
  // },
  // transformIgnorePatterns: [
  //   '<rootDir>/node_modules/(?!d3|internmap|delaunator|robust-predicates)'
  // ]
  transform: {},
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
}
