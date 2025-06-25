// 나쁜 테스트 케이스 학습을 위한 유틸리티 함수들
// 이 함수들은 의도적으로 테스트하기 어렵게 작성된 예제들입니다.

export class BadExampleService {
  private counter = 0;
  private users: any[] = [];

  // 안티패턴 1: 내부 상태에 의존하는 함수
  getNextId(): number {
    this.counter++;
    return this.counter;
  }

  // 안티패턴 2: 현재 시간에 의존하는 함수
  getCurrentTimeMessage(): string {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return "Good morning!";
    } else if (hour < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  }

  // 안티패턴 3: 랜덤 값에 의존하는 함수
  generateRandomPassword(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // 안티패턴 4: 사이드 이펙트가 있는 함수
  addUser(user: any): void {
    console.log(`Adding user: ${user.name}`);
    this.users.push(user);
    // 외부 API 호출도 포함 (의도적으로 주석 처리)
    // fetch('/api/users', { method: 'POST', body: JSON.stringify(user) });
  }

  // 안티패턴 5: 전역 상태를 변경하는 함수
  setGlobalConfig(config: any): void {
    (global as any).APP_CONFIG = config;
    // 환경 변수 변경 시뮬레이션 (실제로는 변경하지 않음)
    console.log(`Would set NODE_ENV to: ${config.environment}`);
  }

  // 안티패턴 6: 외부 의존성이 하드코딩된 함수
  async fetchUserData(userId: number): Promise<any> {
    // 하드코딩된 URL과 의존성
    const response = await fetch("https://jsonplaceholder.typicode.com/users/" + userId);
    return response.json();
  }

  // 안티패턴 7: 복잡한 조건문과 다중 책임
  processUserRegistration(userData: any): string {
    let result = "";

    // 검증
    if (!userData.email || !userData.email.includes("@")) {
      throw new Error("Invalid email");
    }

    if (!userData.password || userData.password.length < 8) {
      throw new Error("Password too short");
    }

    // 사용자 생성
    const user = {
      id: this.getNextId(),
      email: userData.email,
      password: userData.password,
      createdAt: new Date().toISOString(),
      isActive: true,
    };

    // 로깅
    console.log("User registered:", user.email);

    // 이메일 발송 (시뮬레이션)
    if (userData.sendWelcomeEmail) {
      console.log("Sending welcome email to:", user.email);
      result += "Welcome email sent. ";
    }

    // 통계 업데이트
    (global as any).USER_COUNT = ((global as any).USER_COUNT || 0) + 1;

    this.users.push(user);
    result += `User ${user.email} registered successfully with ID ${user.id}`;

    return result;
  }

  getUsers(): any[] {
    return this.users;
  }

  getUserCount(): number {
    return this.users.length;
  }

  reset(): void {
    this.counter = 0;
    this.users = [];
  }
}

// 안티패턴 8: 전역 함수들
export function calculateTax(price: number): number {
  // 하드코딩된 세율
  const TAX_RATE = 0.1;
  return price * TAX_RATE;
}

export function formatCurrency(amount: number): string {
  // 하드코딩된 통화 및 지역 설정
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

// 안티패턴 9: 파일 시스템에 의존하는 함수
export async function saveToFile(filename: string, data: string): Promise<void> {
  // 실제로는 파일 시스템에 저장하지 않고 콘솔에만 출력
  console.log(`Saving to ${filename}:`, data);
  // 실제 구현이라면:
  // const fs = require('fs').promises;
  // await fs.writeFile(filename, data);
}

// 안티패턴 10: 네트워크 요청에 직접 의존
export async function sendNotification(message: string, userId: number): Promise<boolean> {
  try {
    // 하드코딩된 외부 서비스
    const response = await fetch("https://api.notification-service.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, userId }),
    });

    return response.ok;
  } catch (error) {
    console.error("Notification failed:", error);
    return false;
  }
}

// 유틸리티 함수들
export const badUtilities = {
  // 안티패턴 11: 복잡한 계산과 사이드 이펙트
  complexCalculation: (numbers: number[]): number => {
    console.log("Starting complex calculation...");
    let result = 0;

    for (const num of numbers) {
      if (num > 0) {
        result += num * Math.random(); // 예측 불가능한 결과
      } else if (num < 0) {
        result -= Math.abs(num);
      }

      // 사이드 이펙트
      if (result > 100) {
        console.warn("Result is getting large:", result);
      }
    }

    console.log("Calculation completed:", result);
    return result;
  },

  // 안티패턴 12: 에러 처리가 부족한 함수
  unsafeJsonParse: (jsonString: string): any => {
    return JSON.parse(jsonString); // 에러 처리 없음
  },

  // 안티패턴 13: 비동기 처리가 잘못된 함수
  badAsyncFunction: async (delay: number): Promise<string> => {
    setTimeout(() => {
      console.log("This will not work as expected");
    }, delay);

    return "Completed"; // Promise가 제대로 기다리지 않음
  },
};

// 테스트하기 어려운 클래스 (싱글톤 패턴)
export class BadSingleton {
  private static instance: BadSingleton;
  private data: any = {};

  private constructor() {}

  static getInstance(): BadSingleton {
    if (!BadSingleton.instance) {
      BadSingleton.instance = new BadSingleton();
    }
    return BadSingleton.instance;
  }

  setData(key: string, value: any): void {
    this.data[key] = value;
    console.log(`Set ${key} = ${value}`);
  }

  getData(key: string): any {
    return this.data[key];
  }

  // 정적 메서드로만 접근 가능한 리셋 (테스트에서 문제)
  static reset(): void {
    if (BadSingleton.instance) {
      BadSingleton.instance.data = {};
    }
  }
}
