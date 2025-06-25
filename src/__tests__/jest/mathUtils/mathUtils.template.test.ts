// 🎯 라이브 코딩 실습 - 템플릿
// 강사와 함께 AAA 패턴으로 테스트를 작성해보세요!

import { type User } from "../utils/liveCodingFunctions";

describe.skip("🧪 라이브 코딩 실습: AAA 패턴으로 테스트 작성", () => {
  // ===== 실습 1: calculateTax 함수 테스트 =====
  describe("💰 calculateTax 함수", () => {
    it.skip("정상적인 세금 계산이 작동한다", () => {
      // TODO: 강사와 함께 AAA 패턴으로 테스트를 작성해보세요
      // Arrange: 가격 100, 세율 0.1 준비
      // Act: calculateTax 함수 실행
      // Assert: 결과가 10인지 확인
    });

    it("세율이 0일 때 세금이 0이다", () => {
      // TODO: 여러분이 직접 작성해보세요!
    });
  });

  // ===== 실습 2: isValidEmail 함수 테스트 =====
  describe("📧 isValidEmail 함수", () => {
    it("올바른 이메일 형식에 대해 true를 반환한다", () => {
      // TODO: 'test@example.com' 이메일이 유효한지 테스트
    });

    it("잘못된 이메일 형식에 대해 false를 반환한다", () => {
      // TODO: 'invalid-email' 이 무효한지 테스트
    });

    // 추가 테스트 케이스들을 생각해보세요!
    // - '@' 기호가 없는 경우
    // - 도메인이 없는 경우
    // - 빈 문자열인 경우
  });

  // ===== 실습 3: removeDuplicates 함수 테스트 =====
  describe("🔄 removeDuplicates 함수", () => {
    it("중복된 문자열을 제거한다", () => {
      // TODO: ['a', 'b', 'a', 'c', 'b'] → ['a', 'b', 'c'] 테스트
    });

    it("중복이 없는 배열은 그대로 반환한다", () => {
      // TODO: 중복이 없는 배열 테스트
    });
  });

  // ===== 실습 4: getDiscountPrice 함수 테스트 =====
  describe("💸 getDiscountPrice 함수", () => {
    it("정상적인 할인 계산이 작동한다", () => {
      // TODO: 가격 100, 할인율 20% → 80 테스트
    });

    it("음수 가격에 대해 에러를 발생시킨다", () => {
      // TODO: 에러 발생 테스트 (toThrow 사용)
    });

    it("잘못된 할인율에 대해 에러를 발생시킨다", () => {
      // TODO: 101% 할인율로 에러 테스트
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

    describe("isAdult 함수", () => {
      it("18세 이상이면 true를 반환한다", () => {
        // TODO: adultUser가 성인인지 테스트
      });

      it("18세 미만이면 false를 반환한다", () => {
        // TODO: minorUser가 미성년자인지 테스트
      });
    });

    describe("formatUserInfo 함수", () => {
      it("사용자 정보를 올바른 형식으로 포매팅한다", () => {
        // TODO: 예상 결과: '김개발 (25세) - kim@example.com'
      });
    });
  });
});

// ===== 💡 실습 가이드 =====
/*
🎯 AAA 패턴 체크리스트:

✅ Arrange (준비)
- 테스트에 필요한 데이터를 준비했나요?
- 변수명이 명확한가요?

✅ Act (실행)  
- 테스트하려는 함수를 정확히 호출했나요?
- 결과를 적절한 변수에 저장했나요?

✅ Assert (검증)
- 적절한 matcher를 사용했나요?
- 예상 결과와 실제 결과를 비교했나요?

🔧 자주 사용하는 Jest Matchers:
- toBe(): 원시값 비교
- toEqual(): 객체/배열 비교  
- toThrow(): 에러 발생 확인
- toBeTruthy() / toBeFalsy(): boolean 확인
- toContain(): 배열/문자열 포함 확인

📝 좋은 테스트 케이스명 작성법:
- "무엇을 테스트하는지" 명확히 작성
- "어떤 조건에서" 테스트하는지 포함
- "어떤 결과를 기대하는지" 명시

예: "양수 두 개를 더하면 올바른 합계를 반환한다"
*/
