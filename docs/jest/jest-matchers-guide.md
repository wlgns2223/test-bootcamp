# 🎯 Jest Matcher 완전 정복 가이드

신입 프론트엔드 개발자가 반드시 알아야 할 Jest matcher들을 마스터하기 위한 종합 가이드입니다.

## 📚 필수 Matcher 목록

### 1. 🔍 기본 비교 Matcher

#### `toBe()` - 원시값 정확 비교

```javascript
expect(42).toBe(42);
expect("hello").toBe("hello");
expect(true).toBe(true);
```

- **용도**: 숫자, 문자열, 불린 등 원시값의 정확한 일치 확인
- **내부 동작**: `Object.is()` 사용 (=== 과 유사)

#### `toEqual()` - 깊은 비교

```javascript
expect({ name: "Kim" }).toEqual({ name: "Kim" });
expect([1, 2, 3]).toEqual([1, 2, 3]);
```

- **용도**: 객체, 배열의 구조와 값이 동일한지 확인
- **내부 동작**: 재귀적으로 모든 속성을 비교

### 2. ✅ 불린 검증 Matcher

#### `toBeTruthy()` / `toBeFalsy()` - Truthy/Falsy 값

```javascript
expect("hello").toBeTruthy(); // truthy 값
expect("").toBeFalsy(); // falsy 값
expect(0).toBeFalsy(); // falsy 값
expect([]).toBeTruthy(); // truthy 값
```

#### `toBeNull()` / `toBeUndefined()` - 특정 값

```javascript
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect(value).not.toBeNull();
```

### 3. 🔢 숫자 비교 Matcher

#### 크기 비교

```javascript
expect(score).toBeGreaterThan(80);
expect(score).toBeLessThan(100);
expect(score).toBeGreaterThanOrEqual(85);
expect(score).toBeLessThanOrEqual(85);
```

#### `toBeCloseTo()` - 부동소수점 비교

```javascript
expect(0.1 + 0.2).toBeCloseTo(0.3);
expect(result).toBeCloseTo(33.33, 2); // 소수점 2자리까지
```

- **중요**: JavaScript의 부동소수점 연산 오차를 해결

### 4. 📝 문자열 Matcher

#### `toContain()` - 문자열 포함

```javascript
expect("Hello World").toContain("World");
expect(message).toContain("사용자");
```

#### `toMatch()` - 정규표현식 매칭

```javascript
expect(email).toMatch(/^[\w.]+@[\w.]+$/);
expect(phone).toMatch(/^010-\d{4}-\d{4}$/);
expect(text).toMatch(/시작/); // 부분 매칭도 가능
```

### 5. 📦 배열/객체 Matcher

#### 배열 관련

```javascript
expect(array).toHaveLength(5);
expect(tags).toContain("javascript");
expect(numbers).toEqual([1, 2, 3]);
```

#### 객체 속성 확인

```javascript
expect(user).toHaveProperty("name");
expect(user).toHaveProperty("age", 25);
expect(product).toHaveProperty("metadata.createdAt");
```

### 6. 💥 에러 Matcher

#### `toThrow()` - 에러 발생 확인

```javascript
expect(() => divide(10, 0)).toThrow();
expect(() => divide(10, 0)).toThrow("Division by zero");
expect(() => divide(10, 0)).toThrow(/zero/);
expect(() => validFunction()).not.toThrow();
```

### 7. ⏰ 비동기 Matcher

#### Promise 결과 확인

```javascript
// resolve 확인
await expect(fetchData()).resolves.toEqual(expectedData);
await expect(promise).resolves.toHaveProperty("id");

// reject 확인
await expect(failingPromise).rejects.toThrow("Error message");
await expect(failingPromise).rejects.toBeInstanceOf(Error);
```

### 8. 🚀 고급 Matcher

#### `expect.any()` - 타입 매칭

```javascript
expect(user).toEqual({
  name: "Kim",
  id: expect.any(Number),
  createdAt: expect.any(String),
});
```

#### `expect.arrayContaining()` - 배열 부분 포함

```javascript
expect(["a", "b", "c", "d"]).toEqual(expect.arrayContaining(["a", "c"]));
```

#### `expect.objectContaining()` - 객체 부분 매칭

```javascript
expect(product).toEqual(
  expect.objectContaining({
    name: "iPhone",
    price: expect.any(Number),
  })
);
```

## 🎯 실무 활용 패턴

### 1. API 응답 테스트

```javascript
it("사용자 정보를 올바르게 반환한다", async () => {
  const response = await fetchUser(1);

  expect(response).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.stringMatching(/^[\w.]+@[\w.]+$/),
    })
  );
});
```

### 2. 폼 검증 테스트

```javascript
it("이메일 유효성을 올바르게 검증한다", () => {
  expect(validateEmail("test@example.com")).toBeTruthy();
  expect(validateEmail("invalid-email")).toBeFalsy();
  expect(validateEmail("")).toBeFalsy();
});
```

### 3. 상태 변경 테스트

```javascript
it("장바구니에 상품을 추가한다", () => {
  const cart = createCart();
  const item = { name: "상품", price: 1000 };

  cart.addItem(item);

  expect(cart.items).toHaveLength(1);
  expect(cart.items).toContain(item);
  expect(cart.total).toBe(1000);
});
```

## ⚠️ 주의사항 및 팁

### 1. toBe vs toEqual 선택

```javascript
// ❌ 객체에 toBe 사용하지 말기
expect({ name: "Kim" }).toBe({ name: "Kim" }); // 실패!

// ✅ 객체에는 toEqual 사용
expect({ name: "Kim" }).toEqual({ name: "Kim" }); // 성공!

// ✅ 원시값에는 toBe 사용
expect(42).toBe(42); // 성공!
```

### 2. 부동소수점 비교

```javascript
// ❌ 직접 비교하지 말기
expect(0.1 + 0.2).toBe(0.3); // 실패!

// ✅ toBeCloseTo 사용
expect(0.1 + 0.2).toBeCloseTo(0.3); // 성공!
```

### 3. 에러 테스트시 함수로 감싸기

```javascript
// ❌ 함수를 직접 호출하지 말기
expect(divide(10, 0)).toThrow(); // 실패!

// ✅ 화살표 함수로 감싸기
expect(() => divide(10, 0)).toThrow(); // 성공!
```

### 4. 비동기 테스트시 await 사용

```javascript
// ❌ await 없이 사용하지 말기
expect(fetchData()).resolves.toEqual(data); // 동작하지 않음

// ✅ await 사용
await expect(fetchData()).resolves.toEqual(data); // 성공!
```

## 📝 연습 문제

### 기초 문제

1. 숫자 42와 문자열 "42"를 구분하여 테스트하기
2. 빈 배열과 undefined를 구분하여 테스트하기
3. 0.1 + 0.2의 결과를 0.3과 비교하기

### 중급 문제

1. 이메일 형식을 검증하는 함수 테스트하기
2. 사용자 객체에 필수 속성들이 있는지 확인하기
3. API 에러 상황을 모킹하여 테스트하기

### 고급 문제

1. 비동기 함수의 성공/실패 케이스 모두 테스트하기
2. 복잡한 중첩 객체의 부분 매칭 테스트하기
3. 동적으로 생성되는 값들을 expect.any()로 테스트하기

## 🔗 추가 학습 자료

1. **Jest 공식 문서**: [jestjs.io](https://jestjs.io/docs/expect)
2. **Matcher 치트시트**: 자주 사용하는 패턴들
3. **실무 예제**: 실제 프로젝트에서 사용되는 테스트 패턴들

---

**Happy Testing! 🧪✨**
