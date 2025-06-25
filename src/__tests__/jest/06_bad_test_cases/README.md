# 06_bad_test_cases - 나쁜 테스트 케이스 학습 자료

신입 프론트엔드 개발자를 위한 Jest/RTL 테스트에서 피해야 할 안티패턴과 개선 방법을 학습하는 자료입니다.

## 📂 파일 구조

```
06_bad_test_cases/
├── README.md                          # 이 파일
├── badTestCases.test.ts               # 📚 설명용 - 강의에서 사용
├── badTestCases.template.test.ts      # 🛠️ 실습용 - 학습자가 작업
└── badTestCases.completed.test.ts     # ✅ 정답용 - 완성된 코드
```

## 🎯 학습 목표

다음 9가지 테스트 안티패턴을 이해하고 개선 방법을 학습합니다:

1. **🚨 취약한 테스트 (Fragile Tests)** - 구현 세부사항에 의존하는 테스트
2. **🐌 느린 테스트 (Slow Tests)** - 불필요한 지연과 실제 네트워크 호출
3. **🧩 복잡한 테스트 (Complex Tests)** - 한 테스트에서 너무 많은 것을 검증
4. **🔄 중복된 테스트 (Duplicated Tests)** - 같은 로직을 반복하는 테스트
5. **🔗 테스트 간 의존성** - 테스트 순서에 의존하는 문제
6. **❓ 불명확한 테스트** - 의도가 명확하지 않은 테스트
7. **💥 사이드 이펙트가 있는 테스트** - 전역 상태를 변경하는 테스트
8. **🎲 비결정적 테스트 (Flaky Tests)** - 랜덤 값이나 시간에 의존하는 테스트
9. **🏗️ 싱글톤과 정적 의존성** - 테스트하기 어려운 구조의 문제

## 📖 사용법

### 1. 설명용 파일 (`badTestCases.test.ts`)

강사가 강의에서 사용하는 파일입니다. 각 안티패턴의 나쁜 예시와 좋은 예시를 보여줍니다.

```bash
# 설명용 테스트 실행
npm test src/__tests__/jest/06_bad_test_cases/badTestCases.test.ts
```

**특징:**

- ❌ 나쁜 예시: 안티패턴을 보여주는 코드
- ✅ 좋은 예시: 개선된 테스트 코드
- 의도적 실패 테스트는 `skip` 처리되어 있음

### 2. 실습용 파일 (`badTestCases.template.test.ts`)

학습자가 직접 코드를 작성하며 실습하는 파일입니다.

```bash
# 실습용 테스트 실행
npm test src/__tests__/jest/06_bad_test_cases/badTestCases.template.test.ts
```

**특징:**

- TODO 주석으로 실습 과제 제시
- 힌트와 함께 개선 방향 안내
- 모든 테스트가 통과하도록 정답 코드 포함

### 3. 정답용 파일 (`badTestCases.completed.test.ts`)

완성된 정답 코드입니다. 학습자가 참고하거나 강사가 해설할 때 사용합니다.

```bash
# 정답용 테스트 실행
npm test src/__tests__/jest/06_bad_test_cases/badTestCases.completed.test.ts
```

**특징:**

- 모든 안티패턴에 대한 완성된 개선 코드
- 추가 개선 예시와 보너스 패턴 포함
- 실제 프로젝트에서 사용할 수 있는 고품질 테스트 코드

## 🛠️ 주요 학습 기법

### Mock과 Spy 활용

```typescript
// Math.random Mock
const mathSpy = jest.spyOn(Math, "random").mockReturnValue(0.5);

// Date Mock
const mockDate = new Date("2023-01-01T10:00:00");
const dateSpy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);

// Console Spy
const consoleSpy = jest.spyOn(console, "log").mockImplementation();
```

### Fake Timer 사용

```typescript
jest.useFakeTimers();
jest.advanceTimersByTime(1000);
jest.useRealTimers();
```

### 전역 상태 관리

```typescript
beforeEach(() => {
  // 전역 상태 초기화
  delete (global as any).APP_CONFIG;
  BadSingleton.reset();
});
```

### 독립적인 테스트 작성

```typescript
beforeEach(() => {
  badService.reset(); // 각 테스트마다 깨끗한 상태로 시작
});
```

## 🎓 강의 진행 권장 순서

1. **이론 설명** → `badTestCases.test.ts` 파일로 안티패턴 설명
2. **실습 진행** → `badTestCases.template.test.ts`에서 학습자가 코드 작성
3. **정답 해설** → `badTestCases.completed.test.ts`로 최적화된 코드 설명
4. **토론 및 Q&A** → 실제 프로젝트 적용 방안 논의

## 🔧 의존성

이 자료는 다음 유틸리티를 사용합니다:

- `src/utils/badExamples.ts` - 안티패턴 학습용 의도적으로 나쁜 코드
- Jest Mock 기능 (fetch, Math, Date, console 등)

## ⚡ 실행 결과

모든 파일의 테스트가 성공적으로 통과합니다:

- **설명용**: 36 passed, 1 skipped (나쁜 예시 skip)
- **실습용**: 23 passed, 1 skipped (나쁜 예시 skip)
- **정답용**: 32 passed, 1 skipped (나쁜 예시 skip)

## 📝 학습 체크리스트

- [ ] 취약한 테스트의 문제점과 개선 방법 이해
- [ ] Mock과 Fake Timer 활용법 습득
- [ ] 테스트 독립성 확보 방법 학습
- [ ] 명확하고 의미있는 테스트 작성법 이해
- [ ] 전역 상태 관리와 정리 방법 학습
- [ ] 비결정적 테스트 문제 해결 방법 습득
- [ ] 싱글톤 패턴 테스트 어려움과 해결책 이해
- [ ] 복잡한 테스트를 단순하게 분리하는 방법 학습
- [ ] 실제 프로젝트에 적용 가능한 테스트 패턴 습득

---

💡 **TIP**: 실제 프로젝트에서 이런 안티패턴을 발견했다면, 이 자료의 개선 방법을 참고하여 점진적으로 리팩토링해 보세요!
