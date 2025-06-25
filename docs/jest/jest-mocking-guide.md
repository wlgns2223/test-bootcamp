# Jest Mocking과 Spy 가이드

Jest의 mocking과 spy 기능을 단계별로 학습하고 실습해보세요.

## 📚 학습 목표

- Jest의 mock 함수 생성과 사용법 이해
- Spy 기능을 활용한 기존 함수/메서드 감시
- 외부 의존성을 mocking하는 방법
- NPM 모듈 모킹으로 실제 라이브러리 대체
- 복잡한 서비스 간 의존성 테스트
- Mock 상태 관리와 검증 방법

## 📂 파일 구조

```
src/
├── utils/
│   ├── mockingPractice.ts              # 실습용 함수와 클래스
│   ├── externalLibs.ts                 # 외부 라이브러리 시뮬레이션
│   └── environment.ts                  # 환경설정 모듈
├── examples/
│   └── jest-mocking-explanation.test.ts  # 상세 설명과 예제
└── __tests__/
    ├── mockingPractice.test.ts         # 기본 개념 + NPM 모듈 모킹
    ├── mockingPractice.template.test.ts   # 실습 템플릿
    └── mockingPractice.completed.test.ts  # 완성 답안
```

## 🎯 핵심 개념

### 1. Mock 함수 (jest.fn())

Mock 함수는 실제 함수를 대체하여 테스트에서 호출 여부, 인자, 반환값 등을 제어할 수 있습니다.

```typescript
// Mock 함수 생성
const mockFunction = jest.fn();

// 반환값 설정
mockFunction.mockReturnValue("mocked value");
mockFunction.mockReturnValueOnce("once value");

// 비동기 반환값 설정
mockFunction.mockResolvedValue("async success");
mockFunction.mockRejectedValue(new Error("async error"));

// 구현체 설정
mockFunction.mockImplementation((x, y) => x + y);
```

### 2. Spy (jest.spyOn())

Spy는 기존 함수나 메서드를 감시하여 호출 정보를 수집하고, 필요시 동작을 변경할 수 있습니다.

```typescript
// 메서드를 spy로 감시
const spy = jest.spyOn(object, "method");

// spy의 동작 변경
spy.mockReturnValue("new value");

// 원래 동작으로 복원
spy.mockRestore();
```

## 📦 NPM 모듈 모킹 (Module Mocking)

실제 npm 패키지들을 모킹하는 방법을 학습합니다.

### jest.mock() 기본 사용법

```typescript
// 파일 상단에 모듈 모킹 선언
jest.mock("uuid", () => ({
  v4: jest.fn(() => "test-uuid-123"),
}));

// 테스트에서 사용
import { v4 as uuidv4 } from "uuid";
const id = uuidv4(); // 'test-uuid-123' 반환
```

### 📚 주요 모킹 대상 라이브러리

#### 1. UUID 모킹

```typescript
jest.mock("uuid", () => ({
  v4: jest.fn(() => "mocked-uuid-123"),
}));

// 사용 예시
import { SecurityService } from "../utils/mockingPractice";
const securityService = new SecurityService();
const id = securityService.generateSecureId(); // 'mocked-uuid-123'
```

#### 2. Crypto 모킹

```typescript
jest.mock("crypto", () => ({
  randomBytes: jest.fn(() => Buffer.from("mocked-bytes")),
  createHash: jest.fn(() => ({
    update: jest.fn().mockReturnThis(),
    digest: jest.fn(() => "mocked-hash"),
  })),
  pbkdf2Sync: jest.fn(() => Buffer.from("mocked-pbkdf2")),
}));
```

#### 3. File System 모킹

```typescript
jest.mock("fs/promises", () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  appendFile: jest.fn(),
  mkdir: jest.fn(),
  stat: jest.fn(),
}));

// 테스트에서 설정
const fs = require("fs/promises");
fs.readFile.mockResolvedValue('{"test": "data"}');
fs.mkdir.mockResolvedValue(undefined);
```

#### 4. Path 모킹

```typescript
jest.mock("path", () => ({
  resolve: jest.fn((p) => `/mocked/path/${p}`),
  join: jest.fn((...paths) => paths.join("/")),
}));
```

