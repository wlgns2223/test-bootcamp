import { slice } from "lodash";

/**
 * Jest의 `it.each`는 동일한 테스트 로직을 다양한 입력값(데이터 세트)으로 반복해서 실행할 수 있도록 해주는 함수입니다. 
 * 이 기능은 **파라미터화 테스트(Parameterized Test)**라고도 불리며, 여러 개의 테스트 케이스를 간결하게 작성할 때 유용합니다
 * 
 * @example
 * it.each([
  [1, 2, 3],
  [4, 5, 9],
  [5, 6, 11],
])('adds %i and %i to equal %i', (a, b, expected) => {
  expect(a + b).toBe(expected);
});
 */

describe("slice", () => {
  const array = [1, 2, 3];

  it("should use a default `start` of `0` and a default `end` of `length`", () => {
    const actual = slice(array);
    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
  });

  it("should work with a positive `start`", () => {
    expect(slice(array, 1)).toEqual([2, 3]);
    expect(slice(array, 1, 3)).toEqual([2, 3]);
  });

  it.each([3, 4, 2 ** 32, Infinity])("should work with a `start` >= `length`", (start) => {
    expect(slice(array, start)).toEqual([]);
  });

  it("should work with a negative `start`", () => {
    // 코드를 완성하세요.
  });

  // "should work with a negative `start` <= negative `length`",
  // it.each([-3, -4, -Infinity]) 로 시작하는 테스트 코드를 작성하세요.

  it.each([2, 3])("should work with `start` >= `end`", (start) => {
    // 코드를 완성하세요.
  });

  it("should work with a positive `end`", () => {
    // 코드를 완성하세요.
  });

  // "should work with a `end` >= `length`",
  // it.each([3, 4, 2 ** 32, Infinity]) 로 시작하는 테스트 코드를 작성하세요.
});
