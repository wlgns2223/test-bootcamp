// Mock과 Spy 실습용 함수들
// 다양한 의존성과 외부 호출을 포함한 함수들을 연습해보세요!

// 실제 npm 모듈들 import (Jest에서 모킹할 대상들)
import { v4 as uuidv4 } from "uuid";
import * as nodeCrypto from "crypto";
import * as fs from "fs/promises";
import * as path from "path";
import * as lodash from "lodash";
import dayjs from "dayjs";

// 1. 외부 API 호출 함수들
export const apiClient = {
  get: async (url: string): Promise<any> => {
    // 실제로는 HTTP 요청을 보내지만, 테스트에서는 mock으로 대체
    const response = await fetch(url);
    return response.json();
  },

  post: async (url: string, data: any): Promise<any> => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// 2. 사용자 서비스
export class UserService {
  constructor(private api = apiClient) {}

  async getUser(id: number) {
    try {
      const user = await this.api.get(`/api/users/${id}`);
      return user;
    } catch (error: unknown) {
      throw new Error("사용자를 찾을 수 없습니다");
    }
  }

  async createUser(userData: { name: string; email: string }) {
    if (!userData.name || !userData.email) {
      throw new Error("이름과 이메일은 필수입니다");
    }

    try {
      const newUser = await this.api.post("/api/users", userData);
      this.logActivity("USER_CREATED", newUser.id);
      return newUser;
    } catch (error: unknown) {
      throw new Error("사용자 생성에 실패했습니다");
    }
  }

  async updateUserActivity(userId: number, activity: string) {
    const timestamp = Date.now();
    await this.api.post(`/api/users/${userId}/activity`, {
      activity,
      timestamp,
    });
    return { userId, activity, timestamp };
  }

  private logActivity(action: string, userId: number) {
    console.log(`[${new Date().toISOString()}] ${action}: User ${userId}`);
  }
}

// 3. 이메일 서비스
export interface EmailService {
  sendEmail(to: string, subject: string, body: string): Promise<boolean>;
  sendWelcomeEmail(userEmail: string, userName: string): Promise<boolean>;
}

export const emailService: EmailService = {
  sendEmail: async (to: string, subject: string, body: string): Promise<boolean> => {
    // 실제로는 이메일을 보내지만, 테스트에서는 mock으로 대체
    console.log(`Sending email to ${to}: ${subject}`);
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 100);
    });
  },

  sendWelcomeEmail: async (userEmail: string, userName: string): Promise<boolean> => {
    const subject = `${userName}님, 환영합니다!`;
    const body = `안녕하세요 ${userName}님, 가입을 환영합니다.`;
    return emailService.sendEmail(userEmail, subject, body);
  },
};

// 4. 알림 서비스
export class NotificationService {
  constructor(
    private emailService: EmailService = emailService,
    private userService: UserService = new UserService()
  ) {}

  async sendUserNotification(userId: number, message: string) {
    const user = await this.userService.getUser(userId);
    const emailSent = await this.emailService.sendEmail(user.email, "알림", message);

    if (emailSent) {
      await this.userService.updateUserActivity(userId, "NOTIFICATION_SENT");
    }

    return emailSent;
  }

  async sendBulkNotifications(userIds: number[], message: string) {
    const results = [];
    for (const userId of userIds) {
      try {
        const result = await this.sendUserNotification(userId, message);
        results.push({ userId, success: result });
      } catch (error: unknown) {
        results.push({
          userId,
          success: false,
          error: error instanceof Error ? error.message : "알 수 없는 오류",
        });
      }
    }
    return results;
  }
}

// 5. 유틸리티 함수들
export interface Utils {
  generateId(): string;
  formatDate(date: Date): string;
  validateEmail(email: string): boolean;
  delay(ms: number): Promise<void>;
}

export const utils: Utils = {
  generateId: (): string => {
    return Math.random().toString(36).substring(2, 9);
  },

  formatDate: (date: Date): string => {
    return date.toISOString().split("T")[0];
  },

  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  delay: (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },
};

