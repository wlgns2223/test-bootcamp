// 🎯 Jest Matcher 라이브 코딩 실습 - 완성된 답안
// 다양한 Jest matcher를 활용한 완성된 테스트 코드입니다

import {
  createUser,
  createNumbers,
  checkLoginStatus,
  validatePassword,
  calculateScore,
  formatMessage,
  generateEmail,
  validatePhoneNumber,
  createShoppingCart,
  getPopularTags,
  createProduct,
  divide,
  parseJSON,
  validateAge,
  fetchUserData,
  delay,
  type CartItem,
} from "../../../utils/matcherPractice";

describe("🧪 Jest Matcher 라이브 코딩 실습 (완성본)", () => {
  // ===== 실습 1: 기본 비교 Matcher =====
  describe("📊 기본 비교 실습: toBe vs toEqual", () => {
    it("원시값은 toBe, 객체/배열은 toEqual을 사용한다", () => {
      // Arrange: 숫자, 문자열, 객체, 배열 준비
      const number = 42;
      const text = "hello";
      const user = createUser("김개발", 25);
      const numbers = [1, 2, 3];

      // Act & Assert: 적절한 matcher 사용하기
      expect(number).toBe(42);
      expect(text).toBe("hello");
      expect(user).toEqual(expect.objectContaining({ name: "김개발", age: 25 }));
      expect(numbers).toEqual([1, 2, 3]);
    });

    it("객체 참조와 값의 차이를 이해한다", () => {
      // Arrange
      const obj1 = { name: "test" };
      const obj2 = { name: "test" };
      const obj3 = obj1;

      // Act & Assert
      expect(obj1).not.toBe(obj2); // 다른 참조
      expect(obj1).toEqual(obj2); // 같은 값
      expect(obj1).toBe(obj3); // 같은 참조
    });
  });

  // ===== 실습 2: 불린 검증 Matcher =====
  describe("✅ 불린 검증 실습", () => {
    it("truthy/falsy 값을 올바르게 판단한다", () => {
      // Arrange
      const validPassword = "password123";
      const invalidPassword = "123";
      const emptyPassword = "";

      // Act & Assert
      expect(validatePassword(validPassword)).toBeTruthy();
      expect(validatePassword(invalidPassword)).toBeFalsy();
      expect(validatePassword(emptyPassword)).toBeFalsy();
    });

    it("null과 undefined를 구분한다", () => {
      // Arrange
      const nullUser = null;
      const userWithoutStatus = { name: "test" };
      const activeUser = { isActive: true };

      // Act & Assert
      expect(checkLoginStatus(nullUser)).toBeNull();
      expect(checkLoginStatus(userWithoutStatus)).toBeUndefined();
      expect(checkLoginStatus(activeUser)).not.toBeNull();
      expect(checkLoginStatus(activeUser)).not.toBeUndefined();
    });

    it("다양한 falsy 값들을 확인한다", () => {
      // Arrange & Act & Assert
      expect(false).toBeFalsy();
      expect(0).toBeFalsy();
      expect("").toBeFalsy();
      expect(null).toBeFalsy();
      expect(undefined).toBeFalsy();
      expect(NaN).toBeFalsy();
    });

    it("다양한 truthy 값들을 확인한다", () => {
      // Arrange & Act & Assert
      expect(true).toBeTruthy();
      expect(1).toBeTruthy();
      expect("hello").toBeTruthy();
      expect({}).toBeTruthy();
      expect([]).toBeTruthy();
      expect(function () {}).toBeTruthy();
    });
  });

  // ===== 실습 3: 숫자 비교 Matcher =====
  describe("🔢 숫자 비교 실습", () => {
    it("점수를 범위로 검증한다", () => {
      // Arrange
      const score = calculateScore(85, 100);

      // Act & Assert
      expect(score).toBeGreaterThan(80); // 80점보다 높음
      expect(score).toBeLessThan(90); // 90점보다 낮음
      expect(score).toBe(85); // 정확히 85점
    });

    it("부동소수점 계산 결과를 비교한다", () => {
      // Arrange
      const result = 0.1 + 0.2;
      const percentage = calculateScore(1, 3);

      // Act & Assert
      expect(result).toBeCloseTo(0.3); // 소수점 오차 고려
      expect(percentage).toBeCloseTo(33.33, 2); // 소수점 둘째 자리까지
    });

    it("다양한 숫자 비교 연산자를 사용한다", () => {
      // Arrange
      const score1 = 95;
      const score2 = 85;
      const perfectScore = 100;

      // Act & Assert
      expect(score1).toBeGreaterThan(score2);
      expect(score1).toBeGreaterThanOrEqual(95);
      expect(score2).toBeLessThan(perfectScore);
      expect(score2).toBeLessThanOrEqual(85);
    });
  });

  // ===== 실습 4: 문자열 Matcher =====
  describe("📝 문자열 실습", () => {
    it("메시지에 특정 문자열이 포함되어 있는지 확인한다", () => {
      // Arrange
      const message = formatMessage("이개발", "파일 업로드");

      // Act & Assert
      expect(message).toContain("이개발");
      expect(message).toContain("파일 업로드");
      expect(message).not.toContain("삭제");
    });

    it("이메일 형식을 정규표현식으로 검증한다", () => {
      // Arrange
      const email = generateEmail("test.user");

      // Act & Assert
      expect(email).toMatch(/^[\w.]+@[\w.]+$/); // 이메일 패턴
      expect(email).toContain("@"); // @ 포함
      expect(email).toMatch(/\.com$/); // .com으로 끝남
    });

    it("전화번호 패턴을 검증한다", () => {
      // Arrange
      const validPhone = "010-1234-5678";
      const invalidPhone1 = "010-12345678";
      const invalidPhone2 = "02-1234-5678";

      // Act & Assert
      expect(validatePhoneNumber(validPhone)).toBeTruthy();
      expect(validatePhoneNumber(invalidPhone1)).toBeFalsy();
      expect(validatePhoneNumber(invalidPhone2)).toBeFalsy();
    });

    it("문자열의 시작과 끝을 확인한다", () => {
      // Arrange
      const message = formatMessage("관리자", "데이터 삭제");

      // Act & Assert
      expect(message).toMatch(/^사용자/); // '사용자'로 시작
      expect(message).toMatch(/습니다\.$/); // '습니다.'로 끝남
      expect(message).not.toMatch(/^안녕/); // '안녕'으로 시작하지 않음
    });
  });

  // ===== 실습 5: 배열/객체 Matcher =====
  describe("📦 배열/객체 실습", () => {
    it("배열의 길이와 포함 요소를 확인한다", () => {
      // Arrange
      const tags = getPopularTags();

      // Act & Assert
      expect(tags).toHaveLength(5); // 길이가 5
      expect(tags).toContain("javascript"); // javascript 포함
      expect(tags).toContain("react"); // react 포함
      expect(tags).not.toContain("python"); // python 미포함
    });

    it("객체의 속성 존재와 값을 확인한다", () => {
      // Arrange
      const product = createProduct("iPhone", 1200000, "mobile");

      // Act & Assert
      expect(product).toHaveProperty("id"); // id 속성 존재
      expect(product).toHaveProperty("name", "iPhone"); // name이 'iPhone'
      expect(product).toHaveProperty("price", 1200000); // price가 1200000
      expect(product).toHaveProperty("metadata.createdAt"); // 중첩 속성 존재
    });

    it("쇼핑카트 기능을 종합적으로 테스트한다", () => {
      // Arrange
      const cart = createShoppingCart();
      const item1: CartItem = { name: "노트북", price: 1000000, quantity: 1 };
      const item2: CartItem = { name: "마우스", price: 50000, quantity: 2 };

      // Act
      cart.addItem(item1);
      cart.addItem(item2);

      // Assert
      expect(cart.items).toHaveLength(2);
      expect(cart.items).toContain(item1);
      expect(cart.items).toContain(item2);
      expect(cart.total).toBe(1100000); // 1000000 + (50000 * 2)
    });

    it("배열의 다양한 조건을 확인한다", () => {
      // Arrange
      const numbers = createNumbers(1, 2, 3, 4, 5);
      const emptyArray: number[] = [];

      // Act & Assert
      expect(numbers).toHaveLength(5);
      expect(numbers).toContain(3);
      expect(numbers).not.toContain(10);
      expect(emptyArray).toHaveLength(0);
      expect(emptyArray).toEqual([]);
    });
  });

  // ===== 실습 6: 에러 Matcher =====
  describe("💥 에러 실습", () => {
    it("0으로 나누기 에러를 확인한다", () => {
      // Act & Assert
      expect(() => divide(10, 0)).toThrow(); // 에러 발생
      expect(() => divide(10, 0)).toThrow("Division by zero"); // 특정 메시지
      expect(() => divide(10, 2)).not.toThrow(); // 에러 미발생
    });

    it("잘못된 JSON 파싱 에러를 확인한다", () => {
      // Act & Assert
      expect(() => parseJSON("invalid")).toThrow(); // 에러 발생
      expect(() => parseJSON("invalid")).toThrow(/Invalid JSON/); // 메시지 패턴
      expect(() => parseJSON('{"valid": true}')).not.toThrow(); // 에러 미발생
    });

    it("나이 검증 에러를 확인한다", () => {
      // Act & Assert
      expect(() => validateAge(-5)).toThrow("나이는 음수일 수 없습니다");
      expect(() => validateAge(200)).toThrow("나이가 너무 큽니다");
      expect(() => validateAge(25)).not.toThrow();
    });

    it("에러 객체의 타입을 확인한다", () => {
      // Act & Assert
      expect(() => divide(10, 0)).toThrow(Error);
      expect(() => parseJSON("invalid")).toThrow(Error);
      expect(() => validateAge(-1)).toThrow(Error);
    });
  });

  // ===== 실습 7: 비동기 Matcher =====
  describe("⏰ 비동기 실습", () => {
    it("사용자 데이터를 성공적으로 가져온다", async () => {
      // Act & Assert
      await expect(fetchUserData(1)).resolves.toEqual({
        id: 1,
        name: "김개발",
        email: "kim@example.com",
      });
    });

    it("존재하지 않는 사용자 조회시 에러가 발생한다", async () => {
      // Act & Assert
      await expect(fetchUserData(999)).rejects.toThrow("사용자를 찾을 수 없습니다");
    });

    it("Promise resolve를 다양한 방법으로 테스트한다", async () => {
      // Act & Assert
      await expect(fetchUserData(5)).resolves.toHaveProperty("id", 5);
      await expect(fetchUserData(5)).resolves.toHaveProperty("name");
      await expect(delay(50)).resolves.toBe("완료");
    });

    it("async/await 패턴으로 비동기 테스트를 한다", async () => {
      // Arrange
      const userId = 10;

      // Act
      const userData = await fetchUserData(userId);

      // Assert
      expect(userData).toHaveProperty("id", userId);
      expect(userData).toHaveProperty("name", `사용자${userId}`);
      expect(userData.email).toContain(`user${userId}@`);
    });

    it("Promise reject를 다양한 방법으로 테스트한다", async () => {
      // Act & Assert
      await expect(fetchUserData(999)).rejects.toBeInstanceOf(Error);
      await expect(fetchUserData(999)).rejects.toThrow(/사용자를 찾을 수 없습니다/);
    });
  });

  // ===== 보너스: 실무 시나리오 =====
  describe("💼 실무 시나리오 종합 실습", () => {
    it("사용자 회원가입 시나리오를 테스트한다", () => {
      // Arrange
      const userEmail = generateEmail("newuser");
      const password = "securePassword123";
      const user = createUser("신규사용자", 28);

      // Act & Assert
      expect(userEmail).toMatch(/^[\w.]+@[\w.]+$/);
      expect(validatePassword(password)).toBeTruthy();
      expect(user).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          age: expect.any(Number),
          id: expect.any(Number),
        })
      );
    });

    it("쇼핑몰 주문 시나리오를 테스트한다", () => {
      // Arrange
      const cart = createShoppingCart();
      const products = [createProduct("상품1", 10000, "category1"), createProduct("상품2", 20000, "category2")];

      const items: CartItem[] = [
        { name: "상품1", price: 10000, quantity: 2 },
        { name: "상품2", price: 20000, quantity: 1 },
      ];

      // Act
      items.forEach((item) => cart.addItem(item));

      // Assert
      expect(cart.items).toHaveLength(2);
      expect(cart.total).toBe(40000); // (10000 * 2) + (20000 * 1)
      expect(products).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            price: expect.any(Number),
            inStock: true,
          }),
        ])
      );
    });

    it("API 응답 검증 시나리오를 테스트한다", async () => {
      // Arrange
      const userId = 1;

      // Act
      const response = await fetchUserData(userId);

      // Assert
      expect(response).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.stringMatching(/^[\w.]+@[\w.]+$/),
        })
      );
      expect(response.id).toBeGreaterThan(0);
      expect(response.name).toBeTruthy();
      expect(response.email).toContain("@");
    });
  });
});

// ===== 💡 학습 완료 체크리스트 =====
/*
🎯 Jest Matcher 마스터 체크리스트:

✅ 기본 비교 (완료)
- toBe()와 toEqual()의 차이점 이해
- 원시값 vs 참조값 구분

✅ 불린 검증 (완료)  
- truthy/falsy 값 구분
- null/undefined 정확한 판별

✅ 숫자 비교 (완료)
- 크기 비교 연산자 활용
- 부동소수점 오차 처리

✅ 문자열 (완료)
- 포함 여부 확인
- 정규표현식 패턴 매칭

✅ 배열/객체 (완료)
- 길이, 속성 존재 확인
- 중첩 객체 접근

✅ 에러 처리 (완료)
- 에러 발생 여부
- 에러 메시지/타입 확인

✅ 비동기 (완료)
- Promise resolve/reject
- async/await 패턴

✅ 고급 매칭 (완료)
- 동적 타입 매칭
- 부분 객체/배열 매칭

🚀 다음 단계:
1. React Testing Library로 컴포넌트 테스트
2. Mock 함수 활용
3. 통합 테스트 작성
4. 실제 프로젝트에 적용

🎉 축하합니다! Jest Matcher를 완전히 마스터했습니다!
*/
