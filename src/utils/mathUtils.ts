// 수학 계산 함수들
export const add = (a: number, b: number): number => {
  return a + b;
};

export const subtract = (a: number, b: number): number => {
  return a - b;
};

export const multiply = (a: number, b: number): number => {
  return a * b;
};

export const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error("0으로 나눌 수 없습니다");
  }
  return a / b;
};

// 문자열 처리 함수들
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};

export const isPalindrome = (str: string): boolean => {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned === cleaned.split("").reverse().join("");
};

// 배열 처리 함수들
export const getMax = (numbers: number[]): number => {
  if (numbers.length === 0) {
    throw new Error("빈 배열에서는 최댓값을 구할 수 없습니다");
  }
  return Math.max(...numbers);
};

export const getAverage = (numbers: number[]): number => {
  if (numbers.length === 0) {
    throw new Error("빈 배열에서는 평균을 구할 수 없습니다");
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

export const filterEvenNumbers = (numbers: number[]): number[] => {
  return numbers.filter((num) => num % 2 === 0);
};
