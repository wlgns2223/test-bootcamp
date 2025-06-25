// Jest Matcher 실습용 함수들
// 신입 프론트엔드 개발자가 알아야 할 필수 matcher들을 연습해보세요!

// 1. 기본 비교 matcher: toBe, toEqual
export const createUser = (name: string, age: number) => {
  return { name, age, id: Math.floor(Math.random() * 1000) };
};

export const createNumbers = (...nums: number[]) => {
  return [...nums];
};

// 2. 불린 검증 matcher: toBeTruthy, toBeFalsy, toBeNull, toBeUndefined
export const checkLoginStatus = (user: any) => {
  if (!user) return null;
  if (user.isActive === undefined) return undefined;
  return user.isActive ? "logged-in" : "logged-out";
};

export const validatePassword = (password: string) => {
  if (!password) return false;
  if (password.length < 8) return false;
  return true;
};

// 3. 숫자 비교 matcher: toBeGreaterThan, toBeLessThan, toBeCloseTo
export const calculateScore = (correct: number, total: number) => {
  return (correct / total) * 100;
};

export const getRandomFloat = () => {
  return Math.random() * 10;
};

export const compareAges = (age1: number, age2: number) => {
  if (age1 > age2) return "older";
  if (age1 < age2) return "younger";
  return "same";
};

// 4. 문자열 matcher: toContain, toMatch
export const formatMessage = (username: string, action: string) => {
  return `사용자 ${username}님이 ${action}을(를) 실행했습니다.`;
};

export const generateEmail = (
  username: string,
  domain: string = "example.com"
) => {
  return `${username}@${domain}`;
};

export const validatePhoneNumber = (phone: string) => {
  const phoneRegex = /^010-\d{4}-\d{4}$/;
  return phoneRegex.test(phone);
};

// 5. 배열/객체 matcher: toContain, toHaveLength, toHaveProperty
export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export const createShoppingCart = () => {
  return {
    items: [] as CartItem[],
    total: 0,
    addItem: function (item: CartItem) {
      this.items.push(item);
      this.total += item.price * item.quantity;
    },
  };
};

export const getPopularTags = () => {
  return ["javascript", "react", "typescript", "jest", "frontend"];
};

export const createProduct = (
  name: string,
  price: number,
  category: string
) => {
  return {
    id: Date.now(),
    name,
    price,
    category,
    inStock: true,
    metadata: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  };
};

// 6. 에러 matcher: toThrow
export const divide = (a: number, b: number) => {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
};

export const parseJSON = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error("Invalid JSON format");
  }
};

export const validateAge = (age: number) => {
  if (age < 0) {
    throw new Error("나이는 음수일 수 없습니다");
  }
  if (age > 150) {
    throw new Error("나이가 너무 큽니다");
  }
  return true;
};

// 7. 비동기 함수 (Promise matcher 연습용)
export const fetchUserData = (userId: number): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve({ id: 1, name: "김개발", email: "kim@example.com" });
      } else if (userId === 999) {
        reject(new Error("사용자를 찾을 수 없습니다"));
      } else {
        resolve({
          id: userId,
          name: `사용자${userId}`,
          email: `user${userId}@example.com`,
        });
      }
    }, 100);
  });
};

export const delay = (ms: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("완료"), ms);
  });
};