// 6. 파일 시스템 관련 (Node.js 환경에서만 사용)
export const fileSystem = {
  readFile: async (path: string): Promise<string> => {
    // 실제로는 파일을 읽지만, 테스트에서는 mock으로 대체
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.includes("error")) {
          reject(new Error("파일을 읽을 수 없습니다"));
        } else {
          resolve(`파일 내용: ${path}`);
        }
      }, 50);
    });
  },

  writeFile: async (path: string, content: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (path.includes("readonly")) {
          reject(new Error("쓰기 권한이 없습니다"));
        } else {
          resolve();
        }
      }, 50);
    });
  },
};

// 7. 계산기 클래스 (spy 테스트용)
export class Calculator {
  private history: string[] = [];

  add(a: number, b: number): number {
    const result = a + b;
    this.recordOperation(`${a} + ${b} = ${result}`);
    return result;
  }

  subtract(a: number, b: number): number {
    const result = a - b;
    this.recordOperation(`${a} - ${b} = ${result}`);
    return result;
  }

  multiply(a: number, b: number): number {
    const result = a * b;
    this.recordOperation(`${a} * ${b} = ${result}`);
    return result;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("0으로 나눌 수 없습니다");
    }
    const result = a / b;
    this.recordOperation(`${a} / ${b} = ${result}`);
    return result;
  }

  getHistory(): string[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }

  private recordOperation(operation: string): void {
    this.history.push(operation);
  }
}

// 8. 주문 서비스 (종합 실습용)
export interface Order {
  id: string;
  userId: number;
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
}

export class OrderService {
  constructor(
    private userService: UserService = new UserService(),
    private emailService: EmailService = emailService,
    private utils: Utils = utils
  ) {}

  async createOrder(userId: number, items: Order["items"]): Promise<Order> {
    // 사용자 존재 확인
    const user = await this.userService.getUser(userId);

    // 주문 생성
    const order: Order = {
      id: this.utils.generateId(),
      userId,
      items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: "pending",
    };

    // 주문 확인 이메일 발송
    await this.emailService.sendEmail(user.email, "주문 확인", `주문 번호 ${order.id}가 접수되었습니다.`);

    // 사용자 활동 기록
    await this.userService.updateUserActivity(userId, "ORDER_CREATED");

    return order;
  }

  async processOrder(orderId: string): Promise<Order> {
    // 실제로는 데이터베이스에서 주문을 가져오지만,
    // 테스트에서는 mock으로 대체
    const order = await this.getOrder(orderId);

    if (order.status !== "pending") {
      throw new Error("이미 처리된 주문입니다");
    }

    // 재고 확인 (mock 함수)
    const stockAvailable = await this.checkStock(order.items);
    if (!stockAvailable) {
      throw new Error("재고가 부족합니다");
    }

    // 결제 처리 (mock 함수)
    const paymentSuccess = await this.processPayment(order.total);
    if (!paymentSuccess) {
      throw new Error("결제에 실패했습니다");
    }

    // 주문 상태 업데이트
    order.status = "confirmed";

    return order;
  }

  private async getOrder(orderId: string): Promise<Order> {
    // Mock 함수 - 실제로는 데이터베이스 조회
    return {
      id: orderId,
      userId: 1,
      items: [{ name: "상품1", price: 10000, quantity: 1 }],
      total: 10000,
      status: "pending",
    };
  }

  private async checkStock(items: Order["items"]): Promise<boolean> {
    // Mock 함수 - 실제로는 재고 시스템 조회
    return true;
  }

  private async processPayment(amount: number): Promise<boolean> {
    // Mock 함수 - 실제로는 결제 시스템 호출
    return amount > 0;
  }
}

// ===== 모듈 모킹을 위한 추가 유틸리티들 =====

// 9. 외부 라이브러리 시뮬레이션 (lodash 스타일)
export const lodashUtils = {
  debounce: (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  },

  chunk: <T>(array: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  },

  random: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};

// 10. 날짜 유틸리티 모듈
export const dateUtils = {
  getCurrentDate: (): Date => {
    return new Date();
  },

  formatDate: (date: Date): string => {
    return date.toISOString().split("T")[0];
  },

  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  isWeekend: (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6; // 일요일(0) 또는 토요일(6)
  },
};

