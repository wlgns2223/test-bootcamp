# 🎯 Jest AAA 패턴 실습 가이드

## 📋 실습 순서

### 1단계: 환경 확인

```bash
# 테스트 실행해보기
npm test

# 특정 파일만 테스트
npm test mathUtils

# 테스트 커버리지 확인
npm run test:coverage
```

### 2단계: 완성된 예제 분석

1. `src/__tests__/mathUtils.test.ts` 파일 열기
2. AAA 패턴이 어떻게 적용되었는지 확인
3. 다양한 Jest matcher 사용법 학습

### 3단계: 라이브 코딩 참여

1. `src/__tests__/liveCoding.template.test.ts` 파일 열기
2. 강사와 함께 TODO 부분을 채워가며 테스트 작성
3. 각 단계에서 AAA 패턴 적용 확인

### 4단계: 완성 답안과 비교

1. `src/__tests__/liveCoding.completed.test.ts` 파일 확인
2. 본인이 작성한 코드와 비교
3. 더 나은 테스트 케이스 아이디어 생각해보기

## 🧪 AAA 패턴 실습 체크리스트

### ✅ Arrange (준비) 단계

- [ ] 테스트에 필요한 입력 데이터를 명확히 정의했나요?
- [ ] 변수명이 의미를 잘 전달하나요?
- [ ] 예상 결과값을 미리 정의했나요?

### ⚡ Act (실행) 단계

- [ ] 테스트하려는 함수만 호출했나요?
- [ ] 함수의 반환값을 적절한 변수에 저장했나요?
- [ ] 부수 효과가 있는 다른 함수를 호출하지 않았나요?

### 🔍 Assert (검증) 단계

- [ ] 적절한 Jest matcher를 선택했나요?
- [ ] 실제 결과와 예상 결과를 정확히 비교했나요?
- [ ] 에러 케이스에 대해서는 `toThrow()`를 사용했나요?

## 📚 Jest Matcher 참고

### 기본 비교

```javascript
expect(actual).toBe(expected); // 원시값 비교 (===)
expect(actual).toEqual(expected); // 깊은 비교 (객체/배열)
expect(actual).not.toBe(expected); // 부정 비교
```

### 불린 검증

```javascript
expect(actual).toBeTruthy(); // truthy 값
expect(actual).toBeFalsy(); // falsy 값
expect(actual).toBeNull(); // null
expect(actual).toBeUndefined(); // undefined
```

### 숫자 비교

```javascript
expect(actual).toBeGreaterThan(3); // > 3
expect(actual).toBeGreaterThanOrEqual(3); // >= 3
expect(actual).toBeLessThan(3); // < 3
expect(actual).toBeCloseTo(0.3, 5); // 부동소수점 비교
```

### 문자열/배열 검증

```javascript
expect("Hello World").toContain("World"); // 문자열 포함
expect(["a", "b", "c"]).toContain("b"); // 배열 포함
expect("Hello").toMatch(/ell/); // 정규식 매칭
expect(array).toHaveLength(3); // 배열 길이
```

### 에러 검증

```javascript
expect(() => {
  throw new Error("Something went wrong");
}).toThrow(); // 에러 발생 확인

expect(() => {
  throw new Error("Something went wrong");
}).toThrow("Something went wrong"); // 특정 에러 메시지
```

## 💡 좋은 테스트 작성 팁

### 1. 의미있는 테스트명 작성

```javascript
// ❌ 나쁜 예
test("add test", () => {});

// ✅ 좋은 예
test("두 양수를 더하면 올바른 결과를 반환한다", () => {});
```

### 2. 하나의 테스트는 하나의 기능만

```javascript
// ❌ 나쁜 예 - 여러 기능을 한 번에 테스트
test("math functions", () => {
  expect(add(1, 2)).toBe(3);
  expect(subtract(5, 3)).toBe(2);
  expect(multiply(2, 4)).toBe(8);
});

// ✅ 좋은 예 - 각각 분리
test("add 함수가 올바르게 작동한다", () => {
  expect(add(1, 2)).toBe(3);
});
```

### 3. Edge Case 고려

```javascript
// 경계값, 예외상황, 빈 값 등을 테스트
test("빈 배열에서 최댓값을 구하면 에러가 발생한다", () => {
  expect(() => getMax([])).toThrow();
});
```

### 4. 테스트 데이터 재사용

```javascript
describe("User 관련 함수들", () => {
  // 공통 테스트 데이터
  const testUser = {
    id: 1,
    name: "김개발",
    age: 25,
    email: "kim@example.com",
  };

  test("성인 여부를 확인한다", () => {
    expect(isAdult(testUser)).toBe(true);
  });
});
```

## 🏃‍♂️ 추가 실습 아이디어

실습이 끝난 후 다음과 같은 함수들을 추가로 테스트해보세요:

1. **날짜 관련 함수**

   - 나이 계산하기
   - 두 날짜 사이의 차이 구하기

2. **배열 고차 함수**

   - 배열 정렬하기
   - 조건에 맞는 요소 찾기

3. **문자열 처리**

   - URL 유효성 검사
   - 전화번호 포매팅

4. **비즈니스 로직**
   - 쇼핑카트 총액 계산
   - 주문 상태 변경

각 함수마다 최소 3개 이상의 테스트 케이스를 작성해보세요!

- 정상 케이스 (Happy Path)
- 경계값 케이스 (Edge Case)
- 예외 케이스 (Error Case)
