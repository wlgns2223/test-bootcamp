/**
 * Jest Mocking과 Spy 설명용 예제
 *
 * 이 파일은 Jest의 mock과 spy 기능을 설명하기 위한 교육용 예제입니다.
 * 각 개념을 단계별로 설명하고 실제 사용법을 보여줍니다.
 */

import {
  UserService,
  apiClient,
  emailService,
  Calculator,
  utils,
} from "../utils/mockingPractice";

describe("Jest Mocking과 Spy 기본 개념", () => {
  describe("1. Mock 함수 기본 사용법", () => {
    it("jest.fn()으로 mock 함수 생성하기", () => {
      // Mock 함수 생성
      const mockFunction = jest.fn();

      // Mock 함수 호출
      mockFunction("hello", 123);
      mockFunction("world");

      // Mock 함수 호출 검증
      expect(mockFunction).toHaveBeenCalled(); // 호출되었는지 확인
      expect(mockFunction).toHaveBeenCalledTimes(2); // 몇 번 호출되었는지 확인
      expect(mockFunction).toHaveBeenCalledWith("hello", 123); // 특정 인자로 호출되었는지 확인
      expect(mockFunction).toHaveBeenNthCalledWith(2, "world"); // n번째 호출의 인자 확인
    });

    it("mock 함수에 반환값 설정하기", () => {
      const mockFunction = jest.fn();

      // 반환값 설정
      mockFunction.mockReturnValue("mocked value");
      expect(mockFunction()).toBe("mocked value");

      // 일회성 반환값 설정
      mockFunction.mockReturnValueOnce("once value");
      mockFunction.mockReturnValueOnce("second value");

      expect(mockFunction()).toBe("once value");
      expect(mockFunction()).toBe("second value");
      expect(mockFunction()).toBe("mocked value"); // 기본값으로 돌아감
    });

    it("mock 함수에 구현체 설정하기", () => {
      const mockFunction = jest.fn();

      // 구현체 설정
      mockFunction.mockImplementation((x: number, y: number) => x + y);

      expect(mockFunction(2, 3)).toBe(5);
      expect(mockFunction).toHaveBeenCalledWith(2, 3);
    });

    it("비동기 mock 함수", async () => {
      const mockAsyncFunction = jest.fn();

      // 비동기 반환값 설정
      mockAsyncFunction.mockResolvedValue("async result");

      const result = await mockAsyncFunction();
      expect(result).toBe("async result");

      // 에러 반환 설정
      mockAsyncFunction.mockRejectedValue(new Error("async error"));

      await expect(mockAsyncFunction()).rejects.toThrow("async error");
    });
  });

  describe("2. 모듈 Mocking", () => {
    // 외부 모듈을 mock하는 예제
    beforeEach(() => {
      // 각 테스트 전에 mock 초기화
      jest.clearAllMocks();
    });

    it("전체 모듈 mocking - jest.mock()", () => {
      // 이 방법은 파일 상단에서 선언해야 함
      // jest.mock('../utils/mockingPractice');

      // 실제 사용 예제는 별도 파일에서 확인
      console.log("전체 모듈 mock은 파일 상단에서 jest.mock()으로 선언");
    });

    it("부분적 모듈 mocking - jest.spyOn()", () => {
      // utils 객체의 generateId 메서드만 mock
      const generateIdSpy = jest.spyOn(utils, "generateId");
      generateIdSpy.mockReturnValue("mocked-id");

      const result = utils.generateId();
      expect(result).toBe("mocked-id");
      expect(generateIdSpy).toHaveBeenCalled();

      // 원래 구현으로 복원
      generateIdSpy.mockRestore();
    });
  });

  describe("3. Spy 기본 사용법", () => {
    it("기존 함수/메서드를 spy로 감시하기", () => {
      const calculator = new Calculator();

      // add 메서드를 spy로 감시
      const addSpy = jest.spyOn(calculator, "add");

      const result = calculator.add(2, 3);

      expect(result).toBe(5); // 원래 동작 확인
      expect(addSpy).toHaveBeenCalledWith(2, 3); // spy 호출 확인
      expect(addSpy).toHaveBeenCalledTimes(1);

      addSpy.mockRestore(); // spy 제거
    });

    it("private 메서드 spy하기", () => {
      const calculator = new Calculator();

      // private 메서드에 접근하기 위해 any 타입 사용
      const recordOperationSpy = jest.spyOn(
        calculator as any,
        "recordOperation"
      );

      calculator.add(1, 2);

      expect(recordOperationSpy).toHaveBeenCalledWith("1 + 2 = 3");

      recordOperationSpy.mockRestore();
    });

    it("외부 의존성 spy하기", () => {
      // console.log를 spy로 감시
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      // Calculator의 private logActivity는 console.log를 사용하지 않으므로
      // 별도 예제로 직접 console.log 호출
      console.log("test message");

      expect(consoleSpy).toHaveBeenCalledWith("test message");

      consoleSpy.mockRestore();
    });
  });

  describe("4. 고급 Mocking 패턴", () => {
    it("의존성 주입된 객체 mocking", async () => {
      // apiClient를 mock으로 대체
      const mockApiClient = {
        get: jest
          .fn()
          .mockResolvedValue({ id: 1, name: "John", email: "john@test.com" }),
        post: jest.fn().mockResolvedValue({ success: true }),
      };

      // UserService에 mock된 apiClient 주입
      const userService = new UserService(mockApiClient);

      const user = await userService.getUser(1);

      expect(user).toEqual({ id: 1, name: "John", email: "john@test.com" });
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/users/1");
    });

    it("연쇄 호출 mocking", () => {
      const mockObject = {
        method1: jest.fn().mockReturnThis(),
        method2: jest.fn().mockReturnThis(),
        method3: jest.fn().mockReturnValue("final result"),
      };

      const result = mockObject.method1().method2().method3();

      expect(result).toBe("final result");
      expect(mockObject.method1).toHaveBeenCalled();
      expect(mockObject.method2).toHaveBeenCalled();
      expect(mockObject.method3).toHaveBeenCalled();
    });

    it("조건부 mock 반환값", () => {
      const mockFunction = jest.fn((x: number) => {
        if (x > 10) return "big";
        if (x > 5) return "medium";
        return "small";
      });

      expect(mockFunction(15)).toBe("big");
      expect(mockFunction(8)).toBe("medium");
      expect(mockFunction(3)).toBe("small");
    });
  });

  describe("5. Mock 상태 검증과 관리", () => {
    it("mock 호출 정보 확인하기", () => {
      const mockFunction = jest.fn();

      mockFunction("arg1", "arg2");
      mockFunction("arg3");

      // mock.calls: 모든 호출의 인자 배열
      expect(mockFunction.mock.calls).toEqual([["arg1", "arg2"], ["arg3"]]);

      // mock.results: 모든 호출의 결과
      expect(mockFunction.mock.results).toHaveLength(2);

      // mock.instances: 생성자 함수로 호출된 경우의 인스턴스들
      expect(mockFunction.mock.instances).toHaveLength(2);
    });

    it("mock 상태 초기화", () => {
      const mockFunction = jest.fn();

      mockFunction("test");
      expect(mockFunction).toHaveBeenCalledTimes(1);

      // 호출 기록만 초기화
      mockFunction.mockClear();
      expect(mockFunction).toHaveBeenCalledTimes(0);

      mockFunction("test2");
      mockFunction.mockReturnValue("value");

      // 호출 기록과 mock 구현 모두 초기화
      mockFunction.mockReset();
      expect(mockFunction).toHaveBeenCalledTimes(0);
      expect(mockFunction()).toBeUndefined(); // 반환값도 초기화됨

      // 원래 구현으로 완전 복원 (spy에서만 사용 가능)
      // mockFunction.mockRestore();
    });

    it("전역 mock 초기화", () => {
      const mock1 = jest.fn();
      const mock2 = jest.fn();

      mock1("test1");
      mock2("test2");

      // 모든 mock 초기화
      jest.clearAllMocks();

      expect(mock1).toHaveBeenCalledTimes(0);
      expect(mock2).toHaveBeenCalledTimes(0);
    });
  });
});
