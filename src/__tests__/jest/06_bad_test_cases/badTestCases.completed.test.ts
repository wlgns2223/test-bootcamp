/**
 * 나쁜 테스트 케이스들 - 정답 완성본
 *
 * 이 파일은 나쁜 테스트 패턴을 개선한 완성된 정답입니다.
 * 실습 후 본인의 답안과 비교해보세요.
 */

import {
  BadExampleService,
  calculateTax,
  formatCurrency,
  saveToFile,
  sendNotification,
  badUtilities,
  BadSingleton,
} from "../../../utils/badExamples";

// Mock 설정
jest.mock("fs");
global.fetch = jest.fn();

describe("나쁜 테스트 케이스 개선 실습 - 정답", () => {
  let badService: BadExampleService;

  beforeEach(() => {
    badService = new BadExampleService();
    jest.clearAllMocks();
    // 실습 1-1 정답: 전역 상태 초기화
    delete (global as any).APP_CONFIG;
    delete (global as any).USER_COUNT;
  });

  describe("실습 1: 취약한 테스트 개선하기", () => {
    it("❌ 나쁜 예시 - 이 테스트의 문제점을 찾아보세요", () => {
      // 이 테스트는 내부 구현에 너무 의존적입니다
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      badService.addUser({ name: "John", email: "john@test.com" });

      // 문제점: 내부 로깅 메시지가 바뀌면 테스트가 깨짐
      expect(consoleSpy).toHaveBeenCalledWith("Adding user: John");

      consoleSpy.mockRestore();
    });

    it("실습 1-2 정답 - 결과에 집중하는 개선된 테스트", () => {
      // 실습 1-2 정답: 구현 세부사항이 아닌 결과에 집중
      const initialCount = badService.getUserCount();
      const newUser = { name: "John", email: "john@test.com" };

      badService.addUser(newUser);

      // 내부 구현이 어떻든 사용자가 실제로 추가되었는지만 확인
      expect(badService.getUserCount()).toBe(initialCount + 1);
      expect(badService.getUsers()).toContainEqual(expect.objectContaining(newUser));
    });
  });

  describe("실습 2: 느린 테스트 개선하기", () => {
    it("❌ 나쁜 예시 - 실제 네트워크 호출 (실행하지 마세요!)", async () => {
      // 이 테스트는 실제 외부 API를 호출하므로 느리고 불안정합니다
      // await expect(badService.fetchUserData(1)).resolves.toBeDefined();

      // 대신 이미 mock이 설정된 버전으로 테스트
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ id: 1, name: "Test User" }),
      } as Response);

      const result = await badService.fetchUserData(1);
      expect(result).toEqual({ id: 1, name: "Test User" });
    });

    it("실습 2-1 정답 - fake timer를 사용한 개선된 테스트", () => {
      // 실습 2-1 정답: Jest의 fake timer 사용
      jest.useFakeTimers();

      let result = "";

      setTimeout(() => {
        result = "delayed result";
      }, 1000);

      // 시간을 인위적으로 앞당김 - 실제로 기다리지 않음
      jest.advanceTimersByTime(1000);

      expect(result).toBe("delayed result");

      jest.useRealTimers();
    });
  });

  describe("실습 3: 복잡한 테스트 분리하기", () => {
    it("❌ 나쁜 예시 - 너무 많은 것을 한 번에 테스트", () => {
      const userData = {
        email: "test@example.com",
        password: "password123",
        sendWelcomeEmail: true,
      };

      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      const result = badService.processUserRegistration(userData);

      // 너무 많은 검증이 한 곳에 모여있음
      expect(result).toContain("User test@example.com registered successfully");
      expect(result).toContain("Welcome email sent");
      expect(badService.getUserCount()).toBe(1);
      expect(consoleSpy).toHaveBeenCalledWith("User registered:", "test@example.com");
      expect(consoleSpy).toHaveBeenCalledWith("Sending welcome email to:", "test@example.com");
      expect((global as any).USER_COUNT).toBe(1);

      consoleSpy.mockRestore();
    });

    it("실습 3-1 정답 - 사용자 등록 기능만 테스트", () => {
      // 실습 3-1 정답: 핵심 기능에만 집중
      const userData = {
        email: "test@example.com",
        password: "password123",
        sendWelcomeEmail: false, // 이메일 기능은 별도 테스트
      };

      const result = badService.processUserRegistration(userData);

      expect(result).toContain("User test@example.com registered successfully");
      expect(badService.getUserCount()).toBe(1);

      const users = badService.getUsers();
      expect(users[0]).toMatchObject({
        email: "test@example.com",
        isActive: true,
      });
    });

    it("실습 3-2 정답 - 이메일 발송 기능만 테스트", () => {
      // 실습 3-2 정답: 이메일 발송 기능을 별도로 테스트
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      const userData = {
        email: "test@example.com",
        password: "password123",
        sendWelcomeEmail: true,
      };

      const result = badService.processUserRegistration(userData);

      expect(result).toContain("Welcome email sent");
      expect(consoleSpy).toHaveBeenCalledWith("Sending welcome email to:", "test@example.com");

      consoleSpy.mockRestore();
    });

    it("실습 3-3 정답 - 입력 검증 로직만 테스트", () => {
      // 실습 3-3 정답: 검증 로직을 별도로 테스트
      const invalidEmailData = {
        email: "invalid-email",
        password: "password123",
      };

      expect(() => {
        badService.processUserRegistration(invalidEmailData);
      }).toThrow("Invalid email");

      const shortPasswordData = {
        email: "test@example.com",
        password: "123",
      };

      expect(() => {
        badService.processUserRegistration(shortPasswordData);
      }).toThrow("Password too short");
    });
  });

  describe("실습 4: 테스트 독립성 확보하기", () => {
    // 이 테스트들은 서로 의존적입니다. 독립적으로 만들어보세요.

    it("❌ 첫 번째 테스트 - 다음 테스트가 이것에 의존함", () => {
      badService.addUser({ name: "John", email: "john@test.com" });
      expect(badService.getUserCount()).toBe(1);
    });

    it.skip("❌ 두 번째 테스트 - 첫 번째 테스트에 의존함", () => {
      // 이는 의도적으로 실패하는 나쁜 예시입니다 (설명 목적으로 skip 처리)
      expect(badService.getUserCount()).toBe(1); // 이전 테스트 결과에 의존

      badService.addUser({ name: "Jane", email: "jane@test.com" });
      expect(badService.getUserCount()).toBe(2);
    });

    it("실습 4-1a 정답 - 독립적인 첫 번째 테스트", () => {
      // 실습 4-1a 정답: 각 테스트가 독립적으로 동작
      // beforeEach에서 badService가 초기화되므로 깨끗한 상태에서 시작
      expect(badService.getUserCount()).toBe(0);

      badService.addUser({ name: "John", email: "john@test.com" });
      expect(badService.getUserCount()).toBe(1);
    });

    it("실습 4-1b 정답 - 독립적인 두 번째 테스트", () => {
      // 실습 4-1b 정답: 이 테스트도 독립적으로 동작
      expect(badService.getUserCount()).toBe(0); // 다른 테스트 영향 없음

      badService.addUser({ name: "Jane", email: "jane@test.com" });
      expect(badService.getUserCount()).toBe(1);
    });
  });

  describe("실습 5: 명확한 테스트 작성하기", () => {
    it("❌ 나쁜 예시 - 의도가 불분명한 테스트", () => {
      const result = badUtilities.complexCalculation([1, 2, 3]);
      expect(result).toBeGreaterThan(0);
      // 왜 0보다 커야 하는지 불분명
    });

    it("❌ test1", () => {
      // 테스트 이름이 의미가 없음
      const user = { name: "test", email: "test@test.com" };
      badService.addUser(user);
      expect(badService.getUsers().length).toBe(1);
    });

    it("실습 5-1a 정답 - 양수 배열 입력 시 예측 가능한 결과 계산", () => {
      // 실습 5-1a 정답: Math.random을 mock하여 예측 가능한 결과 만들기
      const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

      const positiveNumbers = [1, 2, 3];
      const result = badUtilities.complexCalculation(positiveNumbers);

      // 예상 결과: (1 * 0.5) + (2 * 0.5) + (3 * 0.5) = 3
      expect(result).toBe(3);

      mathRandomSpy.mockRestore();
    });

    it("사용자 추가 시 사용자 목록에 새 사용자가 포함되어야 한다", () => {
      // 실습 5-1b 정답: 의미있는 테스트 이름과 명확한 내용
      const newUser = { name: "Alice", email: "alice@example.com" };

      badService.addUser(newUser);

      const users = badService.getUsers();
      expect(users).toContainEqual(expect.objectContaining(newUser));
      expect(users).toHaveLength(1);
    });
  });

  describe("실습 6: 비결정적 테스트 개선하기", () => {
    it("❌ 나쁜 예시 - 랜덤 값에 의존", () => {
      const password1 = badService.generateRandomPassword();
      const password2 = badService.generateRandomPassword();

      expect(password1).not.toBe(password2);
      expect(password1).toHaveLength(12);
    });

    it("❌ 나쁜 예시 - 현재 시간에 의존", () => {
      const message = badService.getCurrentTimeMessage();
      expect(["Good morning!", "Good afternoon!", "Good evening!"]).toContain(message);
    });

    it("실습 6-1a 정답 - 예측 가능한 패스워드 생성 테스트", () => {
      // 실습 6-1a 정답: Math.random을 mock하여 예측 가능한 패스워드 생성
      const mockRandom = jest.spyOn(Math, "random");

      // 'A', 'B', 'C' 문자들이 순서대로 선택되도록 설정
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      mockRandom
        .mockReturnValueOnce(0) // 'A' 선택 (0 * 62 = 0)
        .mockReturnValueOnce(1 / 62) // 'B' 선택 (1 * 62 = 1)
        .mockReturnValueOnce(2 / 62) // 'C' 선택 (2 * 62 = 2)
        .mockReturnValueOnce(0) // 'A'
        .mockReturnValueOnce(0) // 'A'
        .mockReturnValueOnce(0) // 'A'
        .mockReturnValueOnce(0) // 'A'
        .mockReturnValueOnce(0) // 'A'
        .mockReturnValueOnce(0) // 'A'
        .mockReturnValueOnce(0) // 'A'
        .mockReturnValueOnce(0) // 'A'
        .mockReturnValueOnce(0); // 'A'

      const password = badService.generateRandomPassword();

      expect(password).toHaveLength(12);
      expect(password).toBe("ABCAAAAAAAAA"); // 예측 가능한 결과

      mockRandom.mockRestore();
    });

    it("실습 6-1b 정답 - Date Mock으로 시간 고정하기", () => {
      // 실습 6-1b 정답: 특정 시간으로 Date를 고정
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2023-01-01T10:00:00")); // 오전 10시 (로컬 시간)

      const message = badService.getCurrentTimeMessage();

      expect(message).toBe("Good morning!");

      jest.useRealTimers();
    });

    it("실습 6-1b 추가 - 오후 시간 테스트", () => {
      // 추가: 오후 시간 테스트
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2023-01-01T15:00:00")); // 오후 3시 (로컬 시간)

      const message = badService.getCurrentTimeMessage();

      expect(message).toBe("Good afternoon!");

      jest.useRealTimers();
    });

    it("실습 6-1b 추가 - 저녁 시간 테스트", () => {
      // 추가: 저녁 시간 테스트
      jest.useFakeTimers();
      jest.setSystemTime(new Date("2023-01-01T20:00:00")); // 오후 8시 (로컬 시간)

      const message = badService.getCurrentTimeMessage();

      expect(message).toBe("Good evening!");

      jest.useRealTimers();
    });
  });

  describe("실습 7: 싱글톤 테스트 개선하기", () => {
    beforeEach(() => {
      // 실습 7-1 정답: 각 테스트 전에 싱글톤 상태 초기화
      BadSingleton.reset();
    });

    it("실습 7-1a 정답 - 깨끗한 상태에서 시작하는 테스트", () => {
      // 실습 7-1a 정답: 싱글톤이 초기 상태인지 확인하고 새 데이터 설정
      const singleton = BadSingleton.getInstance();

      // 초기 상태 확인
      expect(singleton.getData("nonExistentKey")).toBeUndefined();

      // 새 데이터 설정 및 확인
      singleton.setData("testKey", "testValue");
      expect(singleton.getData("testKey")).toBe("testValue");
    });

    it("실습 7-1b 정답 - 이전 테스트에 영향받지 않는 독립적 테스트", () => {
      // 실습 7-1b 정답: 이 테스트도 깨끗한 상태에서 시작
      const singleton = BadSingleton.getInstance();

      // 이전 테스트의 'testKey'가 없어야 함
      expect(singleton.getData("testKey")).toBeUndefined();

      // 새로운 키로 테스트
      singleton.setData("anotherKey", "anotherValue");
      expect(singleton.getData("anotherKey")).toBe("anotherValue");
    });

    it("실습 7-1c 추가 - 여러 데이터 설정 테스트", () => {
      // 추가: 여러 데이터를 설정하는 테스트
      const singleton = BadSingleton.getInstance();

      singleton.setData("key1", "value1");
      singleton.setData("key2", "value2");
      singleton.setData("key3", "value3");

      expect(singleton.getData("key1")).toBe("value1");
      expect(singleton.getData("key2")).toBe("value2");
      expect(singleton.getData("key3")).toBe("value3");
    });
  });

  describe("실습 8: 전역 상태 관리 테스트", () => {
    it("❌ 나쁜 예시 - 전역 상태를 정리하지 않는 테스트", () => {
      const config = { environment: "test", apiUrl: "http://test.com" };

      badService.setGlobalConfig(config);

      expect((global as any).APP_CONFIG).toEqual(config);
      // 전역 상태를 정리하지 않아서 다른 테스트에 영향을 줄 수 있음
    });

    it("실습 8-1 정답 - 전역 상태를 정리하는 테스트", () => {
      // 실습 8-1 정답: 테스트 후 전역 상태를 정리
      const config = { environment: "test", apiUrl: "http://test.com" };

      badService.setGlobalConfig(config);

      expect((global as any).APP_CONFIG).toEqual(config);

      // 테스트 후 정리
      delete (global as any).APP_CONFIG;

      // 정리되었는지 확인
      expect((global as any).APP_CONFIG).toBeUndefined();
    });

    it("실습 8-1 검증 - beforeEach로 깨끗한 상태 확인", () => {
      // beforeEach에서 전역 상태가 정리되므로 깨끗한 상태에서 시작
      expect((global as any).APP_CONFIG).toBeUndefined();
      expect((global as any).USER_COUNT).toBeUndefined();
    });
  });

  describe("보너스: 추가 개선 패턴들", () => {
    it("에러 처리 테스트 - 안전한 JSON 파싱", () => {
      // 에러 처리가 부족한 함수 테스트
      expect(() => {
        badUtilities.unsafeJsonParse("invalid json");
      }).toThrow();

      // 정상적인 JSON은 파싱되어야 함
      const validJson = '{"key": "value"}';
      expect(badUtilities.unsafeJsonParse(validJson)).toEqual({ key: "value" });
    });

    it("비동기 함수 테스트 - 잘못된 Promise 처리", async () => {
      // 잘못된 비동기 처리를 하는 함수 테스트
      const result = await badUtilities.badAsyncFunction(100);

      // 이 함수는 실제로는 제대로 기다리지 않지만 테스트에서는 결과를 확인
      expect(result).toBe("Completed");
    });

    it("Mock을 사용한 외부 의존성 제거 - 파일 저장", async () => {
      // 파일 시스템 의존성을 제거한 테스트
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      await saveToFile("test.txt", "test content");

      expect(consoleSpy).toHaveBeenCalledWith("Saving to test.txt:", "test content");

      consoleSpy.mockRestore();
    });

    it("네트워크 요청 Mock - 알림 발송", async () => {
      // 외부 네트워크 요청을 mock으로 대체
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockResolvedValueOnce({
        ok: true,
      } as Response);

      const result = await sendNotification("Test message", 123);

      expect(result).toBe(true);
      expect(mockFetch).toHaveBeenCalledWith("https://api.notification-service.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Test message", userId: 123 }),
      });
    });

    it("네트워크 요청 실패 처리", async () => {
      // 네트워크 실패 시나리오 테스트
      const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
      mockFetch.mockRejectedValueOnce(new Error("Network failed"));

      const consoleSpy = jest.spyOn(console, "error").mockImplementation();

      const result = await sendNotification("Test message", 123);

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith("Notification failed:", expect.any(Error));

      consoleSpy.mockRestore();
    });
  });
});

/**
 * 정답 파일 학습 포인트:
 *
 * ✅ 개선된 테스트 패턴들:
 * 1. 구현 세부사항 대신 결과에 집중
 * 2. Mock과 Fake Timer로 외부 의존성 제거
 * 3. 단일 책임으로 테스트 분리
 * 4. beforeEach로 테스트 독립성 확보
 * 5. 명확한 테스트 이름과 의도
 * 6. Mock으로 비결정적 요소 제거
 * 7. 적절한 setup/teardown으로 부작용 방지
 * 8. 전역 상태 관리와 정리
 *
 * 🎯 핵심 원칙:
 * - F.I.R.S.T 원칙 준수
 * - AAA 패턴 (Arrange, Act, Assert)
 * - 테스트는 문서 역할도 해야 함
 * - 실패 시 원인을 쉽게 파악할 수 있어야 함
 * - 유지보수 가능한 테스트 작성
 */
