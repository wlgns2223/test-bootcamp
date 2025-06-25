/**
 * React Testing Library 기본 사용법 - 6단계: 쿼리 우선순위와 접근성 (실습)
 *
 * 🎯 실습 과제: RTL 쿼리 우선순위를 이해하고 접근성 친화적인 테스트 작성
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

function AccessibleForm() {
  return (
    <div>
      <h1>User Registration</h1>
      <button>Submit</button>
      <label htmlFor="username">Username:</label>
      <input id="username" type="text" />
      <input type="email" placeholder="Enter your email" />
      <img src="profile.jpg" alt="User Profile" />
      <div data-testid="custom-element">Custom Element</div>
    </div>
  );
}

describe("RTL 쿼리 우선순위와 접근성 (실습)", () => {
  // 🎯 실습 1: Role로 요소 찾기 (최우선)
  it("role로 버튼을 찾는다", () => {
    // TODO: 컴포넌트 렌더링
    // TODO: getByRole을 사용해서 button 찾기
    // TODO: 버튼 존재 확인
  });

  // 🎯 실습 2: Label로 form 요소 찾기
  it("label로 input을 찾는다", () => {
    // TODO: getByLabelText로 "Username:" 라벨과 연결된 input 찾기
    // TODO: input의 type이 "text"인지 확인
  });

  // 🎯 실습 3: Placeholder로 input 찾기
  it("placeholder로 input을 찾는다", () => {
    // TODO: getByPlaceholderText로 이메일 input 찾기
    // TODO: type이 "email"인지 확인
  });

  // 🎯 실습 4: Alt text로 이미지 찾기
  it("alt text로 이미지를 찾는다", () => {
    // TODO: getByAltText로 이미지 찾기
    // TODO: src 속성 확인
  });

  // 🎯 실습 5: TestId로 요소 찾기 (마지막 수단)
  it("testid로 요소를 찾는다", () => {
    // TODO: getByTestId로 커스텀 요소 찾기
    // TODO: 텍스트 내용 확인
  });
});

/**
 * 💡 쿼리 우선순위 (권장 순서):
 * 1. getByRole() - 접근성 role
 * 2. getByLabelText() - 폼 label
 * 3. getByPlaceholderText() - placeholder
 * 4. getByText() - 텍스트 내용
 * 5. getByAltText() - alt 속성
 * 6. getByTestId() - 마지막 수단
 */
