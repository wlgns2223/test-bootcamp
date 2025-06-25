/**
 * Jest 모듈 모킹 실습 완성 답안
 *
 * 이 파일은 NPM 모듈 모킹 실습의 완성된 답안입니다.
 * 템플릿 파일과 비교해서 학습해보세요.
 */

// NPM 모듈 모킹 설정
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid-123"),
}));

jest.mock("crypto", () => ({
  randomBytes: jest.fn(() => Buffer.from("mocked-random-bytes")),
  createHash: jest.fn(() => ({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => "mocked-hash"),
  })),
  pbkdf2Sync: jest.fn(() => Buffer.from("mocked-pbkdf2")),
  createCipher: jest.fn(() => ({
    update: jest.fn(() => "mocked-cipher-update"),
    final: jest.fn(() => "mocked-cipher-final"),
  })),
}));

jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  appendFile: jest.fn(),
  mkdir: jest.fn(),
  stat: jest.fn(),
}));

jest.mock("path", () => ({
  resolve: jest.fn((p) => `/resolved/path/${p}`),
  join: jest.fn((...paths) => paths.join("/")),
}));

jest.mock("lodash", () => ({
  chain: jest.fn(() => ({
    filter: jest.fn().mockReturnThis(),
    map: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    value: jest.fn(() => [{ id: "processed-user", fullName: "John Doe" }]),
  })),
  groupBy: jest.fn(() => ({ IT: [{ name: "John" }], HR: [{ name: "Jane" }] })),
  isEmpty: jest.fn(() => false),
  sum: jest.fn(() => 100),
  mean: jest.fn(() => 50),
  min: jest.fn(() => 10),
  max: jest.fn(() => 90),
  sortBy: jest.fn((arr) => [...arr].sort()),
  debounce: jest.fn((fn) => fn),
  pick: jest.fn(() => ({ department: "IT", type: "monthly" })),
}));

jest.mock("dayjs", () => {
  const mockDayjs: any = jest.fn(() => ({
    toISOString: jest.fn(() => "2023-12-01T10:00:00.000Z"),
    format: jest.fn(() => "2023-12-01"),
    add: jest.fn().mockReturnThis(),
    diff: jest.fn(() => 7),
    day: jest.fn(() => 2), // 화요일
    year: jest.fn().mockReturnThis(),
    month: jest.fn().mockReturnThis(),
    startOf: jest.fn().mockReturnThis(),
    endOf: jest.fn().mockReturnThis(),
    isBefore: jest.fn(() => true),
    isSame: jest.fn(() => false),
    toDate: jest.fn(() => new Date("2023-12-01")),
  }));
  return mockDayjs;
});

import {
  SecurityService,
  FileService,
  DataProcessingService,
  DateTimeService,
  BusinessService,
} from "../../../utils/mockingPractice";

