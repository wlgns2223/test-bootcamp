// 🎯 라이브 코딩 실습 - 완성 답안
// AAA 패턴이 적용된 완성된 테스트 코드입니다

import {
  calculateTax,
  isValidEmail,
  removeDuplicates,
  getDiscountPrice,
  isAdult,
  formatUserInfo,
  type User,
} from "../../../utils/liveCodingFunctions";

describe("🧪 라이브 코딩 실습: AAA 패턴으로 테스트 작성 (완성본)", () => {
  // ===== 실습 1: calculateTax 함수 테스트 =====
  describe("💰 calculateTax 함수", () => {
    it("정상적인 세금 계산이 작동한다", () => {
      // Arrange: 테스트에 필요한 데이터 준비
      const price = 100;
      const taxRate = 0.1;
      const expected = 10;

      // Act: 테스트하고자 하는 함수 실행
      const result = calculateTax(price, taxRate);

      // Assert: 결과가 예상한 대로 나왔는지 검증
      expect(result).toBe(expected);
    });

    it("세율이 0일 때 세금이 0이다", () => {
      // Arrange
      const price = 100;
      const taxRate = 0;
      const expected = 0;

      // Act
      const result = calculateTax(price, taxRate);

      // Assert
      expect(result).toBe(expected);
    });

    it("높은 세율로도 정확히 계산한다", () => {
      // Arrange
      const price = 200;
      const taxRate = 0.25;
      const expected = 50;

      // Act
      const result = calculateTax(price, taxRate);

      // Assert
      expect(result).toBe(expected);
    });
  });

  // ===== 실습 2: isValidEmail 함수 테스트 =====
  describe("📧 isValidEmail 함수", () => {
    it("올바른 이메일 형식에 대해 true를 반환한다", () => {
      // Arrange
      const validEmail = "test@example.com";

      // Act
      const result = isValidEmail(validEmail);

      // Assert
      expect(result).toBe(true);
    });

    it("잘못된 이메일 형식에 대해 false를 반환한다", () => {
      // Arrange
      const invalidEmail = "invalid-email";

      // Act
      const result = isValidEmail(invalidEmail);

      // Assert
      expect(result).toBe(false);
    });

    it("@기호가 없는 이메일은 무효하다", () => {
      // Arrange
      const emailWithoutAt = "testexample.com";

      // Act
      const result = isValidEmail(emailWithoutAt);

      // Assert
      expect(result).toBe(false);
    });

    it("도메인이 없는 이메일은 무효하다", () => {
      // Arrange
      const emailWithoutDomain = "test@";

      // Act
      const result = isValidEmail(emailWithoutDomain);

      // Assert
      expect(result).toBe(false);
    });

    it("빈 문자열은 무효한 이메일이다", () => {
      // Arrange
      const emptyEmail = "";

      // Act
      const result = isValidEmail(emptyEmail);

      // Assert
      expect(result).toBe(false);
    });
  });

  // ===== 실습 3: removeDuplicates 함수 테스트 =====
  describe("🔄 removeDuplicates 함수", () => {
    it("중복된 문자열을 제거한다", () => {
      // Arrange
      const input = ["a", "b", "a", "c", "b"];
      const expected = ["a", "b", "c"];

      // Act
      const result = removeDuplicates(input);

      // Assert
      expect(result).toEqual(expected);
    });

    it("중복이 없는 배열은 그대로 반환한다", () => {
      // Arrange
      const input = ["a", "b", "c"];
      const expected = ["a", "b", "c"];

      // Act
      const result = removeDuplicates(input);

      // Assert
      expect(result).toEqual(expected);
    });

    it("빈 배열은 빈 배열을 반환한다", () => {
      // Arrange
      const input: string[] = [];
      const expected: string[] = [];

      // Act
      const result = removeDuplicates(input);

      // Assert
      expect(result).toEqual(expected);
    });

    it("모든 요소가 같은 배열은 하나의 요소만 반환한다", () => {
      // Arrange
      const input = ["a", "a", "a", "a"];
      const expected = ["a"];

      // Act
      const result = removeDuplicates(input);

      // Assert
      expect(result).toEqual(expected);
    });
  });

  // ===== 실습 4: getDiscountPrice 함수 테스트 =====
  describe("💸 getDiscountPrice 함수", () => {
    it("정상적인 할인 계산이 작동한다", () => {
      // Arrange
      const price = 100;
      const discountPercent = 20;
      const expected = 80;

      // Act
      const result = getDiscountPrice(price, discountPercent);

      // Assert
      expect(result).toBe(expected);
    });

    it("할인율이 0%일 때 원래 가격을 반환한다", () => {
      // Arrange
      const price = 100;
      const discountPercent = 0;
      const expected = 100;

      // Act
      const result = getDiscountPrice(price, discountPercent);

      // Assert
      expect(result).toBe(expected);
    });

    it("100% 할인일 때 0을 반환한다", () => {
      // Arrange
      const price = 100;
      const discountPercent = 100;
      const expected = 0;

      // Act
      const result = getDiscountPrice(price, discountPercent);

      // Assert
      expect(result).toBe(expected);
    });

    it("음수 가격에 대해 에러를 발생시킨다", () => {
      // Arrange
      const price = -100;
      const discountPercent = 20;

      // Act & Assert
      expect(() => getDiscountPrice(price, discountPercent)).toThrow(
        "가격은 0보다 작을 수 없습니다"
      );
    });

    it("음수 할인율에 대해 에러를 발생시킨다", () => {
      // Arrange
      const price = 100;
      const discountPercent = -10;

      // Act & Assert
      expect(() => getDiscountPrice(price, discountPercent)).toThrow(
        "할인율은 0과 100 사이여야 합니다"
      );
    });

    it("100%를 초과하는 할인율에 대해 에러를 발생시킨다", () => {
      // Arrange
      const price = 100;
      const discountPercent = 101;

      // Act & Assert
      expect(() => getDiscountPrice(price, discountPercent)).toThrow(
        "할인율은 0과 100 사이여야 합니다"
      );
    });
  });

  // ===== 실습 5: User 관련 함수들 테스트 =====
  describe("👤 User 관련 함수들", () => {
    // 테스트에서 공통으로 사용할 사용자 데이터
    const adultUser: User = {
      id: 1,
      name: "김개발",
      age: 25,
      email: "kim@example.com",
    };

    const minorUser: User = {
      id: 2,
      name: "이학생",
      age: 16,
      email: "lee@example.com",
    };

    const exactlyAdult: User = {
      id: 3,
      name: "박성인",
      age: 18,
      email: "park@example.com",
    };

    describe("isAdult 함수", () => {
      it("18세 이상이면 true를 반환한다", () => {
        // Arrange
        const user = adultUser;

        // Act
        const result = isAdult(user);

        // Assert
        expect(result).toBe(true);
      });

      it("18세 미만이면 false를 반환한다", () => {
        // Arrange
        const user = minorUser;

        // Act
        const result = isAdult(user);

        // Assert
        expect(result).toBe(false);
      });

      it("정확히 18세이면 true를 반환한다", () => {
        // Arrange
        const user = exactlyAdult;

        // Act
        const result = isAdult(user);

        // Assert
        expect(result).toBe(true);
      });
    });

    describe("formatUserInfo 함수", () => {
      it("사용자 정보를 올바른 형식으로 포매팅한다", () => {
        // Arrange
        const user = adultUser;
        const expected = "김개발 (25세) - kim@example.com";

        // Act
        const result = formatUserInfo(user);

        // Assert
        expect(result).toBe(expected);
      });

      it("미성년자 정보도 올바르게 포매팅한다", () => {
        // Arrange
        const user = minorUser;
        const expected = "이학생 (16세) - lee@example.com";

        // Act
        const result = formatUserInfo(user);

        // Assert
        expect(result).toBe(expected);
      });

      it("포매팅된 문자열에 모든 사용자 정보가 포함된다", () => {
        // Arrange
        const user = adultUser;

        // Act
        const result = formatUserInfo(user);

        // Assert
        expect(result).toContain(user.name);
        expect(result).toContain(user.age.toString());
        expect(result).toContain(user.email);
      });
    });
  });
});
