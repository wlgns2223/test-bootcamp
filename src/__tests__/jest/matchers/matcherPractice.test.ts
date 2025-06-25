// 🎯 Jest Matcher 완전 정복 - 실습 코드
// 신입 프론트엔드 개발자가 반드시 알아야 할 필수 matcher들을 마스터하세요!

import {
  createUser,
  createNumbers,
  checkLoginStatus,
  validatePassword,
  calculateScore,
  getRandomFloat,
  compareAges,
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

describe("🧪 Jest Matcher 완전 정복", () => {
  // ===== 1. 기본 비교 Matcher =====
  describe("📊 기본 비교 Matcher: toBe vs toEqual", () => {
    it("toBe는 원시값(primitive)의 정확한 일치를 확인한다", () => {
      // Arrange
      const num1 = 42;
      const num2 = 42;
      const str1 = "hello";
      const str2 = "hello";

      // Act & Assert
      expect(num1).toBe(num2); // 숫자 비교
      expect(str1).toBe(str2); // 문자열 비교
      expect(true).toBe(true); // 불린 비교
    });

    it("toEqual은 객체와 배열의 깊은 비교를 한다", () => {
      // Arrange
      const user1 = createUser("김개발", 25);
      const user2 = createUser("김개발", 25);
      const numbers1 = createNumbers(1, 2, 3);
      const numbers2 = createNumbers(1, 2, 3);

      // Act & Assert
      expect(user1).toEqual({
        name: "김개발",
        age: 25,
        id: expect.any(Number),
      });
      expect(numbers1).toEqual(numbers2);
      expect(numbers1).toEqual([1, 2, 3]);
    });

    it("toBe와 toEqual의 차이점을 이해한다", () => {
      // Arrange
      const obj1 = { name: "test" };
      const obj2 = { name: "test" };
      const obj3 = obj1;

      // Act & Assert
      expect(obj1).not.toBe(obj2); // 다른 참조 (메모리 주소)
      expect(obj1).toEqual(obj2); // 같은 내용
      expect(obj1).toBe(obj3); // 같은 참조
    });
  });

  // ===== 2. 불린 검증 Matcher =====
  describe("✅ 불린 검증 Matcher: toBeTruthy, toBeFalsy, toBeNull, toBeUndefined", () => {
    it("toBeTruthy는 truthy 값을 확인한다", () => {
      // Arrange & Act & Assert
      expect(validatePassword("password123")).toBeTruthy();
      expect("hello").toBeTruthy();
      expect(42).toBeTruthy();
      expect({}).toBeTruthy();
      expect([]).toBeTruthy();
    });

    it("toBeFalsy는 falsy 값을 확인한다", () => {
      // Arrange & Act & Assert
      expect(validatePassword("")).toBeFalsy();
      expect(validatePassword("123")).toBeFalsy();
      expect(false).toBeFalsy();
      expect(0).toBeFalsy();
      expect("").toBeFalsy();
    });

    it("toBeNull과 toBeUndefined로 특정 값을 확인한다", () => {
      // Arrange
      const inactiveUser = { isActive: false };
      const userWithoutStatus = { name: "test" };
      const nullUser = null;

      // Act & Assert
      expect(checkLoginStatus(nullUser)).toBeNull();
      expect(checkLoginStatus(userWithoutStatus)).toBeUndefined();
      expect(checkLoginStatus(inactiveUser)).not.toBeNull();
      expect(checkLoginStatus(inactiveUser)).not.toBeUndefined();
    });
  });

  // ===== 3. 숫자 비교 Matcher =====
  describe("🔢 숫자 비교 Matcher: toBeGreaterThan, toBeLessThan, toBeCloseTo", () => {
    it("toBeGreaterThan과 toBeLessThan으로 숫자 크기를 비교한다", () => {
      // Arrange
      const score = calculateScore(85, 100);
      const age1 = 25;
      const age2 = 30;

      // Act & Assert
      expect(score).toBeGreaterThan(80);
      expect(score).toBeLessThan(90);
      expect(score).toBeGreaterThanOrEqual(85);
      expect(score).toBeLessThanOrEqual(85);

      expect(compareAges(age1, age2)).toBe("younger");
      expect(age1).toBeLessThan(age2);
    });

    it("toBeCloseTo로 부동소수점 수를 비교한다", () => {
      // Arrange
      const result1 = 0.1 + 0.2;
      const result2 = calculateScore(1, 3);

      // Act & Assert
      expect(result1).toBeCloseTo(0.3); // 기본 정밀도 (2자리)
      expect(result1).toBeCloseTo(0.3, 5); // 5자리 정밀도
      expect(result2).toBeCloseTo(33.33, 2); // 소수점 둘째 자리까지
    });

    it("숫자 범위 검증을 한다", () => {
      // Arrange
      const randomNum = getRandomFloat();
      const percentage = calculateScore(75, 100);

      // Act & Assert
      expect(randomNum).toBeGreaterThanOrEqual(0);
      expect(randomNum).toBeLessThan(10);
      expect(percentage).toBeGreaterThanOrEqual(0);
      expect(percentage).toBeLessThanOrEqual(100);
    });
  });

  // ===== 4. 문자열 Matcher =====
  describe("📝 문자열 Matcher: toContain, toMatch", () => {
    it("toContain으로 문자열 포함 여부를 확인한다", () => {
      // Arrange
      const message = formatMessage("김개발", "로그인");
      const email = generateEmail("testuser");

      // Act & Assert
      expect(message).toContain("김개발");
      expect(message).toContain("로그인");
      expect(message).toContain("님이");
      expect(email).toContain("@");
      expect(email).toContain("example.com");
    });

    it("toMatch로 정규표현식 패턴을 확인한다", () => {
      // Arrange
      const email = generateEmail("test.user123");
      const validPhone = "010-1234-5678";
      const invalidPhone = "010-12345678";

      // Act & Assert
      expect(email).toMatch(/^[\w.]+@[\w.]+\.\w+$/); // 이메일 패턴
      expect(email).toMatch(/test/); // 부분 문자열
      expect(validatePhoneNumber(validPhone)).toBeTruthy();
      expect(validatePhoneNumber(invalidPhone)).toBeFalsy();
    });

    it("문자열 시작과 끝을 확인한다", () => {
      // Arrange
      const message = formatMessage("관리자", "데이터 삭제");

      // Act & Assert
      expect(message).toMatch(/^사용자/); // '사용자'로 시작
      expect(message).toMatch(/습니다\.$/); // '습니다.'로 끝
      expect(message).not.toMatch(/^안녕/); // '안녕'으로 시작하지 않음
    });
  });

  // ===== 5. 배열/객체 Matcher =====
  describe("📦 배열/객체 Matcher: toContain, toHaveLength, toHaveProperty", () => {
    it("배열에서 toContain과 toHaveLength를 사용한다", () => {
      // Arrange
      const tags = getPopularTags();
      const numbers = createNumbers(1, 2, 3, 4, 5);

      // Act & Assert
      expect(tags).toContain("javascript");
      expect(tags).toContain("react");
      expect(tags).not.toContain("python");
      expect(tags).toHaveLength(5);
      expect(numbers).toHaveLength(5);
      expect([]).toHaveLength(0);
    });

    it("객체에서 toHaveProperty를 사용한다", () => {
      // Arrange
      const product = createProduct("MacBook Pro", 2500000, "laptop");
      const cart = createShoppingCart();

      // Act & Assert
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name", "MacBook Pro");
      expect(product).toHaveProperty("price", 2500000);
      expect(product).toHaveProperty("metadata.createdAt");
      expect(product).toHaveProperty("inStock", true);

      expect(cart).toHaveProperty("items");
      expect(cart).toHaveProperty("total", 0);
      expect(cart).toHaveProperty("addItem");
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
  });

  // ===== 6. 에러 Matcher =====
  describe("💥 에러 Matcher: toThrow", () => {
    it("함수가 에러를 발생시키는지 확인한다", () => {
      // Arrange & Act & Assert
      expect(() => divide(10, 0)).toThrow();
      expect(() => divide(10, 0)).toThrow("Division by zero is not allowed");
      expect(() => divide(10, 0)).toThrow(/zero/);

      expect(() => parseJSON("invalid json")).toThrow();
      expect(() => parseJSON("invalid json")).toThrow("Invalid JSON format");
    });

    it("특정 조건에서 에러가 발생하는지 확인한다", () => {
      // Arrange & Act & Assert
      expect(() => validateAge(-5)).toThrow("나이는 음수일 수 없습니다");
      expect(() => validateAge(200)).toThrow("나이가 너무 큽니다");
      expect(() => validateAge(25)).not.toThrow();
    });

    it("정상적인 경우에는 에러가 발생하지 않는다", () => {
      // Arrange & Act & Assert
      expect(() => divide(10, 2)).not.toThrow();
      expect(() => parseJSON('{"name": "test"}')).not.toThrow();
      expect(() => validateAge(30)).not.toThrow();
    });
  });

  // ===== 7. 비동기 Matcher (Promise) =====
  describe("⏰ 비동기 Matcher: resolves, rejects", () => {
    it("Promise가 성공적으로 resolve되는지 확인한다", async () => {
      // Arrange & Act & Assert
      await expect(fetchUserData(1)).resolves.toEqual({
        id: 1,
        name: "김개발",
        email: "kim@example.com",
      });

      await expect(fetchUserData(5)).resolves.toHaveProperty("id", 5);
      await expect(delay(50)).resolves.toBe("완료");
    });

    it("Promise가 reject되는지 확인한다", async () => {
      // Arrange & Act & Assert
      await expect(fetchUserData(999)).rejects.toThrow(
        "사용자를 찾을 수 없습니다"
      );
      await expect(fetchUserData(999)).rejects.toBeInstanceOf(Error);
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
  });

  // ===== 8. 고급 Matcher =====
  describe("🚀 고급 Matcher: expect.any, expect.arrayContaining", () => {
    it("expect.any로 타입을 확인한다", () => {
      // Arrange
      const user = createUser("테스터", 28);
      const product = createProduct("키보드", 150000, "accessories");

      // Act & Assert
      expect(user).toEqual({
        name: "테스터",
        age: 28,
        id: expect.any(Number),
      });

      expect(product).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(Number),
          metadata: expect.any(Object),
        })
      );
    });

    it("expect.arrayContaining으로 배열 포함 관계를 확인한다", () => {
      // Arrange
      const allTags = getPopularTags();
      const frontendTags = ["javascript", "react"];

      // Act & Assert
      expect(allTags).toEqual(expect.arrayContaining(frontendTags));
      expect(allTags).toEqual(expect.arrayContaining(["jest"]));
      expect(allTags).not.toEqual(expect.arrayContaining(["python", "django"]));
    });

    it("expect.objectContaining으로 객체 부분 매칭을 확인한다", () => {
      // Arrange
      const product = createProduct("모니터", 400000, "display");

      // Act & Assert
      expect(product).toEqual(
        expect.objectContaining({
          name: "모니터",
          price: 400000,
        })
      );

      expect(product).toEqual(
        expect.objectContaining({
          metadata: expect.objectContaining({
            createdAt: expect.any(String),
          }),
        })
      );
    });
  });
});