#### 5. Lodash 모킹

```typescript
jest.mock("lodash", () => ({
  chain: jest.fn(() => ({
    filter: jest.fn().mockReturnThis(),
    map: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    value: jest.fn(() => []),
  })),
  groupBy: jest.fn(() => ({})),
  sum: jest.fn(() => 100),
  mean: jest.fn(() => 50),
  debounce: jest.fn((fn) => fn),
}));
```

#### 6. DayJS 모킹

```typescript
jest.mock("dayjs", () => {
  const mockDayjs = jest.fn(() => ({
    toISOString: jest.fn(() => "2023-01-01T00:00:00.000Z"),
    format: jest.fn(() => "2023-01-01"),
    add: jest.fn().mockReturnThis(),
    diff: jest.fn(() => 5),
    day: jest.fn(() => 1),
  }));
  return mockDayjs;
});
```

### 🎯 모킹 고급 기법

#### 1. 런타임 모킹 구현 변경

```typescript
const { v4 } = require("uuid");

// 첫 번째 호출
v4.mockReturnValue("first-uuid");
expect(service.generateId()).toBe("first-uuid");

// 런타임에 구현 변경
v4.mockImplementation(() => "runtime-changed-uuid");
expect(service.generateId()).toBe("runtime-changed-uuid");
```

#### 2. 부분 모킹 (Partial Mocking)

```typescript
jest.mock("lodash", () => ({
  ...jest.requireActual("lodash"), // 실제 lodash 기능 유지
  sum: jest.fn(() => 100), // sum만 모킹
}));
```

#### 3. 에러 상황 모킹

```typescript
const fs = require("fs/promises");
fs.readFile.mockRejectedValue(new Error("파일을 찾을 수 없습니다"));

await expect(service.readConfig()).rejects.toThrow(
  "설정 파일을 읽을 수 없습니다"
);
```

#### 4. 체인 가능한 객체 모킹

```typescript
jest.mock("crypto", () => ({
  createHash: jest.fn(() => ({
    update: jest.fn().mockReturnThis(), // 체이닝을 위한 자기 반환
    digest: jest.fn(() => "final-hash"),
  })),
}));

// 체이닝 사용 가능
crypto.createHash("sha256").update("data").digest("hex");
```

## 🏗️ 실습 단계

### 1단계: 설명 코드 읽기

`src/examples/jest-mocking-explanation.test.ts` 파일을 읽고 각 개념을 이해하세요.

### 2단계: 템플릿으로 실습

`src/__tests__/mockingPractice.template.test.ts` 파일의 TODO를 완성하세요.

실습 방법:

1. `describe.skip`을 `describe`로 변경하여 테스트 활성화
2. TODO 주석을 따라 코드 작성
3. 테스트 실행하여 통과 확인

### 3단계: 답안 확인

`src/__tests__/mockingPractice.completed.test.ts` 파일과 비교하여 학습하세요.

## 🎪 실습 주제

### 1. Mock 함수 기본

- `jest.fn()` 사용법
- 반환값 설정 (`mockReturnValue`, `mockReturnValueOnce`)
- 비동기 mock (`mockResolvedValue`, `mockRejectedValue`)
- 호출 검증

### 2. Spy 기본

- `jest.spyOn()` 사용법
- 기존 메서드 감시
- 외부 의존성 spy (console.log, Date.now 등)
- spy 복원

### 3. 의존성 주입 Mocking

- API 클라이언트 mocking
- 서비스 간 의존성 테스트
- 인터페이스 기반 mocking

### 4. 복합 서비스 테스트

- 여러 의존성을 가진 서비스 테스트
- 호출 순서와 인자 검증
- 에러 시나리오 테스트

### 5. 고급 Mocking

- 파일 시스템 mocking
- 시간 관련 함수 mocking (Date.now, Math.random)
- 조건부 반환값

### 6. Mock 상태 관리

- 호출 정보 분석 (`mock.calls`, `mock.results`)
- Mock 초기화 전략
- 테스트 간 격리

## 🧪 실습 서비스들

### 1. FileService

파일 시스템 관련 작업을 모킹하는 실습

- 설정 파일 읽기
- 로그 파일 작성
- 파일 통계 정보 가져오기

