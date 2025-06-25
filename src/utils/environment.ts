// 환경 설정 관리 모듈
export const environment = {
  NODE_ENV: process.env.NODE_ENV || "development",
  API_BASE_URL: process.env.API_BASE_URL || "https://api.example.com",
  DATABASE_URL: process.env.DATABASE_URL || "postgres://localhost:5432/testdb",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};

export const getConfig = () => ({
  isDevelopment: environment.NODE_ENV === "development",
  isProduction: environment.NODE_ENV === "production",
  isTest: environment.NODE_ENV === "test",
  apiUrl: environment.API_BASE_URL,
  dbUrl: environment.DATABASE_URL,
});

export const validateConfig = (): boolean => {
  const requiredVars = ["API_BASE_URL"];
  return requiredVars.every((varName) => process.env[varName] !== undefined);
};
