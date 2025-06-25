/**
 * Jest Mocking과 Spy 실습 완성 답안
 *
 * 이 파일은 mocking과 spy 실습의 완성된 답안입니다.
 * 템플릿 파일과 비교해서 학습해보세요.
 */

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
  FileService,
  SecurityService,
  DataProcessingService,
  DateTimeService,
  BusinessService,
} from "../../../utils/mockingPractice";

describe("Jest Mocking과 Spy 실습 완성 답안", () => {
  beforeEach(() => {
    // 각 테스트 전에 모든 mock 초기화
    jest.clearAllMocks();
  });

  describe("1. Mock 함수 기본 실습", () => {
    it("mock 함수를 생성하고 호출 검증하기", () => {
      // jest.fn()으로 mock 함수 생성
      const mockCallback = jest.fn();

      // mock 함수를 다양한 인자로 여러 번 호출
      mockCallback("hello");
      mockCallback("world", 123);

      // 검증
      expect(mockCallback).toHaveBeenCalled(); // 함수가 호출되었는지 확인
      expect(mockCallback).toHaveBeenCalledTimes(2); // 함수가 2번 호출되었는지 확인
      expect(mockCallback).toHaveBeenCalledWith("hello"); // 특정 인자로 호출되었는지 확인
      expect(mockCallback).toHaveBeenNthCalledWith(2, "world", 123); // 두 번째 호출의 인자 확인
    });

    it("mock 함수에 반환값 설정하기", () => {
      // mock 함수 생성
      const mockFunction = jest.fn();

      // mockReturnValue를 사용해서 'success' 값을 반환하도록 설정
      mockFunction.mockReturnValue("success");

      // 함수를 호출하고 반환값이 'success'인지 확인
      expect(mockFunction()).toBe("success");

      // mockReturnValueOnce를 사용해서 한 번만 'once' 값을 반환하도록 설정
      mockFunction.mockReturnValueOnce("once");

      // 함수를 두 번 호출해서 첫 번째는 'once', 두 번째는 'success'가 반환되는지 확인
      expect(mockFunction()).toBe("once");
      expect(mockFunction()).toBe("success");
    });

    it("비동기 mock 함수 만들기", async () => {
      // 비동기 mock 함수 생성
      const mockAsyncFunction = jest.fn();

      // mockResolvedValue를 사용해서 'async success' 값을 반환하도록 설정
      mockAsyncFunction.mockResolvedValue("async success");

      // 함수를 await으로 호출하고 반환값 확인
      const result = await mockAsyncFunction();
      expect(result).toBe("async success");

      // mockRejectedValue를 사용해서 에러를 던지도록 설정
      mockAsyncFunction.mockRejectedValue(new Error("async error"));

      // expect().rejects.toThrow()를 사용해서 에러가 발생하는지 확인
      await expect(mockAsyncFunction()).rejects.toThrow("async error");
    });
  });

  describe("2. Spy 기본 실습", () => {
    it("기존 메서드를 spy로 감시하기", () => {
      const calculator = new Calculator();

      // jest.spyOn을 사용해서 calculator의 add 메서드를 spy로 만들기
      const addSpy = jest.spyOn(calculator, "add");

      // calculator.add(5, 3) 호출
      const result = calculator.add(5, 3);

      // 검증
      expect(result).toBe(8); // 결과가 8인지 확인
      expect(addSpy).toHaveBeenCalledWith(5, 3); // spy가 (5, 3) 인자로 호출되었는지 확인
      expect(addSpy).toHaveBeenCalledTimes(1); // spy가 1번 호출되었는지 확인

      // spy 복원 (mockRestore 사용)
      addSpy.mockRestore();
    });

    it("외부 의존성 spy하기", () => {
      // console.log를 spy로 만들고 실제 출력을 막기 (mockImplementation 사용)
      const consoleSpy = jest
        .spyOn(console, "log")
        .mockImplementation(() => {});

      // console.log('test message') 호출
      console.log("test message");

      // spy가 'test message'로 호출되었는지 확인
      expect(consoleSpy).toHaveBeenCalledWith("test message");

      // spy 복원
      consoleSpy.mockRestore();
    });

    it("utils 모듈의 메서드 spy하기", () => {
      // utils.generateId 메서드를 spy로 만들고 'test-id'를 반환하도록 설정
      const generateIdSpy = jest
        .spyOn(utils, "generateId")
        .mockReturnValue("test-id");

      // utils.generateId() 호출하고 'test-id'가 반환되는지 확인
      const result = utils.generateId();
      expect(result).toBe("test-id");
      expect(generateIdSpy).toHaveBeenCalled();

      // spy 복원
      generateIdSpy.mockRestore();
    });
  });

  describe("3. 의존성 주입 Mocking 실습", () => {
    it("UserService의 API 호출 mocking", async () => {
      // mockApiClient 객체 생성
      const mockApiClient = {
        get: jest.fn().mockResolvedValue({
          id: 1,
          name: "Test User",
          email: "test@example.com",
        }),
        post: jest.fn().mockResolvedValue({ success: true }),
      };

      // UserService에 mockApiClient를 주입해서 인스턴스 생성
      const userService = new UserService(mockApiClient);

      // userService.getUser(1) 호출
      const user = await userService.getUser(1);

      // 검증
      expect(user).toEqual({
        id: 1,
        name: "Test User",
        email: "test@example.com",
      }); // 반환된 사용자 정보가 올바른지 확인
      expect(mockApiClient.get).toHaveBeenCalledWith("/api/users/1"); // mockApiClient.get이 '/api/users/1'로 호출되었는지 확인
    });

    it("EmailService mocking", async () => {
      // mockEmailService 객체 생성
      const mockEmailService: EmailService = {
        sendEmail: jest.fn().mockResolvedValue(true),
        sendWelcomeEmail: jest.fn().mockResolvedValue(true),
      };

      // mockEmailService.sendEmail('test@example.com', 'Subject', 'Body') 호출
      const result = await mockEmailService.sendEmail(
        "test@example.com",
        "Subject",
        "Body"
      );

      // 검증
      expect(result).toBe(true); // 반환값이 true인지 확인
      expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
        "test@example.com",
        "Subject",
        "Body"
      ); // 올바른 인자로 호출되었는지 확인
    });
  });

  describe("4. 복합 서비스 Mocking 실습", () => {
    it("NotificationService의 종합 mocking", async () => {
      // mockEmailService 생성 (sendEmail이 true 반환)
      const mockEmailService: EmailService = {
        sendEmail: jest.fn().mockResolvedValue(true),
        sendWelcomeEmail: jest.fn().mockResolvedValue(true),
      };

      // mockUserService 생성
      const mockUserService = {
        getUser: jest.fn().mockResolvedValue({ id: 1, email: "user@test.com" }),
        updateUserActivity: jest.fn().mockResolvedValue({
          userId: 1,
          activity: "NOTIFICATION_SENT",
          timestamp: expect.any(Number),
        }),
        createUser: jest.fn(),
      };

      // NotificationService에 mock 서비스들을 주입해서 인스턴스 생성
      const notificationService = new NotificationService(
        mockEmailService,
        mockUserService as any
      );

      // notificationService.sendUserNotification(1, '테스트 메시지') 호출
      const result = await notificationService.sendUserNotification(
        1,
        "테스트 메시지"
      );

      // 검증
      expect(result).toBe(true); // 반환값이 true인지 확인
      expect(mockUserService.getUser).toHaveBeenCalledWith(1); // mockUserService.getUser가 1로 호출되었는지 확인
      expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
        "user@test.com",
        "알림",
        "테스트 메시지"
      ); // mockEmailService.sendEmail이 올바른 인자로 호출되었는지 확인
      expect(mockUserService.updateUserActivity).toHaveBeenCalledWith(
        1,
        "NOTIFICATION_SENT"
      ); // mockUserService.updateUserActivity가 호출되었는지 확인
    });

    it("OrderService의 복잡한 의존성 mocking", async () => {
      // 여러 의존성을 가진 OrderService 테스트
      const mockUserService = {
        getUser: jest.fn().mockResolvedValue({ id: 1, email: "user@test.com" }),
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
        generateId: jest.fn().mockReturnValue("test-order-id"),
        formatDate: jest.fn(),
        validateEmail: jest.fn(),
        delay: jest.fn(),
      };

      // OrderService에 mock 의존성들 주입
      const orderService = new OrderService(
        mockUserService as any,
        mockEmailService,
        mockUtils as any
      );

      const orderItems = [{ name: "테스트 상품", price: 10000, quantity: 1 }];

      // OrderService.createOrder 호출
      const order = await orderService.createOrder(1, orderItems);

      // 모든 의존성이 올바르게 호출되었는지 확인
      expect(order.id).toBe("test-order-id");
      expect(order.total).toBe(10000);
      expect(mockUserService.getUser).toHaveBeenCalledWith(1);
      expect(mockEmailService.sendEmail).toHaveBeenCalledWith(
        "user@test.com",
        "주문 확인",
        "주문 번호 test-order-id가 접수되었습니다."
      );
      expect(mockUserService.updateUserActivity).toHaveBeenCalledWith(
        1,
        "ORDER_CREATED"
      );
      expect(mockUtils.generateId).toHaveBeenCalled();
    });
  });

  describe("5. 파일 시스템 Mocking 실습", () => {
    it("파일 읽기 성공/실패 시나리오", async () => {
      // fileSystem.readFile을 spy로 만들기
      const readFileSpy = jest.spyOn(fileSystem, "readFile");

      // 첫 번째 호출에서는 '파일 내용'을 반환하도록 설정
      readFileSpy.mockResolvedValueOnce("파일 내용");

      // 두 번째 호출에서는 에러를 던지도록 설정
      readFileSpy.mockRejectedValueOnce(new Error("파일을 읽을 수 없습니다"));

      // 성공 케이스 테스트
      const content = await fileSystem.readFile("test.txt");
      expect(content).toBe("파일 내용");

      // 실패 케이스 테스트
      await expect(fileSystem.readFile("error.txt")).rejects.toThrow(
        "파일을 읽을 수 없습니다"
      );

      // spy 복원
      readFileSpy.mockRestore();
    });
  });

  describe("6. 실시간 함수 Mocking 실습", () => {
    it("Date.now() mocking", () => {
      // Date.now를 spy로 만들고 고정된 시간을 반환하도록 설정
      const dateNowSpy = jest.spyOn(Date, "now").mockReturnValue(1234567890000);

      // Date.now() 호출하고 설정한 값이 반환되는지 확인
      const timestamp = Date.now();
      expect(timestamp).toBe(1234567890000);

      // spy 복원
      dateNowSpy.mockRestore();
    });

    it("Math.random() mocking", () => {
      // Math.random을 spy로 만들고 0.5를 반환하도록 설정
      const mathRandomSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

      // utils.generateId() 호출했을 때 예측 가능한 값이 나오는지 확인
      const id1 = utils.generateId();
      const id2 = utils.generateId();
      expect(id1).toBe(id2); // Math.random이 항상 0.5를 반환하므로 같은 ID 생성

      // spy 복원
      mathRandomSpy.mockRestore();
    });
  });

  describe("7. Mock 상태 관리 실습", () => {
    it("mock 호출 정보 분석하기", () => {
      // mock 함수 생성
      const mockFunction = jest.fn();
      mockFunction.mockReturnValue("result");

      // 서로 다른 인자로 여러 번 호출
      mockFunction("arg1", "arg2");
      mockFunction("arg3");
      mockFunction(123, true);

      // mock.calls를 사용해서 호출 인자들 확인
      expect(mockFunction.mock.calls).toEqual([
        ["arg1", "arg2"],
        ["arg3"],
        [123, true],
      ]);

      // mock.results를 사용해서 호출 결과들 확인
      expect(mockFunction.mock.results).toHaveLength(3);
      expect(mockFunction.mock.results[0].value).toBe("result");
    });

    it("mock 초기화 실습", () => {
      // mock 함수를 생성하고 여러 번 호출
      const mockFunction = jest.fn();
      mockFunction("test1");
      mockFunction("test2");

      expect(mockFunction).toHaveBeenCalledTimes(2);

      // mockClear()를 사용해서 호출 기록을 초기화
      mockFunction.mockClear();

      // 호출 횟수가 0인지 확인
      expect(mockFunction).toHaveBeenCalledTimes(0);

      // 새로운 호출과 반환값 설정
      mockFunction.mockReturnValue("value");
      mockFunction("test3");
      expect(mockFunction).toHaveBeenCalledTimes(1);

      // mockReset()을 사용해서 완전히 초기화
      mockFunction.mockReset();

      expect(mockFunction).toHaveBeenCalledTimes(0);
      expect(mockFunction()).toBeUndefined(); // 반환값도 초기화됨
    });
  });
});

// � 모듈 모킹 학습을 위해서는 새로 분리된 파일들을 참고하세요:
// - moduleMockingPractice.test.ts: 모듈 모킹 메인 실습
// - moduleMockingPractice.template.test.ts: 모듈 모킹 템플릿 (TODO 포함)
// - moduleMockingPractice.completed.test.ts: 모듈 모킹 완성 답안
