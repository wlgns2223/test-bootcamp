// 🎯 Jest Matcher 라이브 코딩 실습 - 템플릿
// 강사와 함께 다양한 Jest matcher를 연습해보세요!

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

describe.skip("🧪 Jest Matcher 라이브 코딩 실습", () => {
  // ===== 실습 1: 기본 비교 Matcher =====
  describe("📊 기본 비교 실습: toBe vs toEqual", () => {
    it("원시값은 toBe, 객체/배열은 toEqual을 사용한다", () => {
      // TODO: 강사와 함께 작성해보세요!

      // Arrange: 숫자, 문자열, 객체, 배열 준비
      const number = 42;
      const text = "hello";
      const user = createUser("김개발", 25);
      const numbers = [1, 2, 3];

      // Act & Assert: 적절한 matcher 사용하기
      // expect(number).???(42);
      // expect(text).???('hello');
      // expect(user).???(expect.objectContaining({ name: '김개발', age: 25 }));
      // expect(numbers).???([1, 2, 3]);
    });
  });

  // ===== 실습 2: 불린 검증 Matcher =====
  describe("✅ 불린 검증 실습", () => {
    it("truthy/falsy 값을 올바르게 판단한다", () => {
      // TODO: 비밀번호 검증 함수 테스트

      // Arrange
      const validPassword = "password123";
      const invalidPassword = "123";
      const emptyPassword = "";

      // Act & Assert
      // expect(validatePassword(validPassword)).???();
      // expect(validatePassword(invalidPassword)).???();
      // expect(validatePassword(emptyPassword)).???();
    });

    it("null과 undefined를 구분한다", () => {
      // TODO: 로그인 상태 확인 함수 테스트

      // Arrange
      const nullUser = null;
      const userWithoutStatus = { name: "test" };
      const activeUser = { isActive: true };

      // Act & Assert
      // expect(checkLoginStatus(nullUser)).???();
      // expect(checkLoginStatus(userWithoutStatus)).???();
      // expect(checkLoginStatus(activeUser)).not.???();
    });
  });

  // ===== 실습 3: 숫자 비교 Matcher =====
  describe("🔢 숫자 비교 실습", () => {
    it("점수를 범위로 검증한다", () => {
      // TODO: 시험 점수 계산 및 범위 검증

      // Arrange
      const score = calculateScore(85, 100);

      // Act & Assert
      // expect(score).???(80);      // 80점보다 높음
      // expect(score).???(90);      // 90점보다 낮음
      // expect(score).???(85);      // 정확히 85점
    });

    it("부동소수점 계산 결과를 비교한다", () => {
      // TODO: 소수점 계산 오차 처리

      // Arrange
      const result = 0.1 + 0.2;
      const percentage = calculateScore(1, 3);

      // Act & Assert
      // expect(result).???(0.3);           // 소수점 오차 고려
      // expect(percentage).???(33.33, 2);  // 소수점 둘째 자리까지
    });
  });

  // ===== 실습 4: 문자열 Matcher =====
  describe("📝 문자열 실습", () => {
    it("메시지에 특정 문자열이 포함되어 있는지 확인한다", () => {
      // TODO: 사용자 액션 메시지 검증

      // Arrange
      const message = formatMessage("이개발", "파일 업로드");

      // Act & Assert
      // expect(message).???('이개발');
      // expect(message).???('파일 업로드');
      // expect(message).not.???('삭제');
    });

    it("이메일 형식을 정규표현식으로 검증한다", () => {
      // TODO: 이메일 패턴 매칭

      // Arrange
      const email = generateEmail("test.user");

      // Act & Assert
      // expect(email).???(/^[\w.]+@[\w.]+$/);  // 이메일 패턴
      // expect(email).???('@');                 // @ 포함
      // expect(email).???(/\.com$/);            // .com으로 끝남
    });
  });

  // ===== 실습 5: 배열/객체 Matcher =====
  describe("📦 배열/객체 실습", () => {
    it("배열의 길이와 포함 요소를 확인한다", () => {
      // TODO: 인기 태그 배열 검증

      // Arrange
      const tags = getPopularTags();

      // Act & Assert
      // expect(tags).???(5);              // 길이가 5
      // expect(tags).???('javascript');   // javascript 포함
      // expect(tags).???('react');        // react 포함
      // expect(tags).not.???('python');   // python 미포함
    });

    it("객체의 속성 존재와 값을 확인한다", () => {
      // TODO: 상품 객체 속성 검증

      // Arrange
      const product = createProduct("iPhone", 1200000, "mobile");

      // Act & Assert
      // expect(product).???('id');                    // id 속성 존재
      // expect(product).???('name', 'iPhone');       // name이 'iPhone'
      // expect(product).???('price', 1200000);       // price가 1200000
      // expect(product).???('metadata.createdAt');   // 중첩 속성 존재
    });
  });

  // ===== 실습 6: 에러 Matcher =====
  describe("💥 에러 실습", () => {
    it("0으로 나누기 에러를 확인한다", () => {
      // TODO: 나눗셈 함수 에러 처리
      // Act & Assert
      // expect(() => divide(10, 0)).???();                           // 에러 발생
      // expect(() => divide(10, 0)).???('Division by zero');         // 특정 메시지
      // expect(() => divide(10, 2)).not.???();                       // 에러 미발생
    });

    it("잘못된 JSON 파싱 에러를 확인한다", () => {
      // TODO: JSON 파싱 에러 처리
      // Act & Assert
      // expect(() => parseJSON('invalid')).???();                    // 에러 발생
      // expect(() => parseJSON('invalid')).???(/Invalid JSON/);      // 메시지 패턴
      // expect(() => parseJSON('{"valid": true}')).not.???();        // 에러 미발생
    });
  });

  // ===== 실습 7: 비동기 Matcher =====
  describe("⏰ 비동기 실습", () => {
    it("사용자 데이터를 성공적으로 가져온다", async () => {
      // TODO: Promise resolve 테스트
      // Act & Assert
      // await expect(fetchUserData(1)).???.toEqual({
      //   id: 1,
      //   name: '김개발',
      //   email: 'kim@example.com'
      // });
    });

    it("존재하지 않는 사용자 조회시 에러가 발생한다", async () => {
      // TODO: Promise reject 테스트
      // Act & Assert
      // await expect(fetchUserData(999)).???.toThrow('사용자를 찾을 수 없습니다');
    });
  });
});

// ===== 💡 실습 가이드 =====
/*
🎯 Jest Matcher 치트시트:

✅ 기본 비교
- toBe(): 원시값 정확한 비교 (===)
- toEqual(): 객체/배열 깊은 비교

✅ 불린 검증  
- toBeTruthy() / toBeFalsy(): truthy/falsy 값
- toBeNull() / toBeUndefined(): null/undefined

✅ 숫자 비교
- toBeGreaterThan() / toBeLessThan(): 크기 비교
- toBeCloseTo(): 부동소수점 비교

✅ 문자열
- toContain(): 문자열 포함 여부
- toMatch(): 정규표현식 매칭

✅ 배열/객체
- toHaveLength(): 배열 길이
- toHaveProperty(): 객체 속성 존재/값

✅ 에러
- toThrow(): 에러 발생 여부

✅ 비동기
- resolves / rejects: Promise 결과

✅ 고급
- expect.any(): 타입 매칭
- expect.arrayContaining(): 배열 부분 포함
- expect.objectContaining(): 객체 부분 매칭

📝 실습 순서:
1. 각 TODO 부분의 ??? 를 적절한 matcher로 교체
2. 테스트 실행해서 결과 확인
3. 다양한 케이스로 응용해보기
*/
