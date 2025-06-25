/**
 * Jest Mocking과 Spy 실습 템플릿
 *
 * 이 파일의 TODO 주석을 따라 실습을 완료해보세요.
 * 각 테스트는 특정 mocking/spy 기능을 연습할 수 있도록 구성되었습니다.
 *
 * 실습 방법:
 * 1. TODO 주석이 있는 부분을 찾아서 코드를 작성하세요
 * 2. describe.skip을 describe로 변경해서 테스트를 활성화하세요
 * 3. 완성 답안은 mockingPractice.completed.test.ts 파일을 참고하세요
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
} from "../../../utils/mockingPractice";

describe("Jest Mocking과 Spy 실습", () => {
  beforeEach(() => {
    // 각 테스트 전에 모든 mock 초기화
    jest.clearAllMocks();
  });

  describe.skip("1. Mock 함수 기본 실습", () => {
    it("mock 함수를 생성하고 호출 검증하기", () => {
      // TODO: jest.fn()으로 mock 함수를 생성하세요
      // TODO: mock 함수를 다양한 인자로 여러 번 호출하세요
      // 예: mockCallback('hello'), mockCallback('world', 123)
      // TODO: 다음 검증들을 작성하세요:
      // - 함수가 호출되었는지 확인 (toHaveBeenCalled)
      // - 함수가 2번 호출되었는지 확인 (toHaveBeenCalledTimes)
      // - 특정 인자로 호출되었는지 확인 (toHaveBeenCalledWith)
    });

    it("mock 함수에 반환값 설정하기", () => {
      // TODO: mock 함수를 생성하세요
      // TODO: mockReturnValue를 사용해서 'success' 값을 반환하도록 설정하세요
      // TODO: 함수를 호출하고 반환값이 'success'인지 확인하세요
      // TODO: mockReturnValueOnce를 사용해서 한 번만 'once' 값을 반환하도록 설정하세요
      // TODO: 함수를 두 번 호출해서 첫 번째는 'once', 두 번째는 'success'가 반환되는지 확인하세요
    });

    it("비동기 mock 함수 만들기", async () => {
      // TODO: 비동기 mock 함수를 생성하세요
      // TODO: mockResolvedValue를 사용해서 'async success' 값을 반환하도록 설정하세요
      // TODO: 함수를 await으로 호출하고 반환값을 확인하세요
      // TODO: mockRejectedValue를 사용해서 에러를 던지도록 설정하세요
      // TODO: expect().rejects.toThrow()를 사용해서 에러가 발생하는지 확인하세요
    });
  });

  describe.skip("2. Spy 기본 실습", () => {
    it("기존 메서드를 spy로 감시하기", () => {
      const calculator = new Calculator();

      // TODO: jest.spyOn을 사용해서 calculator의 add 메서드를 spy로 만드세요

      // TODO: calculator.add(5, 3)을 호출하세요

      // TODO: 다음을 검증하세요:
      // - 결과가 8인지 확인
      // - spy가 (5, 3) 인자로 호출되었는지 확인
      // - spy가 1번 호출되었는지 확인

      // TODO: spy를 복원하세요 (mockRestore 사용)
    });

    it("외부 의존성 spy하기", () => {
      // TODO: console.log를 spy로 만들고 실제 출력을 막으세요 (mockImplementation 사용)
      // TODO: console.log('test message')를 호출하세요
      // TODO: spy가 'test message'로 호출되었는지 확인하세요
      // TODO: spy를 복원하세요
    });

    it("utils 모듈의 메서드 spy하기", () => {
      // TODO: utils.generateId 메서드를 spy로 만들고 'test-id'를 반환하도록 설정하세요
      // TODO: utils.generateId()를 호출하고 'test-id'가 반환되는지 확인하세요
      // TODO: spy를 복원하세요
    });
  });

  describe.skip("3. 의존성 주입 Mocking 실습", () => {
    it("UserService의 API 호출 mocking", async () => {
      // TODO: mockApiClient 객체를 생성하세요
      // get 메서드는 { id: 1, name: 'Test User', email: 'test@example.com' }를 반환
      // post 메서드는 { success: true }를 반환
      // TODO: UserService에 mockApiClient를 주입해서 인스턴스를 생성하세요
      // TODO: userService.getUser(1)을 호출하세요
      // TODO: 다음을 검증하세요:
      // - 반환된 사용자 정보가 올바른지 확인
      // - mockApiClient.get이 '/api/users/1'로 호출되었는지 확인
    });

    it("EmailService mocking", async () => {
      // TODO: mockEmailService 객체를 생성하세요
      // sendEmail과 sendWelcomeEmail 메서드 모두 true를 반환하도록 설정
      // TODO: mockEmailService.sendEmail('test@example.com', 'Subject', 'Body')를 호출하세요
      // TODO: 다음을 검증하세요:
      // - 반환값이 true인지 확인
      // - 올바른 인자로 호출되었는지 확인
    });
  });

  describe.skip("4. 복합 서비스 Mocking 실습", () => {
    it("NotificationService의 종합 mocking", async () => {
      // TODO: mockEmailService를 생성하세요 (sendEmail이 true 반환)
      // TODO: mockUserService를 생성하세요
      // getUser는 { id: 1, email: 'user@test.com' } 반환
      // updateUserActivity는 { userId: 1, activity: 'NOTIFICATION_SENT', timestamp: expect.any(Number) } 반환
      // TODO: NotificationService에 mock 서비스들을 주입해서 인스턴스를 생성하세요
      // TODO: notificationService.sendUserNotification(1, '테스트 메시지')를 호출하세요
      // TODO: 다음을 검증하세요:
      // - 반환값이 true인지 확인
      // - mockUserService.getUser가 1로 호출되었는지 확인
      // - mockEmailService.sendEmail이 올바른 인자로 호출되었는지 확인
      // - mockUserService.updateUserActivity가 호출되었는지 확인
    });

    it("OrderService의 복잡한 의존성 mocking", async () => {
      // TODO: 여러 의존성을 가진 OrderService를 테스트하세요
      // mockUserService, mockEmailService, mockUtils를 생성하고 주입
      // TODO: OrderService.createOrder를 호출하고 모든 의존성이 올바르게 호출되었는지 확인하세요
      // 힌트: mockUtils.generateId는 'test-order-id'를 반환하도록 설정
      // mockUserService.getUser는 사용자 정보를 반환
      // mockEmailService.sendEmail은 true를 반환
      // mockUserService.updateUserActivity는 활동 정보를 반환
    });
  });

  describe.skip("5. 파일 시스템 Mocking 실습", () => {
    it("파일 읽기 성공/실패 시나리오", async () => {
      // TODO: fileSystem.readFile을 spy로 만드세요
      // TODO: 첫 번째 호출에서는 '파일 내용'을 반환하도록 설정
      // TODO: 두 번째 호출에서는 에러를 던지도록 설정
      // TODO: 성공 케이스와 실패 케이스를 모두 테스트하세요
    });
  });

  describe.skip("6. 실시간 함수 Mocking 실습", () => {
    it("Date.now() mocking", () => {
      // TODO: Date.now를 spy로 만들고 고정된 시간을 반환하도록 설정하세요
      // 예: 1234567890000
      // TODO: Date.now()를 호출하고 설정한 값이 반환되는지 확인하세요
      // TODO: spy를 복원하세요
    });

    it("Math.random() mocking", () => {
      // TODO: Math.random을 spy로 만들고 0.5를 반환하도록 설정하세요
      // TODO: utils.generateId()를 호출했을 때 예측 가능한 값이 나오는지 확인하세요
      // (Math.random이 mocking되어 있으므로 항상 같은 ID가 생성됨)
      // TODO: spy를 복원하세요
    });
  });

  describe.skip("7. Mock 상태 관리 실습", () => {
    it("mock 호출 정보 분석하기", () => {
      // TODO: mock 함수를 생성하세요
      // TODO: 서로 다른 인자로 여러 번 호출하세요
      // TODO: mock.calls를 사용해서 호출 인자들을 확인하세요
      // TODO: mock.results를 사용해서 호출 결과들을 확인하세요
    });

    it("mock 초기화 실습", () => {
      // TODO: mock 함수를 생성하고 여러 번 호출하세요
      // TODO: mockClear()를 사용해서 호출 기록을 초기화하세요
      // TODO: 호출 횟수가 0인지 확인하세요
      // TODO: mockReset()을 사용해서 완전히 초기화하세요
    });
  });
});

// 📝 모듈 모킹 학습을 위해서는 새로 분리된 파일들을 참고하세요:
// - moduleMockingPractice.test.ts: 모듈 모킹 메인 실습
// - moduleMockingPractice.template.test.ts: 모듈 모킹 템플릿 (TODO 포함)
// - moduleMockingPractice.completed.test.ts: 모듈 모킹 완성 답안
