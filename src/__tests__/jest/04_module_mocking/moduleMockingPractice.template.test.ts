// 🎯 Jest 모듈 모킹 완전 정복 - NPM 모듈 모킹 마스터하기 (템플릿)
// 신입 프론트엔드 개발자가 반드시 알아야 할 모듈 모킹 핵심 개념을 마스터하세요!

// ===== 외부 NPM 모듈 모킹 섹션 =====
// TODO: 필요한 모듈들을 모킹하세요
//
// 힌트: 다음과 같은 모듈들을 모킹해야 합니다:
// - uuid: v4 함수를 모킹
// - crypto: randomBytes, createHash, pbkdf2Sync, createCipher 등을 모킹
// - fs/promises: readFile, writeFile, appendFile, mkdir, stat 등을 모킹
// - path: resolve, join 등을 모킹
// - lodash: chain, groupBy, isEmpty, sum, mean, min, max, debounce 등을 모킹
// - dayjs: dayjs 함수와 그 메서드들을 모킹

jest.mock("uuid", () => ({
  v4: jest.fn().mockReturnValue("mocked-uuid"),
}));

jest.mock("crypto", () => ({
  randomBytes: jest.fn().mockReturnValue("mocked-bytes"),
  createHash: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  digest: jest.fn().mockReturnValue("mocked-hash"),
  pbkdf2Sync: jest.fn().mockReturnValue("mocked-key"),
}));

jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
  mkdir: jest.fn(),
  appendFile: jest.fn(),
}));

jest.mock("path", () => ({
  resolve: jest.fn(),
  join: jest.fn(),
}));

jest.mock("dayjs", () => {
  const dayjsMock = jest.fn(() => ({
    toISOString: jest.fn().mockReturnValue("2025-06-30"),
    format: jest.fn(),
  }));

  return dayjsMock;
});

import {
  SecurityService,
  FileService,
  DataProcessingService,
  DateTimeService,
  BusinessService,
} from "../../../utils/mockingPractice";

import { v4 } from "uuid";
import * as crypto from "crypto";
import * as fs from "fs/promises";
import * as path from "path";
import { mkdir } from "fs";

const mockedV4 = v4 as jest.MockedFunction<typeof v4>;
const mockedCrypto = crypto as jest.Mocked<typeof crypto>;
const mockedFileSystem = fs as jest.Mocked<typeof fs>;
const mockedPath = path as jest.Mocked<typeof path>;

