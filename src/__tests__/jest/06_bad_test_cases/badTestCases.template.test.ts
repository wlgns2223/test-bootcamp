/**
 * 나쁜 테스트 케이스들 - 실습 템플릿
 *
 * 이 파일은 나쁜 테스트 패턴을 식별하고 개선하는 실습용입니다.
 * TODO 주석을 따라 나쁜 테스트를 좋은 테스트로 리팩토링해보세요.
 *
 * 실습 과제:
 * 1. 나쁜 테스트 패턴 식별하기
 * 2. 각 패턴의 문제점 이해하기
 * 3. 좋은 테스트로 리팩토링하기
 * 4. 테스트 독립성 확보하기
 * 5. Mock과 Stub 적절히 사용하기
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

describe("나쁜 테스트 케이스 개선 실습", () => {
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

    it("TODO: 실습 1-2 - 위의 나쁜 테스트를 개선하세요", () => {
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

    it("TODO: 실습 2-1 - 시간 지연 테스트를 개선하세요", () => {
      // TODO: 아래 주석을 해제하고 Jest의 fake timer를 사용해서 개선하세요
      // 힌트: jest.useFakeTimers(), jest.advanceTimersByTime() 사용

      /*
      let result = "";

      setTimeout(() => {
        result = "delayed result";
      }, 1000);

      // TODO: 여기에 fake timer 코드를 추가하세요
      // jest.useFakeTimers();
      // jest.advanceTimersByTime(1000);
      // expect(result).toBe("delayed result");
      // jest.useRealTimers();
      */

      // 임시로 통과하는 코드 (실습에서 위 코드를 완성하세요)
      expect(true).toBe(true);
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

    it("TODO: 실습 3-1 - 사용자 등록 기능만 테스트하세요", () => {
      // TODO: 사용자 등록의 핵심 기능만 테스트
      // 힌트: sendWelcomeEmail을 false로 설정하고 사용자 생성 부분만 검증

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

    it("TODO: 실습 3-2 - 이메일 발송 기능만 테스트하세요", () => {
      // TODO: 이메일 발송 기능만 별도로 테스트
      // 힌트: console.log 호출과 결과 메시지에서 이메일 관련 부분만 확인

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

    it("TODO: 실습 3-3 - 입력 검증 로직만 테스트하세요", () => {
      // TODO: 잘못된 이메일과 짧은 비밀번호에 대한 검증만 테스트
      // 힌트: expect().toThrow() 사용

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
      // 이는 의도적으로 실패하는 나쁜 예시입니다 (실습 목적으로 skip 처리)
      expect(badService.getUserCount()).toBe(1); // 이전 테스트 결과에 의존

      badService.addUser({ name: "Jane", email: "jane@test.com" });
      expect(badService.getUserCount()).toBe(2);
    });

    // TODO: 실습 4-1
    // 위의 두 테스트를 독립적으로 만드세요
    // 힌트: 각 테스트가 자신만의 초기 상태를 설정해야 합니다

    it("TODO: 실습 4-1a - 독립적인 첫 번째 테스트", () => {
      // 독립적으로 상태를 설정하고 테스트
      badService.reset(); // 깨끗한 상태에서 시작

      badService.addUser({ name: "John", email: "john@test.com" });
      expect(badService.getUserCount()).toBe(1);
    });

    it("TODO: 실습 4-1b - 독립적인 두 번째 테스트", () => {
      // 이 테스트도 독립적으로 상태를 설정
      badService.reset(); // 깨끗한 상태에서 시작

      // 이 테스트에서 필요한 초기 상태 설정
      badService.addUser({ name: "John", email: "john@test.com" });
      expect(badService.getUserCount()).toBe(1);

      badService.addUser({ name: "Jane", email: "jane@test.com" });
      expect(badService.getUserCount()).toBe(2);
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

    // TODO: 실습 5-1
    // 위의 테스트들을 명확하고 의미있게 만드세요

    it("TODO: 실습 5-1a - 양수 배열 입력 시 결과 예측하기", () => {
      // TODO: Math.random을 mock하여 예측 가능한 결과 만들기
      // 힌트: jest.spyOn(Math, 'random').mockReturnValue(0.5)

      const mathSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

      const result = badUtilities.complexCalculation([1, 2, 3]);

      // Math.random이 0.5로 고정되어 있으므로 결과 예측 가능
      // 1 * 0.5 + 2 * 0.5 + 3 * 0.5 = 3
      expect(result).toBe(3);

      mathSpy.mockRestore();
    });

    it("사용자 추가 시 사용자 목록에 새 사용자가 포함되어야 한다", () => {
      // TODO: 테스트 이름을 "사용자 추가 시 사용자 목록에 새 사용자가 포함되어야 한다"로 변경하고
      // 테스트 내용도 명확하게 개선하세요

      const initialCount = badService.getUserCount();
      const newUser = { name: "Alice", email: "alice@example.com" };

      badService.addUser(newUser);

      expect(badService.getUserCount()).toBe(initialCount + 1);
      expect(badService.getUsers()).toContainEqual(expect.objectContaining(newUser));
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

    // TODO: 실습 6-1
    // 위의 비결정적 테스트들을 예측 가능하게 만드세요

    it("TODO: 실습 6-1a - Math.random Mock으로 예측 가능한 패스워드 생성 테스트", () => {
      // TODO: Math.random을 mock하여 예측 가능한 패스워드 생성
      // 힌트: mockReturnValueOnce를 여러 번 사용하여 특정 패턴 만들기

      const mathSpy = jest
        .spyOn(Math, "random")
        .mockReturnValueOnce(0) // 첫 번째 문자: 'A'
        .mockReturnValueOnce(0) // 두 번째 문자: 'A'
        .mockReturnValueOnce(0) // 세 번째 문자: 'A'
        .mockReturnValueOnce(0) // 네 번째 문자: 'A'
        .mockReturnValueOnce(0) // 다섯 번째 문자: 'A'
        .mockReturnValueOnce(0) // 여섯 번째 문자: 'A'
        .mockReturnValueOnce(0) // 일곱 번째 문자: 'A'
        .mockReturnValueOnce(0) // 여덟 번째 문자: 'A'
        .mockReturnValueOnce(0) // 아홉 번째 문자: 'A'
        .mockReturnValueOnce(0) // 열 번째 문자: 'A'
        .mockReturnValueOnce(0) // 열한 번째 문자: 'A'
        .mockReturnValueOnce(0); // 열두 번째 문자: 'A'

      const password = badService.generateRandomPassword();

      expect(password).toBe("AAAAAAAAAAAA");
      expect(password).toHaveLength(12);

      mathSpy.mockRestore();
    });

    it("TODO: 실습 6-1b - Date Mock으로 시간 고정하기", () => {
      // TODO: 특정 시간(예: 오전 10시)으로 Date를 고정하여 테스트
      // 힌트: jest.spyOn(global, 'Date').mockImplementation()

      const mockDate = new Date("2023-01-01T10:00:00"); // 로컬 시간으로 오전 10시 설정
      const dateSpy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);

      const message = badService.getCurrentTimeMessage();

      expect(message).toBe("Good morning!");

      dateSpy.mockRestore();
    });
  });

  describe("실습 7: 싱글톤 테스트 개선하기", () => {
    // TODO: 실습 7-1
    // BadSingleton을 사용하는 독립적인 테스트들을 작성하세요
    // 각 테스트 전에 싱글톤 상태를 초기화해야 합니다

    beforeEach(() => {
      // TODO: 여기에 싱글톤 초기화 코드를 작성하세요
      // 힌트: BadSingleton.reset() 사용
      BadSingleton.reset();
    });

    it("TODO: 실습 7-1a - 깨끗한 상태에서 시작하는 테스트", () => {
      // TODO: 싱글톤이 초기 상태인지 확인하고 새 데이터 설정 테스트

      const singleton = BadSingleton.getInstance();

      // 초기 상태 확인 (데이터가 없어야 함)
      expect(singleton.getData("testKey")).toBeUndefined();

      // 새 데이터 설정
      singleton.setData("testKey", "testValue");
      expect(singleton.getData("testKey")).toBe("testValue");
    });

    it("TODO: 실습 7-1b - 이전 테스트에 영향받지 않는 독립적 테스트", () => {
      // TODO: 이 테스트도 깨끗한 상태에서 시작하는지 확인

      const singleton = BadSingleton.getInstance();

      // beforeEach에서 초기화되었으므로 이전 테스트 데이터가 없어야 함
      expect(singleton.getData("testKey")).toBeUndefined();

      // 다른 키로 데이터 설정
      singleton.setData("anotherKey", "anotherValue");
      expect(singleton.getData("anotherKey")).toBe("anotherValue");
    });
  });

  describe("실습 8: 전역 상태 관리 테스트", () => {
    it("❌ 나쁜 예시 - 전역 상태를 정리하지 않는 테스트", () => {
      const config = { environment: "test", apiUrl: "http://test.com" };

      badService.setGlobalConfig(config);

      expect((global as any).APP_CONFIG).toEqual(config);
      // 전역 상태를 정리하지 않아서 다른 테스트에 영향을 줄 수 있음
    });

    it("TODO: 실습 8-1 - 전역 상태를 정리하는 테스트로 개선", () => {
      // TODO: 위의 테스트를 개선하여 테스트 후 전역 상태를 정리하세요
      // 힌트: 테스트 마지막에 delete (global as any).APP_CONFIG

      const config = { environment: "test", apiUrl: "http://test.com" };

      badService.setGlobalConfig(config);

      expect((global as any).APP_CONFIG).toEqual(config);

      // ✅ 개선점: 테스트 후 전역 상태 정리
      delete (global as any).APP_CONFIG;

      // 정리되었는지 확인
      expect((global as any).APP_CONFIG).toBeUndefined();
    });
  });
});

/**
 * 실습 완료 체크리스트:
 *
 * □ 1-1: 전역 상태 초기화 (beforeEach)
 * □ 1-2: 구현 세부사항 대신 결과에 집중하는 테스트
 * □ 2-1: fake timer를 사용한 시간 지연 테스트 개선
 * □ 3-1: 사용자 등록 기능만 테스트
 * □ 3-2: 이메일 발송 기능만 테스트
 * □ 3-3: 입력 검증 로직만 테스트
 * □ 4-1a: 독립적인 첫 번째 테스트
 * □ 4-1b: 독립적인 두 번째 테스트
 * □ 5-1a: Math.random mock을 사용한 예측 가능한 테스트
 * □ 5-1b: 의미있는 이름의 테스트
 * □ 6-1a: 예측 가능한 패스워드 생성 테스트
 * □ 6-1b: Date mock을 사용한 시간 고정 테스트
 * □ 7-1a: 싱글톤 초기 상태 테스트
 * □ 7-1b: 싱글톤 독립성 테스트
 * □ 8-1: 전역 상태 정리 테스트
 *
 * 실습 완료 후 정답 파일과 비교해보세요!
 */
