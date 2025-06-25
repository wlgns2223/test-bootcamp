// 🎯 라이브 코딩 실습: AAA 패턴으로 테스트 작성하기

// ===== 실습용 함수들 =====
// 강사와 함께 이 함수들을 테스트해보겠습니다!

// 1. 간단한 계산 함수
export const calculateTax = (price: number, taxRate: number): number => {
  return price * taxRate;
};

// 2. 문자열 검증 함수
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 3. 배열 조작 함수
export const removeDuplicates = (items: string[]): string[] => {
  return [...new Set(items)];
};

// 4. 조건부 로직 함수
export const getDiscountPrice = (
  price: number,
  discountPercent: number
): number => {
  if (price < 0) {
    throw new Error("가격은 0보다 작을 수 없습니다");
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("할인율은 0과 100 사이여야 합니다");
  }

  return price * (1 - discountPercent / 100);
};

// 5. 객체 처리 함수
export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

export const isAdult = (user: User): boolean => {
  return user.age >= 18;
};

export const formatUserInfo = (user: User): string => {
  return `${user.name} (${user.age}세) - ${user.email}`;
};