describe("📦 NPM 모듈 모킹 실습", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ===== 1. UUID 모킹 =====
  describe("🆔 UUID 모킹", () => {
    it("uuid 모듈을 모킹하고 SecurityService 테스트하기", () => {
      const securityService = new SecurityService();

      const result = securityService.generateSecureId();

      // expect(result).toBe("0fa01032-86ef-475e-ba93-9c6e88dd62cd");
      expect(result).toBe("mocked-uuid");
    });
  });

  // ===== 2. Crypto 모킹 =====
  describe("🔐 Crypto 모킹", () => {
    it("crypto 모듈을 모킹하고 API 키 생성 테스트하기", () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. SecurityService 인스턴스 생성
      // 2. generateApiKey() 메서드 호출
      // 3. 반환값이 모킹된 해시값인지 검증
      // 4. crypto.randomBytes와 createHash가 호출되었는지 검증

      const securityService = new SecurityService();

      const result = securityService.generateApiKey();

      expect(result).toEqual("mocked-hash");
    });

    it("password hashing 기능 테스트하기", () => {
      const securityService = new SecurityService();
      const fakePassword = "fake-password";

      const result = securityService.hashPassword(fakePassword);

      expect(result).toContain(":");
      expect(mockedCrypto.pbkdf2Sync).toHaveBeenCalledWith(fakePassword, "mocked-bytes", 10000, 64, "sha512");
    });
  });

  // ===== 3. File System 모킹 =====
  describe("📁 File System 모킹", () => {
    it("fs/promises 모듈을 모킹하고 파일 읽기 테스트하기", async () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. fs.readFile을 모킹하여 JSON 문자열 반환하도록 설정
      // 2. FileService 인스턴스 생성
      // 3. readConfig() 메서드 호출
      // 4. 반환값이 올바른 객체인지 검증
      // 5. fs.readFile이 올바른 경로로 호출되었는지 검증
      mockedFileSystem.readFile.mockResolvedValue('{"content": "something"}');
      mockedPath.resolve;
      const fileService = new FileService();

      const result = await fileService.readConfig();

      expect(result).toEqual({ content: "something" });
    });

    it("로그 파일 작성 기능 테스트하기", async () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. fs.mkdir과 fs.appendFile을 모킹
      // 2. FileService 인스턴스 생성
      // 3. writeLog() 메서드 호출
      // 4. 반환값 검증
      // 5. fs 메서드들이 올바르게 호출되었는지 검증

      const fileService = new FileService();
      const logData = { log: "something" };

      const result = await fileService.writeLog(logData);

      expect(result).toEqual({
        timestamp: "2025-06-30",
        id: "mocked-uuid",
        data: logData,
      });
    });

    it("파일 통계 정보 가져오기 테스트", async () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. fs.stat을 모킹하여 stats 객체 반환
      // 2. FileService 인스턴스 생성
      // 3. getFileStats() 메서드 호출
      // 4. 반환값이 올바른 형태인지 검증
    });
  });

  // ===== 4. Lodash 모킹 =====
  describe("🔧 Lodash 모킹", () => {
    it("lodash 체인 기능을 모킹하고 데이터 처리 테스트하기", () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. 테스트 데이터 준비
      // 2. DataProcessingService 인스턴스 생성
      // 3. processUserData() 메서드 호출
      // 4. 반환값이 모킹된 값인지 검증
      // 5. lodash.chain이 호출되었는지 검증
    });

    it("그룹화 및 통계 기능 테스트하기", () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. 테스트 데이터 준비
      // 2. DataProcessingService의 groupByDepartment와 calculateStats 호출
      // 3. 반환값이 모킹된 값들인지 검증
      // 4. lodash 함수들이 호출되었는지 검증
    });

    it("debounce 기능 테스트하기", () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. DataProcessingService 인스턴스 생성
      // 2. debounceProcess 속성 확인
      // 3. lodash.debounce가 호출되었는지 검증
    });
  });

  // ===== 5. DayJS 모킹 =====
  describe("📅 DayJS 모킹", () => {
    it("dayjs 모듈을 모킹하고 날짜 서비스 테스트하기", () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. DateTimeService 인스턴스 생성
      // 2. getCurrentTimestamp() 메서드 호출
      // 3. 반환값이 모킹된 날짜 문자열인지 검증
      // 4. dayjs가 호출되었는지 검증
    });

    it("날짜 포맷팅 및 계산 기능 테스트하기", () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. DateTimeService의 formatDate와 getDaysBetween 호출
      // 2. 결과 검증 (dayjs가 모킹되어 있음)
      // 3. dayjs 메서드들이 호출되었는지 검증
    });

    it("업무일 계산 및 스케줄 생성 테스트하기", () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. DateTimeService의 업무일 관련 메서드들 호출
      // 2. 결과 검증
      // 3. dayjs가 호출되었는지 검증
    });
  });

  // ===== 6. 통합 서비스 모킹 =====
  describe("🏢 통합 서비스 모킹", () => {
    it("createBusinessReport는 리포트 데이터를 입력하면 리포트를 반환한다.", async () => {
      const content = '{"content":"something"}';
      mockedFileSystem.readFile.mockResolvedValue(content);

      const businessService = new BusinessService();

      const fakeUser = {
        active: true,
        firstName: "hello",
        lastName: "world",
      };
      const reportData = {
        users: [
          {
            ...fakeUser,
          },
        ],
      };

      const result = await businessService.createBusinessReport(reportData);

      expect(result).toEqual(
        expect.objectContaining({
          id: "mocked-uuid",
          data: expect.objectContaining({
            statistics: null,
            processed: expect.arrayContaining([
              expect.objectContaining({
                id: "mocked-uuid",
                processedAt: "2025-06-30",
                fullName: `${fakeUser.firstName} ${fakeUser.lastName}`,
              }),
            ]),
          }),
        })
      );
    });

    it("exportBusinessData csv파일을 입력하면 데이터 정보가 반환된다. ", async () => {
      const businessService = new BusinessService();
      // jest.spyOn(businessService as any, "convertToCSV").mockReturnValue([]);

      const convertToCSVMock = jest.fn();
      convertToCSVMock.mockReturnValue([]);
      const result = await businessService.exportBusinessData([], "csv", convertToCSVMock);

      expect(convertToCSVMock).toHaveBeenCalled();
      expect(result).toEqual({
        exportId: "mocked-uuid",
        timestamp: "2025-06-30",
        format: "csv",
        recordCount: 0,
        data: [],
      });
    });

    it("업무 스케줄링 기능의 모든 의존성 테스트하기", async () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. 테스트 데이터와 시작 날짜 준비
      // 2. BusinessService의 scheduleBusinessTasks 호출
      // 3. 스케줄링 결과 검증
      // 4. 모든 의존성 호출 확인
    });
  });

  // ===== 7. 고급 모듈 모킹 기법 =====
  describe("🎓 고급 모듈 모킹 기법", () => {
    it("런타임에 모킹 구현 변경하기", () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. 초기 모킹 값으로 테스트
      // 2. 런타임에 모킹 구현 변경
      // 3. 변경된 값으로 테스트
      // 4. 호출 횟수 확인
      //
      // 힌트:
      // - require('module').method.mockReturnValue('new-value')
    });

    it("부분 모킹으로 일부 기능만 모킹하기", () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. 이미 전체 모킹이 설정되어 있으므로 모킹된 동작 확인
      // 2. 모킹된 함수들의 타입과 동작 검증
      //
      // 힌트:
      // - jest.requireActual을 사용하면 실제 모듈과 혼합 가능
    });

    it("모킹된 모듈의 호출 패턴 검증하기", async () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. 복잡한 비즈니스 로직 실행
      // 2. 호출 순서와 패턴 검증
      // 3. 각 모듈의 호출 횟수와 인자 확인
      //
      // 힌트:
      // - mock.calls로 호출 기록 확인
      // - toHaveBeenNthCalledWith로 n번째 호출 검증
    });

    it("모킹된 모듈의 에러 처리 테스트하기", async () => {
      // TODO: 이 테스트를 완성하세요
      //
      // 단계:
      // 1. 모킹된 함수가 에러를 throw하도록 설정
      // 2. 에러 상황에서 서비스 동작 확인
      // 3. 에러 메시지와 처리 로직 검증
      // 4. 에러 복구 테스트
      //
      // 힌트:
      // - mockRejectedValue 또는 mockImplementation 사용
      // - expect().rejects.toThrow() 사용
    });
  });
});
