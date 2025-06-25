// 🎯 Jest 모듈 모킹 완전 정복 - NPM 모듈 모킹 마스터하기
// 신입 프론트엔드 개발자가 반드시 알아야 할 모듈 모킹 핵심 개념을 마스터하세요!

// ===== 외부 NPM 모듈 모킹 섹션 =====

// uuid 모킹
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid-123"),
}));

// crypto 모킹
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

// fs/promises 모킹
jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  appendFile: jest.fn(),
  mkdir: jest.fn(),
  stat: jest.fn(),
}));

// path 모킹
jest.mock("path", () => ({
  resolve: jest.fn((p) => `/mocked/path/${p}`),
  join: jest.fn((...paths) => paths.join("/")),
}));

// lodash 모킹
jest.mock("lodash", () => ({
  chain: jest.fn(() => ({
    filter: jest.fn().mockReturnThis(),
    map: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    value: jest.fn(() => []),
  })),
  groupBy: jest.fn(() => ({})),
  isEmpty: jest.fn(() => false),
  sum: jest.fn(() => 100),
  mean: jest.fn(() => 50),
  min: jest.fn(() => 10),
  max: jest.fn(() => 90),
  sortBy: jest.fn((arr) => [...arr].sort()),
  debounce: jest.fn((fn) => fn),
  pick: jest.fn(() => ({ department: "IT", type: "quarterly" })),
}));