// 11. HTTP 클라이언트 모듈
export const httpClient = {
  get: async (url: string, options?: any): Promise<any> => {
    const response = await fetch(url, { method: "GET", ...options });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  },

  post: async (url: string, data: any, options?: any): Promise<any> => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      ...options,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  },
};

// 12. 로거 모듈
export const logger = {
  info: (message: string, ...args: any[]): void => {
    console.log(`[INFO] ${message}`, ...args);
  },

  error: (message: string, error?: Error): void => {
    console.error(`[ERROR] ${message}`, error);
  },

  debug: (message: string, data?: any): void => {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${message}`, data);
    }
  },
};

// 13. 설정 관리 모듈
export const config = {
  getApiUrl: (): string => {
    return process.env.API_URL || "https://api.example.com";
  },

  getDbConnectionString: (): string => {
    return process.env.DB_URL || "localhost:5432/testdb";
  },

  isProduction: (): boolean => {
    return process.env.NODE_ENV === "production";
  },
};

// 14. 모듈 간 의존성을 가진 복합 서비스
export class WeatherService {
  async getCurrentWeather(city: string) {
    try {
      logger.info("Fetching weather data", { city });

      const apiUrl = config.getApiUrl();
      const weatherData = await httpClient.get(`${apiUrl}/weather/${city}`);

      const currentDate = dateUtils.getCurrentDate();
      const formattedDate = dateUtils.formatDate(currentDate);

      return {
        city,
        temperature: weatherData.temperature,
        condition: weatherData.condition,
        date: formattedDate,
        isWeekend: dateUtils.isWeekend(currentDate),
      };
    } catch (error) {
      logger.error("Failed to fetch weather data", error as Error);
      throw new Error(`날씨 정보를 가져올 수 없습니다: ${city}`);
    }
  }

  async getWeatherForecast(city: string, days: number = 7) {
    const baseDate = dateUtils.getCurrentDate();
    const forecasts = [];

    for (let i = 0; i < days; i++) {
      const date = dateUtils.addDays(baseDate, i);
      const temperature = lodashUtils.random(15, 30);

      forecasts.push({
        date: dateUtils.formatDate(date),
        temperature,
        condition: temperature > 25 ? "sunny" : "cloudy",
      });
    }

    logger.info("Generated weather forecast", { city, days: forecasts.length });
    return forecasts;
  }
}

// 15. 데이터 처리 서비스 (여러 모듈 의존성)
export class DataProcessor {
  async processUserData(users: Array<{ id: number; name: string; joinDate: string }>) {
    logger.info("Processing user data", { count: users.length });

    try {
      // 사용자 데이터를 청크로 나누기
      const userChunks = lodashUtils.chunk(users, 10);
      const results = [];

      for (const chunk of userChunks) {
        const processedChunk = chunk.map((user) => {
          const joinDate = new Date(user.joinDate);
          const daysSinceJoin = Math.floor(
            (dateUtils.getCurrentDate().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
          );

          return {
            ...user,
            daysSinceJoin,
            isLongTimeUser: daysSinceJoin > 365,
            formattedJoinDate: dateUtils.formatDate(joinDate),
          };
        });

        results.push(...processedChunk);

        // API에 처리된 데이터 저장
        if (config.isProduction()) {
          await httpClient.post(`${config.getApiUrl()}/users/batch-update`, processedChunk);
        }
      }

      logger.info("User data processing completed", {
        processed: results.length,
      });
      return results;
    } catch (error) {
      logger.error("Failed to process user data", error as Error);
      throw new Error("사용자 데이터 처리에 실패했습니다");
    }
  }
}

// 16. 캐시 서비스 (타이머와 모듈 의존성)
export class CacheService {
  private cache = new Map<string, { data: any; expiry: number }>();

  async get<T>(key: string, fetcher?: () => Promise<T>, ttlMinutes: number = 5): Promise<T | null> {
    const cached = this.cache.get(key);
    const now = dateUtils.getCurrentDate().getTime();

    if (cached && cached.expiry > now) {
      logger.debug("Cache hit", { key });
      return cached.data;
    }

    if (fetcher) {
      logger.debug("Cache miss, fetching data", { key });
      try {
        const data = await fetcher();
        const expiry = now + ttlMinutes * 60 * 1000;
        this.cache.set(key, { data, expiry });
        return data;
      } catch (error) {
        logger.error("Failed to fetch data for cache", error as Error);
        throw error;
      }
    }

    return null;
  }

  clear(): void {
    this.cache.clear();
    logger.info("Cache cleared");
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// === 실제 NPM 모듈을 활용하는 서비스들 (모킹 실습용) ===

// 1. 파일 시스템을 활용하는 서비스
export class FileService {
  async readConfig(configPath: string = "./config.json") {
    try {
      const fullPath = path.resolve(configPath);
      const content = await fs.readFile(fullPath, "utf-8");
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`설정 파일을 읽을 수 없습니다: ${configPath}`);
    }
  }

  async writeLog(logData: any) {
    const logDir = path.join(process.cwd(), "logs");
    const fileName = `log-${dayjs().format("YYYY-MM-DD")}.json`;
    const filePath = path.join(logDir, fileName);

    try {
      // 디렉토리가 없으면 생성
      await fs.mkdir(logDir, { recursive: true });

      // 로그 데이터 작성
      const logEntry = {
        timestamp: dayjs().toISOString(),
        id: uuidv4(),
        data: logData,
      };

      await fs.appendFile(filePath, JSON.stringify(logEntry) + "\n");
      return logEntry;
    } catch (error) {
      throw new Error("로그 작성에 실패했습니다");
    }
  }

  async getFileStats(filePath: string) {
    try {
      const stats = await fs.stat(filePath);
      return {
        size: stats.size,
        created: dayjs(stats.birthtime).format("YYYY-MM-DD HH:mm:ss"),
        modified: dayjs(stats.mtime).format("YYYY-MM-DD HH:mm:ss"),
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
      };
    } catch (error) {
      throw new Error("파일 정보를 가져올 수 없습니다");
    }
  }
}

// 2. 암호화 및 보안 서비스
export class SecurityService {
  generateSecureId(): string {
    return uuidv4();
  }

  hashPassword(password: string): string {
    const salt = nodeCrypto.randomBytes(16).toString("hex");
    const hash = nodeCrypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return `${salt}:${hash}`;
  }

  verifyPassword(password: string, stored: string): boolean {
    const [salt, hash] = stored.split(":");
    const hashToVerify = nodeCrypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
    return hash === hashToVerify;
  }

  generateApiKey(): string {
    const randomData = nodeCrypto.randomBytes(32);
    return nodeCrypto.createHash("sha256").update(randomData).digest("hex");
  }

  encryptData(data: string, key: string): string {
    const iv = nodeCrypto.randomBytes(16);
    const cipher = nodeCrypto.createCipher("aes-256-cbc", key);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
  }
}

// 3. 데이터 처리 서비스 (lodash 활용)
export class DataProcessingService {
  private dataCache = new Map<string, any>();

  processUserData(users: any[]): any[] {
    // lodash를 활용한 데이터 처리
    return lodash
      .chain(users)
      .filter((user: any) => user.active)
      .map((user: any) => ({
        ...user,
        id: uuidv4(),
        processedAt: dayjs().toISOString(),
        fullName: `${user.firstName} ${user.lastName}`,
      }))
      .orderBy(["lastName", "firstName"], ["asc", "asc"])
      .value();
  }

  groupByDepartment(employees: any[]): Record<string, any[]> {
    return lodash.groupBy(employees, "department");
  }

  calculateStats(numbers: number[]): any {
    if (lodash.isEmpty(numbers)) {
      throw new Error("숫자 배열이 비어있습니다");
    }

    return {
      count: numbers.length,
      sum: lodash.sum(numbers),
      mean: lodash.mean(numbers),
      min: lodash.min(numbers),
      max: lodash.max(numbers),
      median: this.calculateMedian(numbers),
    };
  }

  private calculateMedian(numbers: number[]): number {
    const sorted = lodash.sortBy(numbers);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    } else {
      return sorted[middle];
    }
  }

  debounceProcess = lodash.debounce((data: any) => {
    return this.processData(data);
  }, 300);

  private processData(data: any) {
    const cacheKey = nodeCrypto.createHash("md5").update(JSON.stringify(data)).digest("hex");

    if (this.dataCache.has(cacheKey)) {
      return this.dataCache.get(cacheKey);
    }

    const processed = {
      ...data,
      processedAt: dayjs().toISOString(),
      hash: cacheKey,
    };

    this.dataCache.set(cacheKey, processed);
    return processed;
  }
}

// 4. 날짜/시간 처리 서비스 (dayjs 활용)
export class DateTimeService {
  getCurrentTimestamp(): string {
    return dayjs().toISOString();
  }

  formatDate(date: Date | string, format: string = "YYYY-MM-DD"): string {
    return dayjs(date).format(format);
  }

  addDays(date: Date | string, days: number): string {
    return dayjs(date).add(days, "day").toISOString();
  }

  getDaysBetween(startDate: Date | string, endDate: Date | string): number {
    return dayjs(endDate).diff(dayjs(startDate), "day");
  }

  isBusinessDay(date: Date | string): boolean {
    const day = dayjs(date).day();
    return day >= 1 && day <= 5; // 월요일(1) ~ 금요일(5)
  }

  getBusinessDaysInMonth(year: number, month: number): Date[] {
    const startOfMonth = dayjs()
      .year(year)
      .month(month - 1)
      .startOf("month");
    const endOfMonth = dayjs()
      .year(year)
      .month(month - 1)
      .endOf("month");

    const businessDays: Date[] = [];
    let current = startOfMonth;

    // 더 안전한 루프 조건: 날짜만 비교하고 월이 같을 때까지만 반복
    while (current.month() === month - 1) {
      if (this.isBusinessDay(current.toDate())) {
        businessDays.push(current.toDate());
      }
      current = current.add(1, "day");
    }

    return businessDays;
  }

  createSchedule(startDate: Date | string, intervalDays: number, count: number): Date[] {
    const schedule: Date[] = [];
    let current = dayjs(startDate);

    for (let i = 0; i < count; i++) {
      schedule.push(current.toDate());
      current = current.add(intervalDays, "day");
    }

    return schedule;
  }
}

// 5. 통합 비즈니스 서비스 (여러 npm 모듈 조합)
export class BusinessService {
  constructor(
    private fileService = new FileService(),
    private securityService = new SecurityService(),
    private dataService = new DataProcessingService(),
    private dateService = new DateTimeService()
  ) {}

  async createBusinessReport(reportData: any) {
    try {
      // 0. 설정 파일 읽기
      const config = await this.fileService.readConfig("./config.json");

      // 1. 데이터 처리 및 통계 계산
      const processedData = this.dataService.processUserData(reportData.users || []);
      const stats = reportData.numbers ? this.dataService.calculateStats(reportData.numbers) : null;

      // 2. 보고서 ID 생성
      const reportId = this.securityService.generateSecureId();

      // 3. 보고서 생성
      const report = {
        id: reportId,
        title: reportData.title || "비즈니스 보고서",
        createdAt: this.dateService.getCurrentTimestamp(),
        createdBy: reportData.author || "System",
        data: {
          processed: processedData,
          statistics: stats,
          summary: lodash.pick(reportData, ["department", "period", "type"]),
        },
        metadata: {
          hash: nodeCrypto.createHash("sha256").update(JSON.stringify(processedData)).digest("hex"),
          version: "1.0.0",
          config: config,
        },
      };

      // 4. 로그 기록
      await this.fileService.writeLog({
        action: "REPORT_CREATED",
        reportId: reportId,
        timestamp: this.dateService.getCurrentTimestamp(),
      });

      return report;
    } catch (error) {
      throw new Error("비즈니스 보고서 생성에 실패했습니다");
    }
  }

  async scheduleBusinessTasks(tasks: any[], startDate: Date) {
    const schedule = this.dateService.createSchedule(startDate, 1, tasks.length);

    return tasks.map((task, index) => ({
      ...task,
      id: this.securityService.generateSecureId(),
      scheduledDate: this.dateService.formatDate(schedule[index]),
      isBusinessDay: this.dateService.isBusinessDay(schedule[index]),
      priority: task.priority || "normal",
    }));
  }

  async exportBusinessData(data: any[], format: "json" | "csv" = "json") {
    const exportId = this.securityService.generateSecureId();
    const timestamp = this.dateService.getCurrentTimestamp();

    const exportData = {
      exportId,
      timestamp,
      format,
      recordCount: data.length,
      data: format === "json" ? data : this.convertToCSV(data),
    };

    // 파일로 저장
    const fileName = `export-${exportId}-${dayjs().format("YYYY-MM-DD-HH-mm-ss")}.${format}`;
    await this.fileService.writeLog({
      action: "DATA_EXPORTED",
      exportId,
      fileName,
      recordCount: data.length,
    });

    return exportData;
  }

  private convertToCSV(data: any[]): string {
    if (lodash.isEmpty(data)) return "";

    const headers = Object.keys(data[0]);
    const rows = data.map((item) => headers.map((header) => JSON.stringify(item[header] || "")).join(","));

    return [headers.join(","), ...rows].join("\n");
  }
}

// 17. 외부 라이브러리를 사용하는 서비스
import { axios, moment, uuid, crypto as extCrypto } from "./externalLibs";
import { environment, getConfig } from "./environment";

export class ExternalLibService {
  async fetchUserProfile(userId: string) {
    try {
      const config = getConfig();
      const url = `${config.apiUrl}/users/${userId}`;
      const response = await axios.get(url);

      return {
        ...response.data,
        id: uuid.v4(), // 새로운 ID 생성
        lastUpdated: moment.format(new Date()),
        hash: nodeCrypto.createHash("md5").update(userId).digest("hex"),
      };
    } catch (error) {
      throw new Error(`사용자 프로필을 가져올 수 없습니다: ${userId}`);
    }
  }

  async createSecureToken(data: string) {
    const timestamp = moment.now();
    const randomBytes = nodeCrypto.randomBytes(16);
    const hash = nodeCrypto
      .createHash("sha256")
      .update(data + timestamp + randomBytes.toString("hex"))
      .digest("hex");

    return {
      token: hash,
      id: uuid.v4(),
      createdAt: moment.format(new Date(), "YYYY-MM-DD HH:mm:ss"),
      expiresAt: moment.format(moment.add(new Date(), 1, "days"), "YYYY-MM-DD HH:mm:ss"),
    };
  }
}

// 18. 환경 설정에 의존하는 서비스
export class EnvironmentService {
  getServerConfig() {
    const config = getConfig();

    return {
      environment: environment.NODE_ENV,
      apiUrl: config.apiUrl,
      isDevelopment: config.isDevelopment,
      features: {
        enableCaching: config.isProduction,
        debugMode: config.isDevelopment,
        logLevel: environment.LOG_LEVEL,
      },
    };
  }

  async healthCheck() {
    const config = getConfig();

    try {
      const response = await axios.get(`${config.apiUrl}/health`);
      return {
        status: "healthy",
        environment: environment.NODE_ENV,
        timestamp: moment.format(new Date()),
        details: response.data,
      };
    } catch (error) {
      return {
        status: "unhealthy",
        environment: environment.NODE_ENV,
        timestamp: moment.format(new Date()),
        error: (error as Error).message,
      };
    }
  }
}

// 19. 복합 의존성 서비스 (여러 모듈 + 내부 서비스)
export class IntegratedService {
  constructor(
    private externalLibService = new ExternalLibService(),
    private environmentService = new EnvironmentService(),
    private cacheService = new CacheService()
  ) {}

  async getUserDashboard(userId: string) {
    const cacheKey = `dashboard_${userId}`;

    // 캐시에서 먼저 확인
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      // 여러 서비스에서 데이터 수집
      const [userProfile, serverConfig, healthStatus] = await Promise.all([
        this.externalLibService.fetchUserProfile(userId),
        this.environmentService.getServerConfig(),
        this.environmentService.healthCheck(),
      ]);

      const dashboard = {
        user: userProfile,
        server: serverConfig,
        health: healthStatus,
        generated: {
          timestamp: moment.format(new Date()),
          id: uuid.v4(),
        },
      };

      // 캐시에 저장
      await this.cacheService.get(cacheKey, async () => dashboard, 10);

      return dashboard;
    } catch (error) {
      logger.error("Failed to generate user dashboard", error as Error);
      throw new Error("대시보드 생성에 실패했습니다");
    }
  }
}