### 2. SecurityService

보안 관련 기능을 모킹하는 실습

- UUID 생성
- 패스워드 해싱
- API 키 생성
- 데이터 암호화

### 3. DataProcessingService

데이터 처리 라이브러리 모킹 실습

- 데이터 변환 파이프라인
- 그룹화 및 통계 계산
- 디바운싱

### 4. DateTimeService

날짜/시간 라이브러리 모킹 실습

- 날짜 포맷팅
- 날짜 계산
- 업무일 체크
- 스케줄 생성

### 5. BusinessService

복합 서비스 모킹 실습

- 비즈니스 보고서 생성
- 작업 스케줄링
- 데이터 내보내기

## 🔍 모킹 검증 패턴

### 1. 호출 검증

```typescript
// 호출 여부 확인
expect(mockFn).toHaveBeenCalled();

// 호출 횟수 확인
expect(mockFn).toHaveBeenCalledTimes(2);

// 특정 인자로 호출 확인
expect(mockFn).toHaveBeenCalledWith("expected", "arguments");

// n번째 호출의 인자 확인
expect(mockFn).toHaveBeenNthCalledWith(2, "second", "call");
```

### 2. 복잡한 객체 검증

```typescript
expect(mockFn).toHaveBeenCalledWith(
  expect.objectContaining({
    id: expect.any(String),
    timestamp: expect.any(String),
  })
);

expect(mockFn).toHaveBeenCalledWith(
  expect.stringContaining("expected-substring")
);
```

### 3. 모킹 상태 관리

```typescript
describe("테스트 그룹", () => {
  beforeEach(() => {
    // 각 테스트 전에 모킹 상태 초기화
    jest.clearAllMocks();
  });

  afterEach(() => {
    // 테스트 후 정리
    jest.restoreAllMocks();
  });
});
```

## 📊 실습 진행 순서

### 1. 기본 개념 이해 (20분)

1. `mockingPractice.test.ts` 실행하여 NPM 모듈 모킹 개념 학습
2. 각종 모킹 패턴 분석
3. 호출 검증 방법 이해

### 2. 단계별 실습 (40분)

1. `mockingPractice.template.test.ts`에서 TODO 주석 따라 실습
2. UUID, Crypto부터 시작하여 복잡한 서비스까지 점진적 학습
3. `describe.skip`을 `describe`로 변경하며 단계별 진행

### 3. 고급 패턴 실습 (30분)

1. 런타임 모킹 구현 변경
2. 부분 모킹 기법
3. 에러 상황 모킹
4. 복잡한 의존성 관계 테스트

### 4. 검증 및 정리 (10분)

1. `mockingPractice.completed.test.ts`와 비교
2. 놓친 부분 확인
3. 실무 적용 방안 토론

## 💡 실무 활용 팁

### 1. 모킹할 것과 하지 말 것

**모킹해야 할 것:**

- 외부 API 호출
- 파일 시스템 작업
- 데이터베이스 연결
- 시간 관련 함수 (Date, setTimeout)
- 랜덤 함수
- 외부 라이브러리

**모킹하지 말아야 할 것:**

- 테스트 대상 함수 자체
- 순수 함수 (side effect 없는 함수)
- 간단한 유틸리티 함수

### 2. 모킹 설계 원칙

- **최소한의 모킹**: 꼭 필요한 부분만 모킹
- **명확한 의도**: 왜 모킹하는지 명확히
- **실제와 유사하게**: 실제 동작과 비슷하게 모킹
- **테스트 격리**: 각 테스트는 독립적으로

### 3. 일반적인 실수들

- 너무 많은 것을 모킹하기
- 모킹 설정을 잊고 실제 함수 호출
- 모킹 상태를 테스트 간에 공유
- 모킹된 함수의 타입 불일치

## 🚀 다음 단계

이 가이드를 완료한 후에는:

1. 실제 프로젝트에 테스트 도입
2. CI/CD 파이프라인에 테스트 통합
3. 코드 커버리지 측정 및 개선
4. E2E 테스트로 확장

Mock과 Spy를 마스터하면 더 안정적이고 예측 가능한 테스트를 작성할 수 있습니다! 🎯