// dayjs 모킹
jest.mock("dayjs", () => {
  const mockDayjs = jest.fn(() => ({
    toISOString: jest.fn(() => "2023-12-01T10:00:00.000Z"),
    format: jest.fn(() => "2023-12-01"),
    add: jest.fn().mockReturnThis(),
    diff: jest.fn(() => 5),
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

// ESM imports
import { v4 as uuidV4 } from "uuid";
import * as crypto from "crypto";
import * as fs from "fs/promises";
import * as path from "path";
import * as lodash from "lodash";
import dayjs from "dayjs";

import {
  SecurityService,
  FileService,
  DataProcessingService,
  DateTimeService,
  BusinessService,
} from "../../../utils/mockingPractice";

// 모킹된 모듈들의 타입 캐스팅
const mockedUuidV4 = uuidV4 as jest.MockedFunction<typeof uuidV4>;
const mockedCrypto = crypto as jest.Mocked<typeof crypto>;
const mockedFs = fs as jest.Mocked<typeof fs>;
const mockedPath = path as jest.Mocked<typeof path>;
const mockedLodash = lodash as jest.Mocked<typeof lodash>;
const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;

describe("📦 NPM 모듈 모킹 실습", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ===== 1. UUID 모킹 =====
  describe("🆔 UUID 모킹", () => {
    it("uuid.v4가 예측 가능한 값을 반환한다", () => {
      // 📝 UUID 모킹의 필요성
      // SecurityService의 generateSecureId() 메서드는 내부적으로 uuid.v4()를 사용합니다.
      // 실제 UUID는 매번 다른 값을 생성하므로 테스트에서 예측 가능한 값으로 모킹합니다.

      // Arrange: SecurityService 인스턴스 생성
      const securityService = new SecurityService();

      // Act: generateSecureId() 메서드 호출
      const id = securityService.generateSecureId();

      // Assert: 모킹된 UUID 값이 반환되는지 확인
      expect(id).toBe("mocked-uuid-123");

      // uuid.v4가 호출되었는지 확인
      expect(mockedUuidV4).toHaveBeenCalled();

      // 📚 배울 점:
      // - NPM 모듈은 jest.mock()으로 파일 상단에서 모킹
      // - 모킹된 함수도 jest.fn()처럼 호출 추적 가능
      // - 외부 의존성을 제거하여 빠르고 안정적인 테스트 가능
    });
  });

  // ===== 2. Crypto 모킹 =====
  describe("🔐 Crypto 모킹", () => {
    it("crypto.randomBytes가 모킹된 값을 반환한다", () => {
      // 📝 Crypto 모킹의 필요성
      // SecurityService의 generateApiKey()는 crypto.randomBytes와 createHash를 사용합니다.
      // 암호화 관련 함수들은 시스템에 의존적이므로 모킹하여 일관된 테스트를 만듭니다.

      // Arrange: SecurityService 인스턴스 생성
      const securityService = new SecurityService();

      // Act: API 키 생성 메서드 호출
      const apiKey = securityService.generateApiKey();

      // Assert: 모킹된 해시값 확인
      expect(apiKey).toBe("mocked-hash");

      // crypto 함수들이 올바른 인자로 호출되었는지 확인
      expect(mockedCrypto.randomBytes).toHaveBeenCalledWith(32);
      expect(mockedCrypto.createHash).toHaveBeenCalledWith("sha256");

      // 📚 배울 점:
      // - 복잡한 객체도 모킹 가능 (createHash는 체이닝 메서드를 가진 객체 반환)
      // - 호출 인자까지 검증하여 올바른 사용 확인 가능
      // - 시스템 의존적인 함수들을 안전하게 테스트
    });

    it("패스워드 해싱 로직을 모킹된 crypto 함수로 테스트하기", () => {
      // 📝 복잡한 암호화 로직 테스트
      // 패스워드 해싱은 salt 생성(randomBytes) + pbkdf2 암호화 과정을 거칩니다.
      // 이런 복잡한 로직도 모킹을 통해 단위 테스트할 수 있습니다.

      // Arrange: SecurityService 인스턴스와 테스트용 패스워드
      const securityService = new SecurityService();
      const testPassword = "testpassword";

      // Act: 패스워드 해싱 (crypto.randomBytes와 pbkdf2Sync 사용)
      const hashedPassword = securityService.hashPassword(testPassword);

      // Assert: 해싱 결과에 모킹된 값들이 포함되어 있는지 확인
      // 'mocked-random-bytes'의 hex 인코딩과 'mocked-pbkdf2'의 hex 인코딩이 포함됨
      expect(hashedPassword).toContain(
        "6d6f636b65642d72616e646f6d2d6279746573"
      ); // 'mocked-random-bytes' hex
      expect(hashedPassword).toContain("6d6f636b65642d70626b646632"); // 'mocked-pbkdf2' hex

      // crypto 함수들의 정확한 호출 확인
      expect(mockedCrypto.randomBytes).toHaveBeenCalledWith(16); // salt 생성용
      expect(mockedCrypto.pbkdf2Sync).toHaveBeenCalledWith(
        testPassword,
        expect.any(String), // salt는 동적으로 생성
        10000, // iterations
        64, // keylen
        "sha512" // digest
      );

      // 📚 배울 점:
      // - 복수의 모킹된 함수가 조합된 로직도 테스트 가능
      // - expect.any(String) 등으로 동적 값도 유연하게 검증
      // - 실제 암호화 없이도 로직의 정확성 검증
    });
  });

  // ===== 3. File System 모킹 =====
  describe("📁 File System 모킹", () => {
    it("비동기 파일 읽기를 모킹하여 설정 파일 로딩 테스트하기", async () => {
      // 📝 비동기 파일 시스템 모킹
      // FileService의 readConfig()는 fs/promises.readFile을 사용하여 설정 파일을 읽습니다.
      // 실제 파일이 없어도 모킹을 통해 파일 읽기 로직을 테스트할 수 있습니다.

      // Arrange: fs.readFile 모킹 설정
      const mockConfigData = '{"test": "config"}';
      mockedFs.readFile.mockResolvedValue(mockConfigData);

      // Act: 설정 파일 읽기
      const fileService = new FileService();
      const config = await fileService.readConfig("./config.json");

      // Assert: JSON 파싱된 결과 확인
      expect(config).toEqual({ test: "config" });
      expect(mockedFs.readFile).toHaveBeenCalledWith(
        "/mocked/path/./config.json", // path.resolve()가 모킹되어 이런 경로로 변환됨
        "utf-8"
      );

      // 📚 배울 점:
      // - Promise를 반환하는 함수는 mockResolvedValue로 모킹
      // - 실제 파일 시스템 없이도 파일 읽기 로직 테스트 가능
      // - path 모듈과 함께 사용되는 복합적인 로직도 모킹으로 테스트
    });

    it("로그 파일 작성 로직을 모킹된 파일 시스템으로 테스트하기", async () => {
      // 📝 복합적인 파일 시스템 작업 모킹
      // writeLog()는 디렉토리 생성(mkdir) + 파일 추가(appendFile)를 수행합니다.
      // 여러 파일 시스템 함수가 조합된 로직도 모킹으로 테스트할 수 있습니다.

      // Arrange: 파일 시스템 함수들 모킹
      mockedFs.mkdir.mockResolvedValue(undefined);
      mockedFs.appendFile.mockResolvedValue(undefined);

      // Act: 로그 작성
      const fileService = new FileService();
      const logEntry = await fileService.writeLog({ message: "test log" });

      // Assert: 로그 엔트리 구조 확인 (다른 모킹된 모듈들과의 조합)
      expect(logEntry.id).toBe("mocked-uuid-123"); // uuid 모킹
      expect(logEntry.timestamp).toBe("2023-12-01T10:00:00.000Z"); // dayjs 모킹

      // 파일 시스템 호출 확인
      expect(mockedFs.mkdir).toHaveBeenCalled();
      expect(mockedFs.appendFile).toHaveBeenCalled();

      // 📚 배울 점:
      // - 여러 비동기 작업이 연속으로 일어나는 로직도 모킹으로 테스트
      // - 다른 모킹된 모듈들(uuid, dayjs)과의 상호작용도 함께 검증
      // - mockResolvedValue(undefined)로 성공적인 비동기 작업 시뮬레이션
    });

    it("파일 통계 정보 조회를 모킹하여 메타데이터 처리 테스트하기", async () => {
      // 📝 복잡한 객체 모킹
      // fs.stat()은 파일의 메타데이터를 담은 복잡한 객체를 반환합니다.
      // 이런 복잡한 객체도 모킹하여 메타데이터 처리 로직을 테스트할 수 있습니다.

      // Arrange: fs.stat 모킹 설정 (복잡한 stats 객체 모킹)
      const mockStats = {
        size: 1024,
        birthtime: new Date("2023-01-01"),
        mtime: new Date("2023-01-02"),
        isFile: () => true,
        isDirectory: () => false,
      };
      mockedFs.stat.mockResolvedValue(mockStats as any);

      // Act: 파일 통계 조회
      const fileService = new FileService();
      const stats = await fileService.getFileStats("/test/file.txt");

      // Assert: 통계 정보 처리 결과 확인
      expect(stats.size).toBe(1024);
      expect(stats.isFile).toBe(true);
      expect(mockedFs.stat).toHaveBeenCalledWith("/test/file.txt");

      // 📚 배울 점:
      // - 메서드를 가진 복잡한 객체도 모킹 가능
      // - 실제 파일 없이도 파일 메타데이터 처리 로직 테스트
      // - 함수형 속성(isFile, isDirectory)도 모킹하여 완전한 인터페이스 구현
    });
  });

  // ===== 4. Lodash 모킹 =====
  describe("🔧 Lodash 모킹", () => {
    it("데이터 처리 파이프라인이 모킹된다", () => {
      // 📝 체이닝 메서드 모킹
      // DataProcessingService의 processUserData()는 lodash.chain을 사용하여
      // 필터링 → 매핑 → 정렬의 복잡한 데이터 처리 파이프라인을 수행합니다.
      // 이런 체이닝 로직도 모킹으로 테스트할 수 있습니다.

      // Arrange: 테스트 데이터 준비
      const dataService = new DataProcessingService();
      const users = [{ name: "John", active: true }];

      // Act: 데이터 처리 (내부적으로 lodash.chain 사용)
      const result = dataService.processUserData(users);

      // Assert: 모킹된 빈 배열 반환 확인
      expect(result).toEqual([]);

      // lodash.chain이 올바른 데이터로 호출되었는지 확인
      expect(mockedLodash.chain).toHaveBeenCalledWith(users);

      // 📚 배울 점:
      // - 체이닝 메서드(chain().filter().map().value())도 모킹 가능
      // - 복잡한 데이터 변환 로직을 외부 라이브러리 없이 테스트
      // - mockReturnThis()로 체이닝 패턴 구현
    });

    it("그룹화 기능이 모킹된다", () => {
      // 📝 유틸리티 함수 모킹
      // groupByDepartment()는 lodash.groupBy를 사용하여 직원을 부서별로 분류합니다.
      // 외부 라이브러리의 유틸리티 함수도 모킹하여 비즈니스 로직에 집중할 수 있습니다.

      // Arrange: 테스트 직원 데이터
      const dataService = new DataProcessingService();
      const employees = [{ name: "John", department: "IT" }];

      // Act: 부서별 그룹화
      const grouped = dataService.groupByDepartment(employees);

      // Assert: 모킹된 빈 객체 반환
      expect(grouped).toEqual({});

      // lodash.groupBy 호출 확인
      expect(mockedLodash.groupBy).toHaveBeenCalledWith(
        employees,
        "department"
      );

      // 📚 배울 점:
      // - 그룹화, 정렬 등의 유틸리티 함수도 모킹으로 대체 가능
      // - 실제 데이터 처리 없이도 함수 호출과 인자 전달 검증
      // - 비즈니스 로직과 유틸리티 로직의 분리된 테스트
    });

    it("통계 계산을 모킹하여 수학적 연산 로직 테스트하기", () => {
      // 📝 수학 함수들의 모킹
      // calculateStats()는 여러 lodash 수학 함수(sum, mean, min, max)를 조합하여
      // 통계 정보를 계산합니다. 복잡한 수학 연산도 모킹으로 단순화할 수 있습니다.

      // Arrange: 테스트 숫자 데이터
      const dataService = new DataProcessingService();
      const numbers = [1, 2, 3, 4, 5];

      // Act: 통계 계산 (여러 lodash 함수 사용)
      const stats = dataService.calculateStats(numbers);

      // Assert: 모킹된 통계값들과 실제 계산값 혼합 확인
      expect(stats).toEqual({
        count: 5, // 실제 계산된 길이
        sum: 100, // 모킹된 값
        mean: 50, // 모킹된 값
        min: 10, // 모킹된 값
        max: 90, // 모킹된 값
        median: 3, // 실제 계산된 중간값
      });

      // 각 lodash 함수가 정확한 데이터로 호출되었는지 확인
      expect(mockedLodash.sum).toHaveBeenCalledWith(numbers);
      expect(mockedLodash.mean).toHaveBeenCalledWith(numbers);

      // 📚 배울 점:
      // - 수학적 연산도 모킹하여 예측 가능한 테스트 작성
      // - 모킹된 함수와 실제 계산의 조합으로 하이브리드 테스트
      // - 각 함수별로 독립적인 호출 검증 가능
    });
  });

  // ===== 5. DayJS 모킹 =====
  describe("📅 DayJS 모킹", () => {
    it("현재 시간을 모킹하여 타임스탬프 생성 로직 테스트하기", () => {
      // 📝 시간 라이브러리 모킹의 중요성
      // DateTimeService의 getCurrentTimestamp()는 dayjs()를 사용하여 현재 시간을 가져옵니다.
      // 실제 시간은 테스트 실행마다 달라지므로 모킹하여 일관된 결과를 얻습니다.

      // Arrange: DateTimeService 인스턴스 생성
      const dateService = new DateTimeService();

      // Act: 현재 타임스탬프 생성
      const timestamp = dateService.getCurrentTimestamp();

      // Assert: 모킹된 날짜 문자열 확인
      expect(timestamp).toBe("2023-12-01T10:00:00.000Z");

      // 📚 배울 점:
      // - 시간 의존적인 로직도 모킹으로 안정적으로 테스트
      // - dayjs() 함수 자체를 모킹하여 항상 같은 시간 객체 반환
      // - toISOString() 등의 메서드도 함께 모킹하여 완전한 시간 객체 구현
    });

    it("날짜 포맷팅을 모킹하여 표시 형식 로직 테스트하기", () => {
      // 📝 날짜 포맷팅 모킹
      // formatDate()는 주어진 날짜를 특정 형식으로 포맷팅합니다.
      // 실제 포맷팅 로직보다는 올바른 인자 전달과 결과 처리에 집중할 수 있습니다.

      // Arrange: DateTimeService와 테스트 날짜
      const dateService = new DateTimeService();
      const testDate = new Date();
      const formatString = "YYYY-MM-DD";

      // Act: 날짜 포맷팅
      const formatted = dateService.formatDate(testDate, formatString);

      // Assert: 모킹된 포맷된 날짜 확인
      expect(formatted).toBe("2023-12-01");

      // 📚 배울 점:
      // - 복잡한 포맷팅 로직을 모킹으로 단순화
      // - 다양한 포맷 패턴에 대한 테스트를 일관된 결과로 수행
      // - 실제 dayjs 라이브러리 없이도 포맷팅 로직 검증
    });

    it("날짜 계산을 모킹하여 기간 계산 로직 테스트하기", () => {
      // 📝 날짜 간 계산 모킹
      // getDaysBetween()은 두 날짜 사이의 일수를 계산합니다.
      // 복잡한 날짜 계산도 모킹하여 비즈니스 로직에 집중할 수 있습니다.

      // Arrange: DateTimeService와 테스트 날짜들
      const dateService = new DateTimeService();
      const startDate = "2023-01-01";
      const endDate = "2023-01-06";

      // Act: 날짜 간 차이 계산
      const daysBetween = dateService.getDaysBetween(startDate, endDate);

      // Assert: 모킹된 차이값 확인
      expect(daysBetween).toBe(5);

      // 📚 배울 점:
      // - 날짜 차이 계산도 모킹으로 예측 가능하게 테스트
      // - dayjs의 diff() 메서드가 모킹되어 고정값 반환
      // - 복잡한 날짜 연산 없이도 로직의 정확성 검증
    });

    it("업무일 판별을 모킹하여 비즈니스 로직 테스트하기", () => {
      // 📝 조건부 로직과 모킹
      // isBusinessDay()는 주어진 날짜가 업무일(월-금)인지 판별합니다.
      // 실제 요일 계산 대신 모킹된 값으로 조건부 로직을 테스트합니다.

      // Arrange: DateTimeService와 테스트 날짜
      const dateService = new DateTimeService();
      const testDate = "2023-01-02"; // 임의의 날짜

      // Act: 업무일 확인 (dayjs의 day() 메서드 사용)
      const isBusinessDay = dateService.isBusinessDay(testDate);

      // Assert: 화요일(day() = 2)이므로 업무일로 판정
      expect(isBusinessDay).toBe(true);

      // 📚 배울 점:
      // - 조건부 로직도 모킹으로 테스트 가능
      // - day() 메서드가 2를 반환하도록 모킹되어 있음
      // - 실제 날짜와 무관하게 일관된 조건부 테스트 수행
    });
  });

  // ===== 6. 통합 서비스 모킹 =====
  describe("🏢 통합 비즈니스 서비스 모킹", () => {
    it("여러 모킹된 모듈을 조합하여 비즈니스 보고서 생성 테스트하기", async () => {
      // 📝 통합 모킹의 실제 활용
      // BusinessService의 createBusinessReport()는 모든 서비스를 조합하여 사용합니다:
      // - UUID: 고유 ID 생성
      // - Crypto: 보안 해시 생성
      // - DayJS: 타임스탬프 생성
      // - Lodash: 데이터 처리
      // - FileSystem: 로그 저장
      // 실제 프로젝트에서 이런 복합적인 로직을 테스트하는 방법을 보여줍니다.

      // Arrange: 보고서 데이터 준비
      const businessService = new BusinessService();
      const reportData = {
        title: "월간 보고서",
        users: [{ name: "John", active: true }],
        numbers: [10, 20, 30],
        author: "Admin",
      };

      // Act: 비즈니스 보고서 생성 (모든 서비스와 모듈 조합 사용)
      const report = await businessService.createBusinessReport(reportData);

      // Assert: 보고서 구조와 모킹된 값들 확인
      expect(report.id).toBe("mocked-uuid-123"); // UUID 모킹
      expect(report.createdAt).toBe("2023-12-01T10:00:00.000Z"); // DayJS 모킹
      expect(report.metadata.hash).toBe("mocked-hash"); // Crypto 모킹

      // 모든 모킹된 모듈들이 올바르게 호출되었는지 확인
      expect(mockedUuidV4).toHaveBeenCalled();
      expect(mockedCrypto.createHash).toHaveBeenCalled();
      expect(mockedLodash.chain).toHaveBeenCalled();
      expect(mockedFs.appendFile).toHaveBeenCalled();

      // 📚 배울 점:
      // - 실제 서비스는 여러 외부 의존성을 조합하여 사용
      // - 모든 의존성을 모킹하면 순수한 비즈니스 로직만 테스트 가능
      // - 복잡한 통합 시나리오도 예측 가능한 결과로 테스트
    });

    it("모킹된 날짜 모듈로 업무 스케줄링 로직 테스트하기", async () => {
      // 📝 날짜 의존적인 비즈니스 로직 테스트
      // scheduleBusinessTasks()는 작업들을 특정 날짜에 스케줄링합니다.
      // 날짜 계산이 포함된 복잡한 로직도 모킹으로 안정적으로 테스트할 수 있습니다.

      // Arrange: 스케줄링할 작업들 준비
      const businessService = new BusinessService();
      const tasks = [
        { name: "작업1", description: "설명1" },
        { name: "작업2", description: "설명2" },
      ];

      // Act: 업무 스케줄링 (DateTimeService 사용)
      const scheduled = await businessService.scheduleBusinessTasks(
        tasks,
        new Date("2023-01-01")
      );

      // Assert: 스케줄된 작업들 확인
      expect(scheduled).toHaveLength(2);
      expect(scheduled[0].id).toBe("mocked-uuid-123"); // UUID 모킹
      expect(scheduled[0].scheduledDate).toBe("2023-12-01"); // DayJS 포맷팅 모킹
      expect(scheduled[0].isBusinessDay).toBe(true); // DayJS day() 모킹

      // 📚 배울 점:
      // - 날짜 계산이 포함된 스케줄링 로직도 모킹으로 테스트
      // - 여러 작업에 대한 일괄 처리 로직 검증
      // - 실제 날짜와 무관하게 일관된 스케줄링 결과 확인
    });

    it("모킹된 파일 시스템으로 데이터 내보내기 테스트하기", async () => {
      // 📝 파일 기반 비즈니스 로직 테스트
      // exportBusinessData()는 데이터를 파일로 내보내는 완전한 워크플로를 수행합니다.
      // 파일 시스템에 의존하는 로직도 모킹으로 안전하게 테스트할 수 있습니다.

      // Arrange: 내보낼 데이터 준비
      const businessService = new BusinessService();
      const data = [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
      ];

      // Act: 데이터 내보내기 (FileService, SecurityService, DateTimeService 사용)
      const exported = await businessService.exportBusinessData(data, "json");

      // Assert: 내보내기 결과 확인
      expect(exported.exportId).toBe("mocked-uuid-123"); // UUID 모킹
      expect(exported.recordCount).toBe(2); // 실제 데이터 개수
      expect(exported.data).toEqual(data); // 원본 데이터 보존

      // 파일 시스템 호출 확인
      expect(mockedFs.appendFile).toHaveBeenCalled();

      // 📚 배울 점:
      // - 파일 내보내기 같은 복잡한 I/O 작업도 모킹으로 테스트
      // - 실제 파일 생성 없이도 내보내기 로직의 정확성 검증
      // - 데이터 무결성과 메타데이터 생성 로직 동시 테스트
    });
  });

  // ===== 7. 고급 모듈 모킹 기법 =====
  describe("🎓 고급 모듈 모킹 기법", () => {
    it("모킹된 모듈의 구현을 런타임에 동적으로 변경하기", () => {
      // 📝 동적 모킹 변경의 활용
      // 테스트 중간에 모킹된 함수의 동작을 변경하여
      // 다양한 시나리오를 하나의 테스트에서 검증할 수 있습니다.
      // 이는 상태 변화나 조건 변경 테스트에 매우 유용합니다.

      // Arrange: 기본 모킹 상태 확인
      const securityService = new SecurityService();

      // Act & Assert: 첫 번째 호출에서는 기본 모킹값 반환
      let id1 = securityService.generateSecureId();
      expect(id1).toBe("mocked-uuid-123");

      // 런타임에 모킹 구현 변경
      (mockedUuidV4 as any).mockReturnValue("new-mocked-uuid-456");

      // 두 번째 호출에서는 새로운 값 반환
      let id2 = securityService.generateSecureId();
      expect(id2).toBe("new-mocked-uuid-456");

      // 📚 배울 점:
      // - mockReturnValue()로 런타임에 반환값 변경 가능
      // - 같은 테스트 내에서 다른 상황 시뮬레이션
      // - 상태 변화에 따른 서비스 동작 변경 테스트
      // - A/B 테스트나 조건부 로직 검증에 활용
    });

    it("부분 모킹으로 일부는 실제 구현, 일부는 모킹 사용하기", () => {
      // 📝 선택적 모킹의 고급 활용
      // 모든 함수를 모킹할 필요는 없습니다. 일부 함수는 실제 구현을 사용하고
      // 일부만 모킹하여 테스트의 정확성과 현실성의 균형을 맞출 수 있습니다.

      // Arrange: 부분 모킹 예제 - sum은 실제 계산, 나머지는 모킹

      // 특정 함수의 구현을 일시적으로 실제 로직으로 변경
      const originalSum = mockedLodash.sum;
      (mockedLodash.sum as any).mockImplementation((numbers: number[]) =>
        numbers.reduce((a: number, b: number) => a + b, 0)
      );

      // Act: 실제 계산과 모킹된 계산이 혼합된 통계 계산
      const dataService = new DataProcessingService();
      const stats = dataService.calculateStats([1, 2, 3]);

      // Assert: 혼합 결과 검증
      expect(stats.sum).toBe(6); // 실제 계산된 값 (1+2+3)
      expect(stats.mean).toBe(50); // 모킹된 값
      expect(stats.min).toBe(10); // 모킹된 값
      expect(stats.max).toBe(90); // 모킹된 값

      // 원래 모킹 상태로 복원
      mockedLodash.sum = originalSum;

      // 📚 배울 점:
      // - mockImplementation()으로 실제 로직 구현 가능
      // - 핵심 로직은 실제로, 부수적인 것은 모킹으로 테스트
      // - 테스트의 신뢰성과 격리성의 균형점 찾기
      // - 복잡한 계산 로직의 부분적 검증
    });

    it("모킹된 모듈의 호출 패턴과 순서를 정밀하게 검증하기", async () => {
      // 📝 호출 추적과 검증의 고급 기법
      // 단순히 함수가 호출되었는지뿐만 아니라, 언제, 어떤 순서로, 어떤 인자로
      // 호출되었는지까지 정밀하게 검증할 수 있습니다.

      // Arrange: 모킹된 함수들 초기화
      mockedFs.mkdir.mockResolvedValue(undefined);
      mockedFs.appendFile.mockResolvedValue(undefined);
      (mockedUuidV4 as any).mockReturnValue("mocked-uuid-123"); // 기본값으로 재설정

      // Act: 복잡한 파일 작업 실행
      const fileService = new FileService();
      await fileService.writeLog({ message: "test" });

      // Assert: 정밀한 호출 검증

      // 1. 기본 호출 여부 확인
      expect(mockedFs.mkdir).toHaveBeenCalled();
      expect(mockedFs.appendFile).toHaveBeenCalled();

      // 2. 호출 인자의 상세 검증
      expect(mockedFs.mkdir).toHaveBeenCalledWith(
        expect.stringContaining("logs"), // 로그 디렉토리 포함
        { recursive: true } // 정확한 옵션 전달
      );

      // 3. 복잡한 인자 패턴 검증
      expect(mockedFs.appendFile).toHaveBeenCalledWith(
        expect.stringContaining(".json"), // JSON 파일 확장자
        expect.stringContaining("mocked-uuid-123") // UUID 포함된 내용
      );

      // 4. 호출 횟수 검증
      expect(fs.mkdir).toHaveBeenCalledTimes(1);
      expect(fs.appendFile).toHaveBeenCalledTimes(1);

      // 📚 배울 점:
      // - expect.stringContaining()으로 부분 문자열 검증
      // - expect.any(Type)으로 타입 기반 검증
      // - toHaveBeenCalledTimes()로 정확한 호출 횟수 확인
      // - 복잡한 객체 인자도 부분적으로 검증 가능
      // - 실제 서비스의 호출 패턴 정밀 분석
    });

    it("에러 상황도 모킹하여 예외 처리 로직 테스트하기", async () => {
      // 📝 에러 상황 모킹의 중요성
      // 실제 서비스에서는 다양한 에러 상황이 발생할 수 있습니다.
      // 모킹을 사용하면 이런 예외 상황도 안전하게 시뮬레이션할 수 있습니다.

      // Arrange: 파일 시스템 에러 시뮬레이션
      const fileService = new FileService();

      // 파일 읽기 실패 상황 모킹
      mockedFs.readFile.mockRejectedValue(new Error("File not found"));

      // Act & Assert: 에러 처리 확인
      await expect(fileService.readConfig("nonexistent.json")).rejects.toThrow(
        "File not found"
      );

      // 호출 시도가 있었는지 확인
      expect(mockedFs.readFile).toHaveBeenCalled();

      // 📚 배울 점:
      // - mockRejectedValue()로 비동기 에러 시뮬레이션
      // - 실제 에러 상황 없이도 예외 처리 로직 테스트
      // - expect().rejects.toThrow()로 에러 검증
      // - 견고한 서비스를 위한 에러 케이스 테스트
    });
  });
});
