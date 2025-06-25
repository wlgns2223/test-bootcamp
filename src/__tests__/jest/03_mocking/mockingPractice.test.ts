// 🎯 Jest Mocking과 Spy 완전 정복 - 기본 개념 학습
// 신입 프론트엔드 개발자가 반드시 알아야 할 Mock과 Spy 핵심 개념을 마스터하세요!

import {
  UserService,
  EmailService,
  NotificationService,
  Calculator,
  OrderService,
  apiClient,
  emailService,
  utils,
  fileSystem,
} from "../../../utils/mockingPractice";

describe("🧪 Jest Mocking과 Spy 기본 개념", () => {
  beforeEach(() => {
    // 각 테스트 전에 모든 mock 초기화
    jest.clearAllMocks();
  });

  // ===== 1. Mock 함수 기본 개념 =====
  describe("🎭 Mock 함수 기본: jest.fn()", () => {
    it("Mock 함수는 호출 여부와 인자를 추적한다", () => {
      // Arrange: Mock 함수 생성
      const mockCallback = jest.fn();

      // Act: Mock 함수 호출
      mockCallback("첫번째 호출");
      mockCallback("두번째 호출", 123);

      // Assert: 호출 검증
      expect(mockCallback).toHaveBeenCalled(); // 호출되었는가?
      expect(mockCallback).toHaveBeenCalledTimes(2); // 몇 번 호출되었는가?
      expect(mockCallback).toHaveBeenCalledWith("첫번째 호출"); // 특정 인자로 호출되었는가?
      expect(mockCallback).toHaveBeenNthCalledWith(2, "두번째 호출", 123); // n번째 호출의 인자는?
    });

    it("Mock 함수는 반환값을 설정할 수 있다", () => {
      // Arrange
      const mockFunction = jest.fn();
      mockFunction.mockReturnValue("기본 반환값");

      // Act & Assert
      expect(mockFunction()).toBe("기본 반환값");
      expect(mockFunction()).toBe("기본 반환값");

      // 일회성 반환값 설정
      mockFunction.mockReturnValueOnce("한번만 반환");
      expect(mockFunction()).toBe("한번만 반환");
      expect(mockFunction()).toBe("기본 반환값"); // 다시 기본값으로
    });

    it("Mock 함수는 사용자 정의 구현을 가질 수 있다", () => {
      // Arrange
      const mockAdd = jest.fn((a: number, b: number) => a + b + 100); // 보너스 점수 추가

      // Act
      const result = mockAdd(5, 3);

      // Assert
      expect(result).toBe(108); // 5 + 3 + 100
      expect(mockAdd).toHaveBeenCalledWith(5, 3);
    });

    it("비동기 Mock 함수는 Promise를 반환할 수 있다", async () => {
      // Arrange
      const mockAsyncFunction = jest.fn();
      mockAsyncFunction.mockResolvedValue("비동기 성공 결과");

      // Act
      const result = await mockAsyncFunction("데이터");

      // Assert
      expect(result).toBe("비동기 성공 결과");
      expect(mockAsyncFunction).toHaveBeenCalledWith("데이터");

      // 에러 반환 테스트
      mockAsyncFunction.mockRejectedValue(new Error("비동기 에러"));
      await expect(mockAsyncFunction()).rejects.toThrow("비동기 에러");
    });
  });

  // ===== 2. Spy 기본 개념 =====
  describe("🕵️ Spy 기본: jest.spyOn()", () => {
    it("Spy는 기존 메서드를 감시하면서 원래 동작을 유지한다", () => {
      // Arrange
      const calculator = new Calculator();
      const addSpy = jest.spyOn(calculator, "add");

      // Act: 원래 동작 실행
      const result = calculator.add(2, 3);

      // Assert: 원래 결과 + spy 검증
      expect(result).toBe(5); // 원래 동작 확인
      expect(addSpy).toHaveBeenCalledWith(2, 3); // spy 호출 확인

      // Clean up
      addSpy.mockRestore();
    });

    it("Spy는 원래 동작을 변경할 수 있다", () => {
      // Arrange
      const calculator = new Calculator();
      const multiplySpy = jest.spyOn(calculator, "multiply");
      multiplySpy.mockReturnValue(999); // 원래 동작 대신 999 반환

      // Act
      const result = calculator.multiply(5, 10);

      // Assert
      expect(result).toBe(999); // 변경된 동작 확인
      expect(multiplySpy).toHaveBeenCalledWith(5, 10);

      // Clean up
      multiplySpy.mockRestore();
    });

    it("외부 함수도 spy할 수 있다 (console.log 예제)", () => {
      // Arrange: console.log를 spy로 만들어 실제 출력 방지
      const consoleSpy = jest.spyOn(console, "log").mockImplementation();

      // Act
      console.log("테스트 메시지", 123);

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith("테스트 메시지", 123);

      // Clean up
      consoleSpy.mockRestore();
    });

    it("유틸 함수도 spy할 수 있다", () => {
      // Arrange
      const generateIdSpy = jest.spyOn(utils, "generateId");
      generateIdSpy.mockReturnValue("test-id-123");

      // Act
      const id = utils.generateId();

      // Assert
      expect(id).toBe("test-id-123");
      expect(generateIdSpy).toHaveBeenCalled();

      // Clean up
      generateIdSpy.mockRestore();
    });
  });

  // ===== 3. 의존성 Mocking =====
  describe("🔌 의존성 Mocking: 외부 서비스 테스트", () => {
    it("API 클라이언트를 mocking하여 UserService 테스트", async () => {
      // Arrange: 가짜 API 클라이언트 생성
      const mockApiClient = {
        get: jest.fn().mockResolvedValue({
          id: 1,
          name: "김개발",
          email: "kim@test.com",
        }),
        post: jest.fn().mockResolvedValue({ success: true }),
      };

      // Act: 의존성을 주입하여 서비스 테스트
      const userService = new UserService(mockApiClient);
      const user = await userService.getUser(1);

      // Assert: 결과와 호출 확인
      expect(user.name).toBe("김개발");
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/users/1");
    });

    it("이메일 서비스를 mocking하여 알림 기능 테스트", async () => {
      // Arrange: 가짜 이메일 서비스
      const mockEmailService: EmailService = {
        sendEmail: jest.fn().mockResolvedValue(true),
        sendWelcomeEmail: jest.fn().mockResolvedValue(true),
      };

      // Act
      const success = await mockEmailService.sendEmail("test@example.com", "테스트 제목", "테스트 내용");

      // Assert
      expect(success).toBe(true);
      expect(mockEmailService.sendEmail).toHaveBeenCalledWith("test@example.com", "테스트 제목", "테스트 내용");
    });
  });

  // ===== 4. 복잡한 서비스 Mocking =====
  describe("🏗️ 복잡한 서비스 Mocking: 여러 의존성 조합", () => {
    it("알림 서비스는 사용자 서비스와 이메일 서비스를 함께 사용한다", async () => {
      // Arrange: 여러 의존성 mock 생성
      const mockEmailService: EmailService = {
        sendEmail: jest.fn().mockResolvedValue(true),
        sendWelcomeEmail: jest.fn().mockResolvedValue(true),
      };

      const mockUserService = {
        getUser: jest.fn().mockResolvedValue({
          id: 1,
          email: "user@test.com",
        }),
        updateUserActivity: jest.fn().mockResolvedValue({
          userId: 1,
          activity: "NOTIFICATION_SENT",
          timestamp: Date.now(),
        }),
        createUser: jest.fn(),
      };

      // Act: 모든 의존성을 주입하여 서비스 생성
      const notificationService = new NotificationService(mockEmailService, mockUserService as any);

      const result = await notificationService.sendUserNotification(1, "중요한 알림!");

      // Assert: 모든 단계가 올바르게 실행되었는지 확인
      expect(result).toBe(true);
      expect(mockUserService.getUser).toHaveBeenCalledWith(1);
      expect(mockEmailService.sendEmail).toHaveBeenCalledWith("user@test.com", "알림", "중요한 알림!");
      expect(mockUserService.updateUserActivity).toHaveBeenCalledWith(1, "NOTIFICATION_SENT");
    });

    it("주문 서비스는 사용자, 이메일, 유틸 서비스를 모두 사용한다", async () => {
      // Arrange: 모든 의존성 mock 설정
      const mockUserService = {
        getUser: jest.fn().mockResolvedValue({
          id: 1,
          email: "customer@test.com",
        }),
        updateUserActivity: jest.fn().mockResolvedValue({
          userId: 1,
          activity: "ORDER_CREATED",
          timestamp: Date.now(),
        }),
        createUser: jest.fn(),
      };

      const mockEmailService: EmailService = {
        sendEmail: jest.fn().mockResolvedValue(true),
        sendWelcomeEmail: jest.fn().mockResolvedValue(true),
      };

      const mockUtils = {
        generateId: jest.fn().mockReturnValue("order-123"),
        formatDate: jest.fn(),
        validateEmail: jest.fn(),
        delay: jest.fn(),
      };

      // Act
      const orderService = new OrderService(mockUserService as any, mockEmailService, mockUtils as any);

      const order = await orderService.createOrder(1, [{ name: "상품A", price: 10000, quantity: 2 }]);

      // Assert: 주문 생성 프로세스 전체 검증
      expect(order.id).toBe("order-123");
      expect(order.total).toBe(20000);
      expect(mockUserService.getUser).toHaveBeenCalledWith(1);
      expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
        "customer@test.com",
        "주문 확인",
        "주문 번호 order-123가 접수되었습니다."
      );
      expect(mockUserService.updateUserActivity).toHaveBeenCalledWith(1, "ORDER_CREATED");
    });
  });

  // ===== 5. 실시간 함수 Mocking =====
  describe("⏰ 실시간 함수 Mocking: 예측 가능한 테스트", () => {
    it("Date.now()를 고정하여 시간 의존적 코드 테스트", () => {
      // Arrange: 시간을 고정
      const fixedTime = 1609459200000; // 2021-01-01 00:00:00
      const dateNowSpy = jest.spyOn(Date, "now").mockReturnValue(fixedTime);

      // Act
      const timestamp = Date.now();

      // Assert
      expect(timestamp).toBe(fixedTime);

      // Clean up
      dateNowSpy.mockRestore();
    });

    it("Math.random()을 고정하여 랜덤 함수 테스트", () => {
      // Arrange: 랜덤값을 0.5로 고정
      const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

      // Act: ID 생성 (내부적으로 Math.random 사용)
      const id1 = utils.generateId();
      const id2 = utils.generateId();

      // Assert: 같은 랜덤값으로 같은 ID 생성됨
      expect(id1).toBe(id2);

      // Clean up
      mathRandomSpy.mockRestore();
    });
  });

  // ===== 6. 파일 시스템 Mocking =====
  describe("📁 파일 시스템 Mocking: 외부 리소스 테스트", () => {
    it("파일 읽기 성공 시나리오", async () => {
      // Arrange
      const readFileSpy = jest.spyOn(fileSystem, "readFile");
      readFileSpy.mockResolvedValue("파일 내용입니다");

      // Act
      const content = await fileSystem.readFile("test.txt");

      // Assert
      expect(content).toBe("파일 내용입니다");
      expect(readFileSpy).toHaveBeenCalledWith("test.txt");

      // Clean up
      readFileSpy.mockRestore();
    });

    it("파일 읽기 실패 시나리오", async () => {
      // Arrange
      const readFileSpy = jest.spyOn(fileSystem, "readFile");
      readFileSpy.mockRejectedValue(new Error("파일을 찾을 수 없습니다"));

      // Act & Assert
      await expect(fileSystem.readFile("missing.txt")).rejects.toThrow("파일을 찾을 수 없습니다");

      // Clean up
      readFileSpy.mockRestore();
    });
  });

  // ===== 7. Mock 상태 관리 =====
  describe("🧹 Mock 상태 관리: 테스트 격리와 정리", () => {
    it("Mock 호출 정보를 분석할 수 있다", () => {
      // Arrange
      const mockFunction = jest.fn();
      mockFunction.mockReturnValue("결과");

      // Act
      mockFunction("첫번째", "인자");
      mockFunction("두번째");
      mockFunction(123, true);

      // Assert: 호출 정보 분석
      expect(mockFunction.mock.calls).toHaveLength(3);
      expect(mockFunction.mock.calls[0]).toEqual(["첫번째", "인자"]);
      expect(mockFunction.mock.calls[1]).toEqual(["두번째"]);
      expect(mockFunction.mock.calls[2]).toEqual([123, true]);

      // 결과 정보 분석
      expect(mockFunction.mock.results).toHaveLength(3);
      expect(mockFunction.mock.results[0].value).toBe("결과");
    });

    it("Mock을 다양한 방법으로 초기화할 수 있다", () => {
      // Arrange
      const mockFunction = jest.fn();
      mockFunction.mockReturnValue("값");
      mockFunction("테스트");

      expect(mockFunction).toHaveBeenCalledTimes(1);

      // Act & Assert: 호출 기록만 초기화
      mockFunction.mockClear();
      expect(mockFunction).toHaveBeenCalledTimes(0);
      expect(mockFunction()).toBe("값"); // 반환값은 유지

      // 완전 초기화
      mockFunction.mockReset();
      expect(mockFunction).toHaveBeenCalledTimes(0);
      expect(mockFunction()).toBeUndefined(); // 반환값도 초기화
    });

    it("beforeEach에서 모든 mock을 초기화하여 테스트 격리", () => {
      // 이 테스트는 beforeEach의 jest.clearAllMocks() 덕분에
      // 이전 테스트의 mock 호출 기록이 영향을 주지 않음
      const mockFunction = jest.fn();

      expect(mockFunction).toHaveBeenCalledTimes(0); // 항상 0에서 시작
    });
  });

  // ===== 8. 실무 패턴 =====
  describe("💼 실무 패턴: 실제 프로젝트에서 자주 사용하는 패턴", () => {
    it("API 에러 상황 테스트", async () => {
      // Arrange: API 실패 시나리오
      const mockApiClient = {
        get: jest.fn().mockRejectedValue(new Error("네트워크 오류")),
        post: jest.fn(),
      };

      // Act & Assert
      const userService = new UserService(mockApiClient);
      await expect(userService.getUser(1)).rejects.toThrow("사용자를 찾을 수 없습니다");
    });

    it("조건부 mock 반환값으로 다양한 시나리오 테스트", () => {
      // Arrange: 조건에 따라 다른 값 반환
      const mockValidate = jest.fn((age: number) => {
        if (age < 0) throw new Error("나이는 음수일 수 없습니다");
        if (age < 18) return { valid: false, reason: "미성년자" };
        if (age > 100) return { valid: false, reason: "나이 범위 초과" };
        return { valid: true };
      });

      // Act & Assert: 다양한 케이스 테스트
      expect(mockValidate(25)).toEqual({ valid: true });
      expect(mockValidate(15)).toEqual({ valid: false, reason: "미성년자" });
      expect(mockValidate(150)).toEqual({
        valid: false,
        reason: "나이 범위 초과",
      });
      expect(() => mockValidate(-5)).toThrow("나이는 음수일 수 없습니다");
    });

    it("연속 호출에서 다른 값 반환하기", () => {
      // Arrange: 호출 순서에 따라 다른 값 반환
      const mockRetry = jest.fn();
      mockRetry
        .mockReturnValueOnce({ success: false, error: "첫 번째 실패" })
        .mockReturnValueOnce({ success: false, error: "두 번째 실패" })
        .mockReturnValueOnce({ success: true, data: "세 번째 성공" });

      // Act & Assert
      expect(mockRetry()).toEqual({ success: false, error: "첫 번째 실패" });
      expect(mockRetry()).toEqual({ success: false, error: "두 번째 실패" });
      expect(mockRetry()).toEqual({ success: true, data: "세 번째 성공" });
    });
  });
});

// 📝 모듈 모킹 학습을 위해서는 새로 분리된 파일들을 참고하세요:
// - moduleMockingPractice.test.ts: 모듈 모킹 메인 실습
// - moduleMockingPractice.template.test.ts: 모듈 모킹 템플릿 (TODO 포함)
// - moduleMockingPractice.completed.test.ts: 모듈 모킹 완성 답안
