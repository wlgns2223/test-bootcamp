/**
 * React Testing Library 기본 사용법 - 4단계: 폼 입력과 제출
 *
 * 학습 목표:
 * 1. 텍스트 입력 필드 테스트
 * 2. 폼 검증 테스트
 * 3. 폼 제출 테스트
 * 4. 조건부 렌더링 테스트
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UserForm from "../../../components/UserForm";

describe("RTL 폼 테스트 - UserForm 컴포넌트", () => {
  // 1. 폼 초기 상태 확인
  it("폼이 올바른 초기 상태로 렌더링된다", () => {
    render(<UserForm />);

    // 입력 필드들이 존재하는지 확인
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // 초기값이 비어있는지 확인
    expect(screen.getByTestId("name-input")).toHaveValue("");
    expect(screen.getByTestId("email-input")).toHaveValue("");

    // 제출 버튼이 비활성화되어 있는지 확인
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  // 2. 텍스트 입력 테스트
  it("사용자가 이름을 입력할 수 있다", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    const nameInput = screen.getByTestId("name-input");

    // 텍스트 입력
    await user.type(nameInput, "John Doe");

    // 입력된 값 확인
    expect(nameInput).toHaveValue("John Doe");
  });

  // 3. 이메일 입력 테스트
  it("사용자가 이메일을 입력할 수 있다", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    const emailInput = screen.getByTestId("email-input");

    // 이메일 입력
    await user.type(emailInput, "john@example.com");

    // 입력된 값 확인
    expect(emailInput).toHaveValue("john@example.com");
  });

  // 4. 폼 검증 테스트 - 부분 입력
  it("이름만 입력했을 때 제출 버튼이 여전히 비활성화되어 있다", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    const nameInput = screen.getByTestId("name-input");
    const submitButton = screen.getByTestId("submit-button");

    // 이름만 입력
    await user.type(nameInput, "John");

    // 제출 버튼은 여전히 비활성화
    expect(submitButton).toBeDisabled();
  });

  // 5. 폼 검증 테스트 - 완전 입력
  it("이름과 이메일을 모두 입력하면 제출 버튼이 활성화된다", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-button");

    // 이름과 이메일 입력
    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");

    // 제출 버튼이 활성화됨
    expect(submitButton).toBeEnabled();
  });

  // 6. 폼 제출 테스트
  it("폼을 제출하면 onSubmit 콜백이 올바른 데이터와 함께 호출된다", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();

    render(<UserForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-button");

    // 폼 입력
    await user.type(nameInput, "Jane Smith");
    await user.type(emailInput, "jane@example.com");

    // 폼 제출
    await user.click(submitButton);

    // onSubmit이 올바른 데이터와 함께 호출되었는지 확인
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "Jane Smith",
      email: "jane@example.com",
    });
  });

  // 7. Enter 키로 폼 제출 테스트
  it("Enter 키로 폼을 제출할 수 있다", async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();

    render(<UserForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");

    // 폼 입력
    await user.type(nameInput, "Bob Wilson");
    await user.type(emailInput, "bob@example.com");

    // Enter 키로 제출
    await user.keyboard("{Enter}");

    // onSubmit이 호출되었는지 확인
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "Bob Wilson",
      email: "bob@example.com",
    });
  });

  // 8. 성공 메시지 표시 테스트
  it("폼 제출 후 성공 메시지가 표시된다", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-button");

    // 폼 입력 및 제출
    await user.type(nameInput, "Alice Cooper");
    await user.type(emailInput, "alice@example.com");
    await user.click(submitButton);

    // 성공 메시지 확인
    expect(screen.getByTestId("success-message")).toBeInTheDocument();
    expect(
      screen.getByText("Form submitted successfully!")
    ).toBeInTheDocument();

    // 폼이 더 이상 보이지 않는지 확인
    expect(screen.queryByTestId("name-input")).not.toBeInTheDocument();
  });

  // 9. 입력 필드 클리어 테스트
  it("입력 필드의 내용을 지울 수 있다", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    const nameInput = screen.getByTestId("name-input");

    // 텍스트 입력
    await user.type(nameInput, "Test User");
    expect(nameInput).toHaveValue("Test User");

    // 내용 지우기
    await user.clear(nameInput);
    expect(nameInput).toHaveValue("");
  });
});

/**
 * 💡 학습 포인트:
 *
 * 1. getByLabelText() - label과 연결된 input 찾기
 * 2. expect().toHaveValue() - input의 value 확인
 * 3. await user.type() - 텍스트 입력 시뮬레이션
 * 4. await user.clear() - 입력 필드 내용 지우기
 * 5. await user.keyboard('{Enter}') - Enter 키 입력
 * 6. expect().toBeEnabled() / toBeDisabled() - 버튼 상태 확인
 * 7. 폼 검증 로직 테스트 (조건부 버튼 활성화)
 * 8. 콜백 함수가 올바른 인자와 함께 호출되는지 확인
 * 9. 조건부 렌더링 테스트 (성공 메시지)
 * 10. queryBy로 요소가 사라졌는지 확인
 */
