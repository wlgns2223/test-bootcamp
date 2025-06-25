const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Next.js 앱의 경로 (루트 디렉토리)
  dir: "./",
});

// Jest의 커스텀 설정
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "**/__tests__/**/*.(js|jsx|ts|tsx)",
    "**/*.(test|spec).(js|jsx|ts|tsx)",
  ],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
};

module.exports = createJestConfig(customJestConfig);
