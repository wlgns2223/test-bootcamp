/**
 * 나쁜 테스트 케이스들 - 설명용
 *
 * 이 파일은 피해야 할 나쁜 테스트 작성 패턴들을 보여줍니다.
 * 각 섹션에서 나쁜 예시와 좋은 예시를 함께 제시하여 학습합니다.
 *
 * 학습 목표:
 * 1. 취약한 테스트 (Fragile Tests)
 * 2. 느린 테스트 (Slow Tests)
 * 3. 복잡한 테스트 (Complex Tests)
 * 4. 중복된 테스트 (Duplicated Tests)
 * 5. 의존성이 강한 테스트 (Tightly Coupled Tests)
 * 6. 불명확한 테스트 (Unclear Tests)
 * 7. 사이드 이펙트가 있는 테스트
 * 8. 비결정적 테스트 (Flaky Tests)
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

describe("❌ 나쁜 테스트 케이스들 - 피해야 할 패턴", () => {
  let badService: BadExampleService;

  beforeEach(() => {
    badService = new BadExampleService();
    jest.clearAllMocks();
    // 전역 상태 초기화
    delete (global as any).APP_CONFIG;
    delete (global as any).USER_COUNT;
  });

  describe("🚨 안티패턴 1: 취약한 테스트 (Fragile Tests)", () => {
    describe("❌ 나쁜 예시: 구현 세부사항에 의존", () => {
      it("나쁜 예시 - 내부 구현에 의존하는 테스트", () => {
        // ❌ 문제점: 내부 구현 방식에 너무 의존적
        // 함수가 호출되는 순서나 내부 로직이 바뀌면 테스트가 깨짐

        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        badService.addUser({ name: "John", email: "john@test.com" });

        // 내부 로깅 구현에 의존
        expect(consoleSpy).toHaveBeenCalledWith("Adding user: John");

        consoleSpy.mockRestore();
      });

      it("나쁜 예시 - 하드코딩된 값에 의존", () => {
        // ❌ 문제점: 매직 넘버와 하드코딩된 값들
        const result = calculateTax(1000);

        // 세율이 변경되면 테스트가 깨짐
        expect(result).toBe(100); // 10% 세율에 의존
      });
    });

    describe("✅ 좋은 예시: 행동과 결과에 집중", () => {
      it("좋은 예시 - 결과에 집중하는 테스트", () => {
        // ✅ 개선점: 구현 방식이 아닌 결과에 집중

        const initialCount = badService.getUserCount();

        badService.addUser({ name: "John", email: "john@test.com" });

        // 내부 구현이 어떻든 사용자가 추가되었는지만 확인
        expect(badService.getUserCount()).toBe(initialCount + 1);
        expect(badService.getUsers()).toContainEqual(expect.objectContaining({ name: "John", email: "john@test.com" }));
      });

      it("좋은 예시 - 설정 가능한 테스트", () => {
        // ✅ 개선점: 테스트 데이터를 명확하게 설정
        const price = 1000;
        const expectedTaxRate = 0.1; // 세율을 명시적으로 표현

        const result = calculateTax(price);

        expect(result).toBe(price * expectedTaxRate);
      });
    });
  });

  describe("🐌 안티패턴 2: 느린 테스트 (Slow Tests)", () => {
    describe("❌ 나쁜 예시: 불필요한 지연과 실제 네트워크 호출", () => {
      it("나쁜 예시 - 실제 네트워크 호출", async () => {
        // ❌ 문제점: 실제 외부 API 호출로 인한 느린 테스트
        // 네트워크 상태, 외부 서비스 상태에 의존적

        // 이 테스트는 실제로 실행하면 매우 느립니다
        // await expect(badService.fetchUserData(1)).resolves.toBeDefined();

        // 대신 mock을 사용한 예시
        const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: 1, name: "Test User" }),
        } as Response);

        const result = await badService.fetchUserData(1);
        expect(result).toEqual({ id: 1, name: "Test User" });
      });

      it("나쁜 예시 - 불필요한 setTimeout", (done) => {
        // ❌ 문제점: 실제 시간 지연을 사용하는 테스트

        let result = "";

        setTimeout(() => {
          result = "delayed result";
          expect(result).toBe("delayed result");
          done();
        }, 1000); // 1초 지연 - 테스트를 느리게 만듦
      });
    });

    describe("✅ 좋은 예시: Mock과 Fake Timer 사용", () => {
      it("좋은 예시 - Mock을 사용한 빠른 테스트", async () => {
        // ✅ 개선점: Mock을 사용하여 외부 의존성 제거

        const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: 1, name: "Test User", email: "test@example.com" }),
        } as Response);

        const result = await badService.fetchUserData(1);

        expect(result).toEqual({
          id: 1,
          name: "Test User",
          email: "test@example.com",
        });
        expect(mockFetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1");
      });

      it("좋은 예시 - Fake Timer 사용", () => {
        // ✅ 개선점: Jest의 fake timer로 시간 제어

        jest.useFakeTimers();

        let result = "";

        setTimeout(() => {
          result = "delayed result";
        }, 1000);

        // 시간을 인위적으로 앞당김
        jest.advanceTimersByTime(1000);

        expect(result).toBe("delayed result");

        jest.useRealTimers();
      });
    });
  });

  describe("🧩 안티패턴 3: 복잡한 테스트 (Complex Tests)", () => {
    describe("❌ 나쁜 예시: 하나의 테스트에서 너무 많은 것을 테스트", () => {
      it("나쁜 예시 - 모든 것을 한 번에 테스트", () => {
        // ❌ 문제점: 한 테스트에서 너무 많은 것을 검증
        // 실패 시 어느 부분이 문제인지 파악하기 어려움

        const userData = {
          email: "test@example.com",
          password: "password123",
          sendWelcomeEmail: true,
        };

        const consoleSpy = jest.spyOn(console, "log").mockImplementation();

        const result = badService.processUserRegistration(userData);

        // 너무 많은 것을 한 번에 검증
        expect(result).toContain("User test@example.com registered successfully");
        expect(result).toContain("Welcome email sent");
        expect(badService.getUserCount()).toBe(1);
        expect(consoleSpy).toHaveBeenCalledWith("User registered:", "test@example.com");
        expect(consoleSpy).toHaveBeenCalledWith("Sending welcome email to:", "test@example.com");
        expect((global as any).USER_COUNT).toBe(1);

        consoleSpy.mockRestore();
      });
    });

    describe("✅ 좋은 예시: 단일 책임 테스트", () => {
      it("좋은 예시 - 사용자 등록 기능만 테스트", () => {
        // ✅ 개선점: 핵심 기능에만 집중

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

      it("좋은 예시 - 이메일 발송 기능만 테스트", () => {
        // ✅ 개선점: 이메일 기능을 별도로 테스트

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

      it("좋은 예시 - 검증 로직만 테스트", () => {
        // ✅ 개선점: 검증 로직을 별도로 테스트

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
  });

  describe("🔄 안티패턴 4: 중복된 테스트 (Duplicated Tests)", () => {
    describe("❌ 나쁜 예시: 같은 것을 반복 테스트", () => {
      it("나쁜 예시 - 중복 테스트 1", () => {
        // ❌ 문제점: 동일한 로직을 반복 테스트
        const id1 = badService.getNextId();
        const id2 = badService.getNextId();
        expect(id2).toBe(id1 + 1);
      });

      it("나쁜 예시 - 중복 테스트 2", () => {
        // ❌ 같은 로직을 다시 테스트
        const firstId = badService.getNextId();
        const secondId = badService.getNextId();
        expect(secondId).toBeGreaterThan(firstId);
      });

      it("나쁜 예시 - 중복 테스트 3", () => {
        // ❌ 또 같은 로직...
        expect(badService.getNextId()).toBe(1);
        expect(badService.getNextId()).toBe(2);
      });
    });

    describe("✅ 좋은 예시: 다양한 시나리오 테스트", () => {
      it("좋은 예시 - ID 증가 동작 테스트", () => {
        // ✅ 개선점: 핵심 동작을 명확하게 테스트
        const initialId = badService.getNextId();
        const nextId = badService.getNextId();

        expect(nextId).toBe(initialId + 1);
      });

      it("좋은 예시 - 여러 ID 생성 시퀀스 테스트", () => {
        // ✅ 개선점: 다른 관점에서 테스트 (시퀀스 검증)
        const ids = [badService.getNextId(), badService.getNextId(), badService.getNextId()];

        expect(ids).toEqual([1, 2, 3]);
      });

      it("좋은 예시 - 리셋 후 ID 동작 테스트", () => {
        // ✅ 개선점: 다른 시나리오 (리셋 기능)
        badService.getNextId(); // 1
        badService.getNextId(); // 2

        badService.reset();

        expect(badService.getNextId()).toBe(1); // 다시 1부터 시작
      });
    });
  });

  describe("🔗 안티패턴 5: 의존성이 강한 테스트", () => {
    describe("❌ 나쁜 예시: 테스트 간 의존성", () => {
      it("나쁜 예시 - 첫 번째 테스트", () => {
        // ❌ 문제점: 다음 테스트가 이 테스트 결과에 의존
        badService.addUser({ name: "John", email: "john@test.com" });
        expect(badService.getUserCount()).toBe(1);
      });

      it.skip("나쁜 예시 - 두 번째 테스트 (첫 번째 테스트에 의존)", () => {
        // ❌ 첫 번째 테스트가 실행되어야만 성공하는 테스트
        // 테스트 순서가 바뀌거나 첫 번째 테스트가 실패하면 이 테스트도 실패
        // 이 테스트는 의도적으로 실패를 보여주기 위한 예시이므로 skip 처리
        expect(badService.getUserCount()).toBe(1);

        badService.addUser({ name: "Jane", email: "jane@test.com" });
        expect(badService.getUserCount()).toBe(2);
      });
    });

    describe("✅ 좋은 예시: 독립적인 테스트", () => {
      it("좋은 예시 - 독립적인 첫 번째 테스트", () => {
        // ✅ 개선점: 각 테스트가 독립적으로 동작
        badService.addUser({ name: "John", email: "john@test.com" });
        expect(badService.getUserCount()).toBe(1);
      });

      it("좋은 예시 - 독립적인 두 번째 테스트", () => {
        // ✅ 이 테스트는 다른 테스트와 무관하게 동작
        // beforeEach에서 badService가 초기화되므로 독립적
        expect(badService.getUserCount()).toBe(0);

        badService.addUser({ name: "Jane", email: "jane@test.com" });
        expect(badService.getUserCount()).toBe(1);
      });
    });
  });

  describe("❓ 안티패턴 6: 불명확한 테스트", () => {
    describe("❌ 나쁜 예시: 의도가 불분명한 테스트", () => {
      it("나쁜 예시 - 무엇을 테스트하는지 불분명", () => {
        // ❌ 문제점: 테스트 의도가 불분명
        const result = badUtilities.complexCalculation([1, 2, 3]);
        expect(result).toBeGreaterThan(0);
        // 왜 0보다 커야 하는지, 정확히 무엇을 검증하는지 불분명
      });

      it("test1", () => {
        // ❌ 문제점: 테스트 이름이 의미가 없음
        const user = { name: "test", email: "test@test.com" };
        badService.addUser(user);
        expect(badService.getUsers().length).toBe(1);
      });
    });

    describe("✅ 좋은 예시: 명확한 의도의 테스트", () => {
      it("좋은 예시 - 양수 배열 입력 시 양수 결과 반환", () => {
        // ✅ 개선점: 테스트 의도가 명확
        // Mock을 사용해 예측 가능하게 만듦
        const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

        const positiveNumbers = [1, 2, 3];
        const result = badUtilities.complexCalculation(positiveNumbers);

        // 예상 결과: (1 * 0.5) + (2 * 0.5) + (3 * 0.5) = 3
        expect(result).toBe(3);

        mathRandomSpy.mockRestore();
      });

      it("사용자 추가 시 사용자 목록에 새 사용자가 포함되어야 한다", () => {
        // ✅ 개선점: 테스트 이름이 의도를 명확히 표현
        const newUser = { name: "Alice", email: "alice@example.com" };

        badService.addUser(newUser);

        const users = badService.getUsers();
        expect(users).toContainEqual(expect.objectContaining(newUser));
      });
    });
  });

  describe("💥 안티패턴 7: 사이드 이펙트가 있는 테스트", () => {
    describe("❌ 나쁜 예시: 전역 상태 변경", () => {
      it("나쁜 예시 - 전역 상태를 변경하는 테스트", () => {
        // ❌ 문제점: 전역 상태를 변경하여 다른 테스트에 영향
        const config = { environment: "test", apiUrl: "http://test.com" };

        badService.setGlobalConfig(config);

        expect((global as any).APP_CONFIG).toEqual(config);
        // 이 테스트 후 전역 상태가 변경되어 다른 테스트에 영향을 줄 수 있음
      });
    });

    describe("✅ 좋은 예시: 부작용 격리", () => {
      it("좋은 예시 - 전역 상태를 정리하는 테스트", () => {
        // ✅ 개선점: 테스트 후 상태를 정리
        const config = { environment: "test", apiUrl: "http://test.com" };

        badService.setGlobalConfig(config);

        expect((global as any).APP_CONFIG).toEqual(config);

        // 테스트 후 정리
        delete (global as any).APP_CONFIG;
      });

      it("좋은 예시 - beforeEach/afterEach 사용", () => {
        // beforeEach에서 이미 전역 상태를 정리하므로
        // 이 테스트는 깨끗한 상태에서 시작됨
        expect((global as any).APP_CONFIG).toBeUndefined();
      });
    });
  });

  describe("🎲 안티패턴 8: 비결정적 테스트 (Flaky Tests)", () => {
    describe("❌ 나쁜 예시: 예측 불가능한 결과", () => {
      it("나쁜 예시 - 랜덤 값에 의존하는 테스트", () => {
        // ❌ 문제점: 랜덤 값 때문에 때때로 실패할 수 있음
        const password1 = badService.generateRandomPassword();
        const password2 = badService.generateRandomPassword();

        // 이 테스트는 매우 낮은 확률로 실패할 수 있음
        expect(password1).not.toBe(password2);
        expect(password1).toHaveLength(12);
      });

      it("나쁜 예시 - 시간에 의존하는 테스트", () => {
        // ❌ 문제점: 실행 시간에 따라 결과가 달라질 수 있음
        const message = badService.getCurrentTimeMessage();

        // 테스트 실행 시간에 따라 결과가 달라짐
        expect(["Good morning!", "Good afternoon!", "Good evening!"]).toContain(message);
      });
    });

    describe("✅ 좋은 예시: 예측 가능한 테스트", () => {
      it("좋은 예시 - Math.random Mock 사용", () => {
        // ✅ 개선점: 랜덤 함수를 mock하여 예측 가능하게 만듦
        const mockRandom = jest.spyOn(Math, "random");

        // 특정 패턴으로 랜덤 값 설정
        mockRandom
          .mockReturnValueOnce(0.0) // 'A' 선택
          .mockReturnValueOnce(0.1) // 'G' 선택
          .mockReturnValueOnce(0.2); // 'M' 선택

        const password = badService.generateRandomPassword();

        // 예측 가능한 결과
        expect(password).toHaveLength(12);
        expect(password.startsWith("AGM")); // 처음 3글자 예측 가능

        mockRandom.mockRestore();
      });

      it("좋은 예시 - Date Mock 사용", () => {
        // ✅ 개선점: 시간을 고정하여 예측 가능하게 만듦
        // 실제로는 이런 시간 의존적인 함수는 시간을 주입받도록 리팩토링하는 것이 좋습니다

        // Mock으로 10시에 고정
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2023-01-01T10:00:00"));

        const message = badService.getCurrentTimeMessage();

        expect(message).toBe("Good morning!");

        jest.useRealTimers();
      });
    });
  });

  describe("🏗️ 안티패턴 9: 싱글톤과 정적 의존성", () => {
    describe("❌ 나쁜 예시: 싱글톤 테스트의 어려움", () => {
      it("나쁜 예시 - 싱글톤 상태가 다른 테스트에 영향", () => {
        // ❌ 문제점: 싱글톤 인스턴스가 테스트 간 공유됨
        const singleton = BadSingleton.getInstance();
        singleton.setData("testKey", "testValue");

        expect(singleton.getData("testKey")).toBe("testValue");
        // 이 상태가 다른 테스트에도 영향을 줄 수 있음
      });

      it("나쁜 예시 - 이전 테스트의 영향을 받는 테스트", () => {
        // ❌ 이전 테스트에서 설정한 값이 남아있을 수 있음
        const singleton = BadSingleton.getInstance();

        // 이전 테스트에서 설정한 값이 있을 수도 있고 없을 수도 있음
        const value = singleton.getData("testKey");
        // 이런 상황은 테스트를 불안정하게 만듦
      });
    });

    describe("✅ 좋은 예시: 싱글톤 상태 관리", () => {
      beforeEach(() => {
        // 각 테스트 전에 싱글톤 상태 초기화
        BadSingleton.reset();
      });

      it("좋은 예시 - 깨끗한 상태에서 시작하는 테스트", () => {
        // ✅ 개선점: 각 테스트가 깨끗한 상태에서 시작
        const singleton = BadSingleton.getInstance();

        expect(singleton.getData("nonExistentKey")).toBeUndefined();

        singleton.setData("newKey", "newValue");
        expect(singleton.getData("newKey")).toBe("newValue");
      });

      it("좋은 예시 - 독립적인 싱글톤 테스트", () => {
        // ✅ 이 테스트도 깨끗한 상태에서 시작
        const singleton = BadSingleton.getInstance();

        singleton.setData("anotherKey", "anotherValue");
        expect(singleton.getData("anotherKey")).toBe("anotherValue");
        expect(singleton.getData("newKey")).toBeUndefined(); // 이전 테스트 영향 없음
      });
    });
  });
});

/**
 * 핵심 학습 포인트:
 *
 * 🚫 피해야 할 나쁜 테스트 패턴:
 * 1. 구현 세부사항에 의존하는 테스트
 * 2. 외부 시스템에 의존하는 느린 테스트
 * 3. 한 번에 너무 많은 것을 테스트하는 복잡한 테스트
 * 4. 같은 것을 반복하는 중복된 테스트
 * 5. 테스트 간 의존성이 있는 테스트
 * 6. 의도가 불명확한 테스트
 * 7. 전역 상태를 변경하는 테스트
 * 8. 랜덤/시간에 의존하는 비결정적 테스트
 * 9. 싱글톤 등 정적 의존성 관리 부족
 *
 * ✅ 좋은 테스트 작성 원칙:
 * 1. F.I.R.S.T 원칙 (Fast, Independent, Repeatable, Self-validating, Timely)
 * 2. AAA 패턴 (Arrange, Act, Assert)
 * 3. 단일 책임 원칙
 * 4. Mock과 Stub 적절한 사용
 * 5. 명확한 테스트 이름과 의도
 * 6. 테스트 간 독립성 보장
 * 7. 예측 가능한 결과 보장
 * 8. 적절한 setup/teardown
 */
