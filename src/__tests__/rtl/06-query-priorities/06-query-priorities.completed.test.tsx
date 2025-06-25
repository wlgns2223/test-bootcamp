/**
 * React Testing Library 기본 사용법 - 6단계: 쿼리 우선순위와 접근성 (정답)
 *
 * ✅ 실습 과제 정답: 접근성 친화적인 쿼리 사용법
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

describe("RTL 쿼리 우선순위와 접근성 (정답)", () => {
  // ✅ 정답 1: Role로 요소 찾기 (최우선)
  it("role로 버튼을 찾는다", () => {
    render(<AccessibleForm />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");
  });

  // ✅ 정답 2: Label로 form 요소 찾기
  it("label로 input을 찾는다", () => {
    render(<AccessibleForm />);
    const usernameInput = screen.getByLabelText("Username:");
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("type", "text");
  });

  // ✅ 정답 3: Placeholder로 input 찾기
  it("placeholder로 input을 찾는다", () => {
    render(<AccessibleForm />);
    const emailInput = screen.getByPlaceholderText("Enter your email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  // ✅ 정답 4: Alt text로 이미지 찾기
  it("alt text로 이미지를 찾는다", () => {
    render(<AccessibleForm />);
    const profileImage = screen.getByAltText("User Profile");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute("src", "profile.jpg");
  });

  // ✅ 정답 5: TestId로 요소 찾기 (마지막 수단)
  it("testid로 요소를 찾는다", () => {
    render(<AccessibleForm />);
    const customElement = screen.getByTestId("custom-element");
    expect(customElement).toBeInTheDocument();
    expect(customElement).toHaveTextContent("Custom Element");
  });
});

/**
 * 💡 정답 해설:
 *
 * 🥇 우선순위가 높은 쿼리일수록 사용자 친화적
 * - 실제 사용자와 스크린 리더가 사용하는 방식
 * - 구현 세부사항이 아닌 사용자 경험에 집중
 *
 * 🎯 실무 적용:
 * - role > label > placeholder > text > alt > testid 순서로 고려
 * - testid는 정말 필요할 때만 사용
 * - 접근성을 고려한 마크업의 중요성
 */