describe("📦 NPM 모듈 모킹 완성 답안", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("🆔 UUID 모킹 완성 답안", () => {
    it("uuid 모듈을 모킹하고 SecurityService 테스트하기", () => {
      // SecurityService 인스턴스 생성
      const securityService = new SecurityService();

      // generateSecureId() 메서드 호출
      const id = securityService.generateSecureId();

      // 반환값이 모킹된 값인지 확인
      expect(id).toBe("mocked-uuid-123");

      // uuid.v4가 호출되었는지 확인
      const { v4 } = require("uuid");
      expect(v4).toHaveBeenCalled();
    });
  });

  describe("🔐 Crypto 모킹 완성 답안", () => {
    it("crypto 모듈을 모킹하고 API 키 생성 테스트하기", () => {
      const securityService = new SecurityService();

      // generateApiKey() 호출
      const apiKey = securityService.generateApiKey();

      // 결과가 모킹된 해시값인지 확인
      expect(apiKey).toBe("mocked-hash");

      // crypto 함수들의 호출 확인
      const crypto = require("crypto");
      expect(crypto.randomBytes).toHaveBeenCalledWith(32);
      expect(crypto.createHash).toHaveBeenCalledWith("sha256");
    });

    it("password hashing 기능 테스트하기", () => {
      const securityService = new SecurityService();

      // hashPassword() 호출
      const hashedPassword = securityService.hashPassword("testpassword");

      // 결과에 모킹된 pbkdf2 결과가 포함되어 있는지 확인
      expect(hashedPassword).toContain("6d6f636b65642d70626b646632"); // 'mocked-pbkdf2'의 hex 인코딩

      // crypto 함수들의 호출 확인
      const crypto = require("crypto");
      expect(crypto.randomBytes).toHaveBeenCalledWith(16);
      expect(crypto.pbkdf2Sync).toHaveBeenCalledWith(
        "testpassword",
        expect.any(String),
        10000,
        64,
        "sha512"
      );
    });
  });

  describe("📁 File System 모킹 완성 답안", () => {
    it("fs/promises 모듈을 모킹하고 파일 읽기 테스트하기", async () => {
      const fileService = new FileService();

      // fs.readFile이 JSON 문자열을 반환하도록 모킹
      const fs = require("fs/promises");
      fs.readFile.mockResolvedValue('{"name": "test", "version": "1.0.0"}');

      // readConfig() 호출
      const config = await fileService.readConfig("./package.json");

      // 결과가 올바른 객체인지 확인
      expect(config).toEqual({
        name: "test",
        version: "1.0.0",
      });

      // fs.readFile이 올바른 인자로 호출되었는지 확인
      expect(fs.readFile).toHaveBeenCalledWith(
        "/resolved/path/./package.json",
        "utf-8"
      );
    });

    it("로그 파일 작성 기능 테스트하기", async () => {
      const fileService = new FileService();

      // fs 메서드들 모킹
      const fs = require("fs/promises");
      fs.mkdir.mockResolvedValue(undefined);
      fs.appendFile.mockResolvedValue(undefined);

      // writeLog() 호출
      const result = await fileService.writeLog({
        action: "TEST_ACTION",
        data: "test data",
      });

      // 결과 확인
      expect(result.id).toBe("mocked-uuid-123");
      expect(result.timestamp).toBe("2023-12-01T10:00:00.000Z");
      expect(result.data).toEqual({
        action: "TEST_ACTION",
        data: "test data",
      });

      // fs 메서드들이 호출되었는지 확인
      expect(fs.mkdir).toHaveBeenCalledWith(expect.stringContaining("logs"), {
        recursive: true,
      });
      expect(fs.appendFile).toHaveBeenCalledWith(
        expect.stringContaining("log-"),
        expect.stringContaining("mocked-uuid-123")
      );
    });

    it("파일 통계 정보 가져오기 테스트", async () => {
      const fileService = new FileService();

      // fs.stat 모킹 - 파일 통계 정보 객체 반환
      const fs = require("fs/promises");
      const mockStats = {
        size: 1024,
        birthtime: new Date("2023-01-01"),
        mtime: new Date("2023-12-01"),
        isFile: jest.fn(() => true),
        isDirectory: jest.fn(() => false),
      };
      fs.stat.mockResolvedValue(mockStats);

      // getFileStats() 호출
      const stats = await fileService.getFileStats("./test.txt");

      // 결과 확인
      expect(stats.size).toBe(1024);
      expect(stats.created).toBe("2023-12-01"); // dayjs가 모킹되어 고정값 반환
      expect(stats.modified).toBe("2023-12-01");
      expect(stats.isFile).toBe(true);
      expect(stats.isDirectory).toBe(false);

      // fs.stat이 호출되었는지 확인
      expect(fs.stat).toHaveBeenCalledWith("./test.txt");
    });
  });

  describe("🔧 Lodash 모킹 완성 답안", () => {
    it("lodash 체인 기능을 모킹하고 데이터 처리 테스트하기", () => {
      const dataProcessingService = new DataProcessingService();

      // 테스트 데이터
      const users = [
        {
          id: 1,
          firstName: "철수",
          lastName: "김",
          active: true,
          department: "IT",
        },
        {
          id: 2,
          firstName: "영희",
          lastName: "이",
          active: true,
          department: "HR",
        },
      ];

      // processUserData() 호출
      const result = dataProcessingService.processUserData(users);

      // 결과가 모킹된 배열인지 확인
      expect(result).toEqual([{ id: "processed-user", fullName: "John Doe" }]);

      // lodash.chain이 호출되었는지 확인
      const _ = require("lodash");
      expect(_.chain).toHaveBeenCalledWith(users);
    });

    it("그룹화 및 통계 기능 테스트하기", () => {
      const dataProcessingService = new DataProcessingService();

      // 테스트 데이터
      const employees = [
        { name: "김철수", department: "IT", salary: 5000 },
        { name: "이영희", department: "HR", salary: 4500 },
      ];

      // groupByDepartment() 호출
      const groups = dataProcessingService.groupByDepartment(employees);

      // 결과가 모킹된 값들인지 확인
      expect(groups).toEqual({
        IT: [{ name: "John" }],
        HR: [{ name: "Jane" }],
      });

      // 통계 계산 테스트
      const numbers = [10, 20, 30, 40, 50];
      const stats = dataProcessingService.calculateStats(numbers);

      expect(stats.sum).toBe(100);
      expect(stats.mean).toBe(50);
      expect(stats.min).toBe(10);
      expect(stats.max).toBe(90);

      // lodash 함수들이 호출되었는지 확인
      const _ = require("lodash");
      expect(_.groupBy).toHaveBeenCalledWith(employees, "department");
      expect(_.sum).toHaveBeenCalled();
      expect(_.mean).toHaveBeenCalled();
      expect(_.min).toHaveBeenCalled();
      expect(_.max).toHaveBeenCalled();
    });

    it("debounce 기능 테스트하기", () => {
      const dataProcessingService = new DataProcessingService();

      // debounceProcess는 이미 생성된 함수이므로 직접 테스트
      expect(typeof dataProcessingService.debounceProcess).toBe("function");

      // lodash.debounce가 호출되었는지 확인
      const _ = require("lodash");
      expect(_.debounce).toHaveBeenCalled();
    });
  });

  describe("📅 DayJS 모킹 완성 답안", () => {
    it("dayjs 모듈을 모킹하고 날짜 서비스 테스트하기", () => {
      const dateTimeService = new DateTimeService();

      // getCurrentTimestamp() 호출
      const timestamp = dateTimeService.getCurrentTimestamp();

      // 결과가 모킹된 값인지 확인
      expect(timestamp).toBe("2023-12-01T10:00:00.000Z");

      // dayjs가 호출되었는지 확인
      const dayjs = require("dayjs");
      expect(dayjs).toHaveBeenCalled();
    });

    it("날짜 포맷팅 및 계산 기능 테스트하기", () => {
      const dateTimeService = new DateTimeService();

      // formatDate() 호출
      const formatted = dateTimeService.formatDate(
        new Date("2023-01-01"),
        "YYYY-MM-DD"
      );

      // getDaysBetween() 호출
      const days = dateTimeService.getDaysBetween(
        new Date("2023-01-01"),
        new Date("2023-01-08")
      );

      // 결과 확인 (dayjs가 모킹되어 있음)
      expect(formatted).toBe("2023-12-01");
      expect(days).toBe(7);

      // dayjs 메서드들이 호출되었는지 확인
      const dayjs = require("dayjs");
      expect(dayjs).toHaveBeenCalled();
    });

    it("업무일 계산 및 스케줄 생성 테스트하기", () => {
      const dateTimeService = new DateTimeService();

      // getBusinessDaysInMonth() 호출
      const businessDays = dateTimeService.getBusinessDaysInMonth(2023, 12);

      // 결과가 배열인지 확인
      expect(Array.isArray(businessDays)).toBe(true);

      // isBusinessDay() 테스트
      const isBusinessDay = dateTimeService.isBusinessDay(
        new Date("2023-12-01")
      );
      expect(typeof isBusinessDay).toBe("boolean");

      // dayjs가 호출되었는지 확인
      const dayjs = require("dayjs");
      expect(dayjs).toHaveBeenCalled();
    });
  });

  describe("🏢 통합 서비스 모킹 완성 답안", () => {
    it("모든 모듈을 함께 모킹해서 비즈니스 보고서 생성 테스트하기", async () => {
      const businessService = new BusinessService();

      // 테스트 데이터
      const testData = {
        title: "Q4 보고서",
        users: [
          {
            id: 1,
            firstName: "Alice",
            lastName: "Smith",
            active: true,
            department: "IT",
          },
          {
            id: 2,
            firstName: "Bob",
            lastName: "Johnson",
            active: true,
            department: "HR",
          },
        ],
        numbers: [10, 20, 30, 40, 50],
        author: "Test Admin",
        department: "IT",
        period: "Q4",
        type: "quarterly",
      };

      // createBusinessReport() 호출
      const report = await businessService.createBusinessReport(testData);

      // 보고서 구조 확인
      expect(report.id).toBe("mocked-uuid-123");
      expect(report.createdAt).toBe("2023-12-01T10:00:00.000Z");
      expect(report.title).toBe("Q4 보고서");
      expect(report.createdBy).toBe("Test Admin");
      expect(report.data.processed).toEqual([
        { id: "processed-user", fullName: "John Doe" },
      ]);
      expect(report.data.statistics.sum).toBe(100);

      // 모든 의존성이 호출되었는지 확인
      const { v4 } = require("uuid");
      const _ = require("lodash");
      const dayjs = require("dayjs");

      expect(v4).toHaveBeenCalled();
      expect(_.chain).toHaveBeenCalled();
      expect(dayjs).toHaveBeenCalled();
    });

    it("복잡한 데이터 내보내기 기능 테스트하기", async () => {
      const businessService = new BusinessService();

      // 테스트 데이터
      const data = [
        { name: "Alice", role: "Developer" },
        { name: "Bob", role: "Designer" },
      ];

      // fs 메서드들 모킹
      const fs = require("fs/promises");
      fs.mkdir.mockResolvedValue(undefined);
      fs.appendFile.mockResolvedValue(undefined);

      // exportBusinessData() 호출
      const exported = await businessService.exportBusinessData(data, "json");

      // 내보내기 결과 확인
      expect(exported.exportId).toBe("mocked-uuid-123");
      expect(exported.timestamp).toBe("2023-12-01T10:00:00.000Z");
      expect(exported.format).toBe("json");
      expect(exported.recordCount).toBe(2);
      expect(exported.data).toEqual(data);

      // 파일 시스템 호출 확인
      expect(fs.appendFile).toHaveBeenCalledWith(
        expect.stringContaining("/logs/log-"),
        expect.stringContaining('"action":"DATA_EXPORTED"')
      );
    });

    it("업무 스케줄링 기능의 모든 의존성 테스트하기", async () => {
      const businessService = new BusinessService();

      // 테스트 데이터
      const tasks = [
        { id: 1, name: "Task 1", priority: "high" },
        { id: 2, name: "Task 2", priority: "low" },
      ];

      const startDate = new Date("2023-12-01");

      // fs 모킹
      const fs = require("fs/promises");
      fs.mkdir.mockResolvedValue(undefined);
      fs.appendFile.mockResolvedValue(undefined);

      // scheduleBusinessTasks() 호출 (startDate 파라미터 추가)
      const schedule = await businessService.scheduleBusinessTasks(
        tasks,
        startDate
      );

      // 스케줄링 결과 확인 (배열이 반환됨)
      expect(Array.isArray(schedule)).toBe(true);
      expect(schedule.length).toBe(2);

      // 첫 번째 스케줄된 태스크 확인
      expect(schedule[0].id).toBe("mocked-uuid-123");
      expect(schedule[0].name).toBe("Task 1");
      expect(schedule[0].priority).toBe("high");

      // 모든 의존성 호출 확인
      const { v4 } = require("uuid");
      const dayjs = require("dayjs");

      expect(v4).toHaveBeenCalled();
      expect(dayjs).toHaveBeenCalled();
    });
  });

  describe("🎓 고급 모듈 모킹 기법 완성 답안", () => {
    it("런타임에 모킹 구현 변경하기", () => {
      const securityService = new SecurityService();

      // 초기 모킹 값 확인
      let id1 = securityService.generateSecureId();
      expect(id1).toBe("mocked-uuid-123");

      // 런타임에 모킹 구현 변경
      const { v4 } = require("uuid");
      v4.mockReturnValue("new-runtime-uuid");

      // 변경된 값 확인
      let id2 = securityService.generateSecureId();
      expect(id2).toBe("new-runtime-uuid");

      // 다시 한 번 변경
      v4.mockReturnValue("another-uuid");
      let id3 = securityService.generateSecureId();
      expect(id3).toBe("another-uuid");

      // 호출 횟수 확인
      expect(v4).toHaveBeenCalledTimes(3);
    });

    it("부분 모킹으로 일부 기능만 모킹하기", () => {
      // crypto 모듈의 실제 구현과 모킹을 혼합 사용하는 예시
      // 이 테스트에서는 이미 전체 모킹이 설정되어 있으므로
      // 모킹된 동작을 확인합니다.

      const securityService = new SecurityService();
      const crypto = require("crypto");

      // 모킹된 함수들 확인
      expect(typeof crypto.randomBytes).toBe("function");
      expect(typeof crypto.createHash).toBe("function");
      expect(typeof crypto.pbkdf2Sync).toBe("function");

      // API 키 생성 테스트
      const apiKey = securityService.generateApiKey();
      expect(apiKey).toBe("mocked-hash");
    });

    it("모킹된 모듈의 호출 패턴 검증하기", async () => {
      const businessService = new BusinessService();

      // 복잡한 비즈니스 로직 실행
      const testData = [{ name: "Test User", department: "IT" }];

      const fs = require("fs/promises");
      fs.readFile.mockResolvedValue('{"setting": "test"}');

      await businessService.createBusinessReport(testData);

      // 호출 순서와 패턴 검증
      const { v4 } = require("uuid");
      const _ = require("lodash");
      const dayjs = require("dayjs");

      // UUID가 여러 번 호출되었는지 확인
      expect(v4.mock.calls.length).toBeGreaterThan(0);

      // lodash 체인이 호출되었는지 확인
      expect(_.chain).toHaveBeenCalledWith(testData);

      // dayjs가 호출되었는지 확인
      expect(dayjs).toHaveBeenCalled();

      // fs.readFile이 특정 패턴으로 호출되었는지 확인
      expect(fs.readFile).toHaveBeenCalledWith(
        expect.stringContaining("config"),
        "utf-8"
      );
    });

    it("모킹된 모듈의 에러 처리 테스트하기", async () => {
      const fileService = new FileService();

      // fs.readFile이 에러를 throw하도록 설정
      const fs = require("fs/promises");
      fs.readFile.mockRejectedValue(new Error("파일을 찾을 수 없습니다"));

      // 에러 상황에서 애플리케이션이 올바르게 처리하는지 확인
      await expect(
        fileService.readConfig("./nonexistent.json")
      ).rejects.toThrow("설정 파일을 읽을 수 없습니다: ./nonexistent.json");

      // fs.readFile이 호출되었는지 확인
      expect(fs.readFile).toHaveBeenCalledWith(
        "/resolved/path/./nonexistent.json",
        "utf-8"
      );

      // 에러 복구 테스트 - 다시 정상 동작하도록 설정
      fs.readFile.mockResolvedValue('{"recovered": true}');

      const config = await fileService.readConfig("./config.json");
      expect(config).toEqual({ recovered: true });
    });
  });
});
