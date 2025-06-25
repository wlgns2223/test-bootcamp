import {
  add,
  capitalize,
  divide,
  filterEvenNumbers,
  getMax,
  isPalindrome,
} from "../../../utils/mathUtils";

describe("수학 계산 함수 테스트", () => {
  describe("add 함수", () => {
    it("두 양수를 더하면 올바른 결과를 반환한다", () => {
      // Arrange (준비): 테스트에 필요한 데이터 준비
      const a = 5;
      const b = 3;
      const expected = 8;

      // Act (실행): 테스트하고자 하는 함수 실행
      const result = add(a, b);

      // Assert (검증): 결과가 예상과 일치하는지 확인
      expect(result).toBe(expected);
    });

    it("음수와 양수를 더하면 올바른 결과를 반환한다", () => {
      // Arrange
      const a = -5;
      const b = 3;
      const expected = -2;

      // Act
      const result = add(a, b);

      // Assert
      expect(result).toBe(expected);
    });

    it("0과 숫자를 더하면 원래 숫자를 반환한다", () => {
      // Arrange
      const a = 0;
      const b = 42;
      const expected = 42;

      // Act
      const result = add(a, b);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("divide 함수", () => {
    it("일반적인 나눗셈이 올바르게 작동한다", () => {
      // Arrange
      const a = 10;
      const b = 2;
      const expected = 5;

      // Act
      const result = divide(a, b);

      // Assert
      expect(result).toBe(expected);
    });

    it("0으로 나누면 에러가 발생한다", () => {
      // Arrange
      const a = 10;
      const b = 0;

      // Act & Assert
      expect(() => divide(a, b)).toThrow("0으로 나눌 수 없습니다");
    });
  });
});

describe("문자열 처리 함수 테스트", () => {
  describe("capitalize 함수", () => {
    it("소문자 문자열의 첫 글자를 대문자로 변환한다", () => {
      // Arrange
      const input = "hello";
      const expected = "Hello";

      // Act
      const result = capitalize(input);

      // Assert
      expect(result).toBe(expected);
    });

    it("이미 대문자인 문자열도 올바르게 처리한다", () => {
      // Arrange
      const input = "HELLO";
      const expected = "Hello";

      // Act
      const result = capitalize(input);

      // Assert
      expect(result).toBe(expected);
    });

    it("빈 문자열을 처리한다", () => {
      // Arrange
      const input = "";
      const expected = "";

      // Act
      const result = capitalize(input);

      // Assert
      expect(result).toBe(expected);
    });
  });

  describe("isPalindrome 함수", () => {
    it("회문인 문자열에 대해 true를 반환한다", () => {
      // Arrange
      const input = "racecar";

      // Act
      const result = isPalindrome(input);

      // Assert
      expect(result).toBe(true);
    });

    it("회문이 아닌 문자열에 대해 false를 반환한다", () => {
      // Arrange
      const input = "hello";

      // Act
      const result = isPalindrome(input);

      // Assert
      expect(result).toBe(false);
    });

    it("대소문자와 공백을 무시하고 회문을 판단한다", () => {
      // Arrange
      const input = "A man a plan a canal Panama";

      // Act
      const result = isPalindrome(input);

      // Assert
      expect(result).toBe(true);
    });
  });
});

describe("배열 처리 함수 테스트", () => {
  describe("getMax 함수", () => {
    it("숫자 배열에서 최댓값을 반환한다", () => {
      // Arrange
      const numbers = [1, 5, 3, 9, 2];
      const expected = 9;

      // Act
      const result = getMax(numbers);

      // Assert
      expect(result).toBe(expected);
    });

    it("음수가 포함된 배열에서도 최댓값을 반환한다", () => {
      // Arrange
      const numbers = [-5, -1, -10, -3];
      const expected = -1;

      // Act
      const result = getMax(numbers);

      // Assert
      expect(result).toBe(expected);
    });

    it("빈 배열에 대해 에러를 발생시킨다", () => {
      // Arrange
      const numbers: number[] = [];

      // Act & Assert
      expect(() => getMax(numbers)).toThrow(
        "빈 배열에서는 최댓값을 구할 수 없습니다"
      );
    });
  });

  describe("filterEvenNumbers 함수", () => {
    it("짝수만 필터링한다", () => {
      // Arrange
      const numbers = [1, 2, 3, 4, 5, 6];
      const expected = [2, 4, 6];

      // Act
      const result = filterEvenNumbers(numbers);

      // Assert
      expect(result).toEqual(expected);
    });

    it("모든 수가 홀수인 경우 빈 배열을 반환한다", () => {
      // Arrange
      const numbers = [1, 3, 5, 7];
      const expected: number[] = [];

      // Act
      const result = filterEvenNumbers(numbers);

      // Assert
      expect(result).toEqual(expected);
    });

    it("빈 배열에 대해 빈 배열을 반환한다", () => {
      // Arrange
      const numbers: number[] = [];
      const expected: number[] = [];

      // Act
      const result = filterEvenNumbers(numbers);

      // Assert
      expect(result).toEqual(expected);
    });
  });
});
