module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  cacheDirectory: "./cache",
  coveragePathIgnorePatterns: ["./app/utils/vendor"],
  coverageThreshold: {
    global: {
      statements: 80,
    },
  },
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
  transformIgnorePatterns: [
    "/node_modules/(?!react|uuid|jest-cucumber|formik|react-redux|react-router-dom|@reduxjs/toolkit|react-dom|axios|@mui/material/Switch|@mui/material)/",
  ],
  roots: ["<rootDir>/src/Components/Features"],
  testMatch: ["**/*.steps.{js,jsx,ts,tsx}"],
  transform: {
    "\\.(jsx?|tsx?)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
    cucumber: {
      stepDefinitions: "<rootDir>src/Components/Features/step_definitions",
      features: "<rootDir>src/Components/Features",
    },
  },
};
