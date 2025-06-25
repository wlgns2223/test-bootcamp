# 🎯 Jest & React Testing Library 완전 정복 강의

신입 프론트엔드 개발자를 위한 체계적인 테스트 학습 프로젝트입니다. Jest와 React Testing Library를 사용하여 실무에서 필요한 모든 테스트 기법을 마스터할 수 있습니다.

## 📋 목차

- [🎯 Jest & React Testing Library 완전 정복 강의](#-jest--react-testing-library-완전-정복-강의)
  - [📋 목차](#-목차)
  - [🚀 시작하기](#-시작하기)
    - [설치](#설치)
    - [테스트 실행](#테스트-실행)
  - [📚 학습 과정](#-학습-과정)
    - [1️⃣ Jest 기본 테스트 (01_basic_test)](#1️⃣-jest-기본-테스트-01_basic_test)
    - [2️⃣ Jest Matchers 완전정복 (02_matchers)](#2️⃣-jest-matchers-완전정복-02_matchers)
    - [3️⃣ Mocking과 Spy 실습 (03_mocking)](#3️⃣-mocking과-spy-실습-03_mocking)
    - [4️⃣ NPM 모듈 모킹 (04_module_mocking)](#4️⃣-npm-모듈-모킹-04_module_mocking)
    - [5️⃣ 비동기 API 테스트 (05_async_api_test)](#5️⃣-비동기-api-테스트-05_async_api_test)
    - [6️⃣ 나쁜 테스트 케이스 분석 (06_bad_test_cases)](#6️⃣-나쁜-테스트-케이스-분석-06_bad_test_cases)
  - [🎓 실습 방법](#-실습-방법)
    - [템플릿 파일 사용법](#템플릿-파일-사용법)
    - [완성 답안 확인](#완성-답안-확인)
  - [🧪 테스트 명령어](#-테스트-명령어)
  - [📦 주요 의존성](#-주요-의존성)
  - [🏗️ 프로젝트 구조](#️-프로젝트-구조)
  - [💡 학습 팁](#-학습-팁)
  - [🔧 문제 해결](#-문제-해결)

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
npm install

# 또는
yarn install
```

### 테스트 실행

```bash
# 모든 테스트 실행
npm test

# 테스트 watch 모드
npm run test:watch

# 커버리지 확인
npm run test:coverage

# 특정 파일만 테스트
npm test -- mathUtils.test.ts
```

## 📚 학습 과정

### 1️⃣ Jest 기본 테스트 (01_basic_test)

**학습 목표**: Jest의 기본 개념과 AAA 패턴을 익힙니다.

```bash
# 기본 테스트 실행
npm test src/__tests__/jest/01_basic_test/
```

**주요 내용**:

- ✅ AAA 패턴 (Arrange, Act, Assert)
- ✅ 기본 테스트 구조 작성
- ✅ describe와 it 블록 사용법
- ✅ 간단한 함수 테스트

**파일 구조**:

- `mathUtils.test.ts` - 완성된 예제
- `mathUtils.template.ts` - 실습용 템플릿
- `mathUtils.completed.test.ts` - 완성 답안

### 2️⃣ Jest Matchers 완전정복 (02_matchers)

**학습 목표**: Jest의 다양한 Matcher를 마스터합니다.

```bash
# Matcher 테스트 실행
npm test src/__tests__/jest/02_matchers/
```

**주요 내용**:

- ✅ 기본 Matchers (`toBe`, `toEqual`, `toBeNull`)
- ✅ 숫자 Matchers (`toBeGreaterThan`, `toBeCloseTo`)
- ✅ 문자열 Matchers (`toMatch`, `toContain`)
- ✅ 배열/객체 Matchers (`toContain`, `toHaveProperty`)
- ✅ 예외 처리 Matchers (`toThrow`)
- ✅ 비동기 Matchers (`resolves`, `rejects`)

### 3️⃣ Mocking과 Spy 실습 (03_mocking)

**학습 목표**: Jest의 Mock 함수와 Spy 기능을 마스터합니다.

```bash
# Mocking 테스트 실행
npm test src/__tests__/jest/03_mocking/
```

**주요 내용**:

- ✅ Mock 함수 생성 (`jest.fn()`)
- ✅ Mock 반환값 설정 (`mockReturnValue`, `mockResolvedValue`)
- ✅ Spy 기능 (`jest.spyOn`)
- ✅ 의존성 주입을 통한 Mocking
- ✅ 복합 서비스 Mocking
- ✅ 파일 시스템 Mocking

### 4️⃣ NPM 모듈 모킹 (04_module_mocking)

**학습 목표**: 외부 NPM 모듈을 모킹하는 고급 기법을 학습합니다.

```bash
# 모듈 모킹 테스트 실행
npm test src/__tests__/jest/04_module_mocking/
```

**주요 내용**:

- ✅ NPM 모듈 모킹 (`jest.mock()`)
- ✅ UUID, Crypto, File System 모킹
- ✅ Lodash, DayJS 모킹
- ✅ 부분 모킹 (Partial Mocking)
- ✅ 런타임 모킹 변경
- ✅ 모킹 호출 패턴 검증

**실습 예제**:

- 🆔 UUID 모킹으로 예측 가능한 ID 생성
- 🔐 Crypto 모킹으로 보안 함수 테스트
- 📁 File System 모킹으로 파일 작업 테스트
- 📅 날짜 라이브러리 모킹

### 5️⃣ 비동기 API 테스트 (05_async_api_test)

**학습 목표**: 비동기 코드와 API 호출을 테스트하는 방법을 학습합니다.

```bash
# 비동기 테스트 실행
npm test src/__tests__/jest/05_async_api_test/
```

**주요 내용**:

- ✅ Promise 기반 테스트
- ✅ async/await 테스트
- ✅ API 호출 모킹
- ✅ 에러 처리 테스트
- ✅ 타임아웃 설정

### 6️⃣ 나쁜 테스트 케이스 분석 (06_bad_test_cases)

**학습 목표**: 테스트 안티패턴을 이해하고 개선 방법을 학습합니다.

```bash
# 나쁜 테스트 케이스 분석
npm test src/__tests__/jest/06_bad_test_cases/
```

**주요 안티패턴**:

- 🚨 취약한 테스트 (Fragile Tests)
- 🐌 느린 테스트 (Slow Tests)
- 🧩 복잡한 테스트 (Complex Tests)
- 🔄 중복된 테스트 (Duplicated Tests)
- 🔗 테스트 간 의존성
- ❓ 불명확한 테스트
- 💥 사이드 이펙트가 있는 테스트
- 🎲 비결정적 테스트 (Flaky Tests)
- 🏗️ 싱글톤과 정적 의존성

## 🎓 실습 방법

### 템플릿 파일 사용법

1. **`.template.test.ts` 파일 열기**: TODO 주석이 있는 실습용 파일
2. **TODO 주석 따라하기**: 단계별로 코드 작성
3. **describe.skip을 describe로 변경**: 테스트 활성화
4. **테스트 실행하여 확인**: `npm test` 명령어로 검증

```typescript
// 예시: TODO 주석을 따라 코드 작성
describe.skip("Mock 함수 기본 실습", () => {
  // skip 제거
  it("mock 함수를 생성하고 호출 검증하기", () => {
    // TODO: jest.fn()으로 mock 함수를 생성하세요
    const mockCallback = jest.fn();

    // TODO: mock 함수를 다양한 인자로 여러 번 호출하세요
    mockCallback("hello");
    mockCallback("world", 123);

    // TODO: 함수가 호출되었는지 확인
    expect(mockCallback).toHaveBeenCalled();
  });
});
```

### 완성 답안 확인

- **`.completed.test.ts` 파일**: 완성된 답안 코드
- **비교 학습**: 자신의 코드와 비교하여 학습
- **모범 사례**: 실무에서 사용하는 패턴 확인

## 🧪 테스트 명령어

```bash
# 전체 테스트 실행
npm test

# 특정 폴더 테스트
npm test src/__tests__/jest/01_basic_test/

# 특정 파일 테스트
npm test -- mathUtils.test.ts

# 패턴으로 테스트 필터링
npm test -- --testNamePattern="Mock 함수"

# Watch 모드 (파일 변경 시 자동 실행)
npm run test:watch

# 커버리지 리포트
npm run test:coverage

# Verbose 모드 (상세한 출력)
npm test -- --verbose
```

## 📦 주요 의존성

```json
{
  "dependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "dayjs": "^1.11.13",
    "lodash": "^4.17.21",
    "uuid": "^11.1.0"
  },
  "devDependencies": {
    "@types/jest": "^30.0.0",
    "jest": "^30.0.0",
    "jest-environment-jsdom": "^30.0.0"
  }
}
```

## 🏗️ 프로젝트 구조

```
src/
├── __tests__/
│   ├── jest/                          # Jest 테스트
│   │   ├── 01_basic_test/             # 기본 테스트
│   │   ├── 02_matchers/               # Matcher 실습
│   │   ├── 03_mocking/                # Mocking & Spy
│   │   ├── 04_module_mocking/         # 모듈 모킹
│   │   ├── 05_async_api_test/         # 비동기 테스트
│   │   └── 06_bad_test_cases/         # 안티패턴 분석
│   └── rtl/                           # React Testing Library
├── utils/                             # 테스트 대상 유틸리티
│   ├── mathUtils.ts                   # 수학 함수
│   ├── mockingPractice.ts             # 모킹 실습용 함수
│   ├── apiUtils.ts                    # API 관련 함수
│   └── badExamples.ts                 # 안티패턴 예제
└── app/                               # Next.js 앱
```

## 💡 학습 팁

1. **순서대로 학습**: 01부터 06까지 순차적으로 진행
2. **실습 위주**: 코드를 직접 작성하며 학습
3. **테스트 주도**: 실패하는 테스트부터 작성
4. **문서 참고**: [Jest 공식 문서](https://jestjs.io/), [Testing Library 문서](https://testing-library.com/)
5. **반복 학습**: 어려운 부분은 여러 번 반복

**추천 학습 순서**:

```
1. 기본 테스트 작성법 익히기
2. 다양한 Matcher 사용법 마스터
3. Mock과 Spy 기능 이해
4. 외부 모듈 모킹 기법 학습
5. 비동기 코드 테스트 방법
6. 안티패턴 분석으로 실력 향상
```

## 🔧 문제 해결

### 자주 발생하는 문제

**1. 테스트가 실행되지 않을 때**

```bash
# Jest 설정 확인
npm test -- --init

# 캐시 삭제
npm test -- --clearCache
```

**2. 모듈을 찾을 수 없을 때**

```bash
# 의존성 재설치
rm -rf node_modules package-lock.json
npm install
```

**3. 타입스크립트 오류**

```bash
# 타입 정의 설치
npm install --save-dev @types/jest
```

**4. 무한루프 발생 시**

- `getBusinessDaysInMonth` 함수의 루프 조건 확인
- 이미 수정된 안전한 버전 사용

### 도움이 필요할 때

1. **완성 답안 확인**: `.completed.test.ts` 파일 참고
2. **공식 문서**: Jest, Testing Library 문서 확인
3. **이슈 제기**: GitHub 이슈로 질문
4. **커뮤니티**: Jest Discord, Stack Overflow 활용

---

**Happy Testing! 🎉**

이 프로젝트를 통해 프론트엔드 테스트의 모든 것을 마스터하여 더 나은 개발자가 되시길 바랍니다!
