/**
 * React Testing Library 기본 사용법 - 6단계: 쿼리 우선순위와 접근성
 *
 * 학습 목표:
 * 1. RTL 쿼리 우선순위 이해
 * 2. 접근성을 고려한 요소 선택
 * 3. 사용자 중심적인 테스트 작성
 * 4. 다양한 쿼리 방법 비교
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// 접근성을 고려한 샘플 컴포넌트
function AccessibleForm() {
  return (
    <div>
      <h1>User Registration</h1>

      {/* 1순위: role */}
      <button>Submit</button>

      {/* 2순위: label */}
      <label htmlFor="username">Username:</label>
      <input id="username" type="text" />

      {/* 3순위: placeholder */}
      <input type="email" placeholder="Enter your email" />

      {/* 4순위: text content */}
      <p>Welcome to our website!</p>

      {/* 5순위: display value */}
      <input type="text" defaultValue="Default Text" />

      {/* 6순위: alt text */}
      <img src="profile.jpg" alt="User Profile" />

      {/* 7순위: title */}
      <div title="Help tooltip">Hover for help</div>

      {/* 마지막 수단: testid */}
      <div data-testid="custom-element">Custom Element</div>
    </div>
  );
}

describe("RTL 쿼리 우선순위와 접근성", () => {
  // 1. Role로 요소 찾기 (최우선)
  it("1순위: role로 버튼을 찾는다", () => {
    render(<AccessibleForm />);

    // 가장 권장되는 방법 - 스크린 리더가 인식하는 방식
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");

    // role을 명시적으로 지정할 수도 있음
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).toBeInTheDocument();
  });

  // 2. Label로 form 요소 찾기 (2순위)
  it("2순위: label로 input을 찾는다", () => {
    render(<AccessibleForm />);

    // label과 연결된 input 찾기 - 매우 접근성 친화적
    const usernameInput = screen.getByLabelText("Username:");
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toHaveAttribute("type", "text");

    // 정규식으로 부분 매칭도 가능
    const usernameInputRegex = screen.getByLabelText(/username/i);
    expect(usernameInputRegex).toBe(usernameInput);
  });

  // 3. Placeholder로 input 찾기 (3순위)
  it("3순위: placeholder로 input을 찾는다", () => {
    render(<AccessibleForm />);

    // placeholder로 찾기 - label이 없을 때 사용
    const emailInput = screen.getByPlaceholderText("Enter your email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");

    // 정규식 사용
    const emailInputRegex = screen.getByPlaceholderText(/enter.*email/i);
    expect(emailInputRegex).toBe(emailInput);
  });

  // 4. Text content로 요소 찾기 (4순위)
  it("4순위: text content로 요소를 찾는다", () => {
    render(<AccessibleForm />);

    // 텍스트 내용으로 요소 찾기
    const welcomeText = screen.getByText("Welcome to our website!");
    expect(welcomeText).toBeInTheDocument();

    // 부분 텍스트 매칭
    const welcomePartial = screen.getByText(/welcome/i);
    expect(welcomePartial).toBe(welcomeText);

    // 정확한 텍스트 매칭 함수
    const exactText = screen.getByText((content, element) => {
      return content === "Welcome to our website!";
    });
    expect(exactText).toBe(welcomeText);
  });

  // 5. Display value로 input 찾기 (5순위)
  it("5순위: display value로 input을 찾는다", () => {
    render(<AccessibleForm />);

    // input의 현재 값으로 찾기
    const defaultInput = screen.getByDisplayValue("Default Text");
    expect(defaultInput).toBeInTheDocument();
    expect(defaultInput).toHaveValue("Default Text");
  });

  // 6. Alt text로 이미지 찾기 (6순위)
  it("6순위: alt text로 이미지를 찾는다", () => {
    render(<AccessibleForm />);

    // 이미지의 alt 속성으로 찾기
    const profileImage = screen.getByAltText("User Profile");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute("src", "profile.jpg");

    // 정규식 사용
    const profileImageRegex = screen.getByAltText(/profile/i);
    expect(profileImageRegex).toBe(profileImage);
  });

  // 7. Title로 요소 찾기 (7순위)
  it("7순위: title로 요소를 찾는다", () => {
    render(<AccessibleForm />);

    // title 속성으로 찾기 (툴팁 등)
    const helpDiv = screen.getByTitle("Help tooltip");
    expect(helpDiv).toBeInTheDocument();
    expect(helpDiv).toHaveTextContent("Hover for help");
  });

  // 8. TestId로 요소 찾기 (마지막 수단)
  it("마지막 수단: testid로 요소를 찾는다", () => {
    render(<AccessibleForm />);

    // 다른 방법으로 찾기 어려울 때만 사용
    const customElement = screen.getByTestId("custom-element");
    expect(customElement).toBeInTheDocument();
    expect(customElement).toHaveTextContent("Custom Element");
  });

  // 9. 복합 쿼리 예제 - role과 name 조합
  it("role과 name을 조합하여 더 정확한 선택", () => {
    render(
      <div>
        <button>Cancel</button>
        <button>Submit</button>
        <button>Delete</button>
      </div>
    );

    // 여러 버튼 중 특정 버튼 선택
    const submitButton = screen.getByRole("button", { name: "Submit" });
    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    const deleteButton = screen.getByRole("button", { name: "Delete" });

    expect(submitButton).toHaveTextContent("Submit");
    expect(cancelButton).toHaveTextContent("Cancel");
    expect(deleteButton).toHaveTextContent("Delete");
  });

  // 10. 접근성 고려 사항
  it("접근성을 고려한 테스트 작성", async () => {
    const user = userEvent.setup();

    render(
      <form>
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="search"
          placeholder="Type to search..."
          aria-describedby="search-help"
        />
        <div id="search-help">Enter keywords to find content</div>
        <button type="submit">Search</button>
      </form>
    );

    // 접근성 친화적인 방법으로 요소 찾기
    const searchInput = screen.getByRole("searchbox"); // input[type="search"]의 role
    const searchButton = screen.getByRole("button", { name: "Search" });

    // 사용자 상호작용
    await user.type(searchInput, "react testing");
    await user.click(searchButton);

    expect(searchInput).toHaveValue("react testing");

    // aria-describedby로 연결된 도움말 확인
    const helpText = screen.getByText("Enter keywords to find content");
    expect(helpText).toBeInTheDocument();
  });
});

/**
 * 💡 RTL 쿼리 우선순위 (사용자 친화적 순서):
 *
 * 1. getByRole() - 접근성 role (button, textbox, etc.)
 * 2. getByLabelText() - form label과 연결된 요소
 * 3. getByPlaceholderText() - input placeholder
 * 4. getByText() - 텍스트 내용
 * 5. getByDisplayValue() - form 요소의 현재 값
 * 6. getByAltText() - img의 alt 속성
 * 7. getByTitle() - title 속성
 * 8. getByTestId() - data-testid (마지막 수단)
 *
 * 💡 학습 포인트:
 *
 * 1. 사용자와 스크린 리더가 실제로 사용하는 방식을 우선시
 * 2. 구현 세부사항보다는 사용자 경험에 집중
 * 3. 접근성을 고려한 마크업의 중요성
 * 4. role과 name 조합으로 정확한 요소 선택
 * 5. 정규식과 함수를 활용한 유연한 매칭
 * 6. aria 속성을 활용한 접근성 테스트
 * 7. testid는 정말 필요할 때만 사용
 */
