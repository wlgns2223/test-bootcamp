/**
 * React Testing Library 기본 사용법 - 4단계: 폼 입력과 제출 (정답)
 *
 * 학습 목표:
 * 1. 텍스트 입력 필드 테스트
 * 2. 폼 검증 테스트
 * 3. 폼 제출 테스트
 * 4. 조건부 렌더링 테스트
 *
 * ✅ 실습 과제 정답:
 * - 폼 입력과 제출 테스트의 완성된 버전입니다
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UserForm from "../../../components/UserForm";

describe("RTL 폼 테스트 - UserForm 컴포넌트 (정답)", () => {
  // ✅ 정답 1: 폼 초기 상태 확인
  it("폼이 올바른 초기 상태로 렌더링된다", () => {
    // ✅ UserForm 컴포넌트를 렌더링
    render(<UserForm />);

    // ✅ getByLabelText를 사용해서 입력 필드들이 존재하는지 확인
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    // ✅ 초기값이 비어있는지 확인
    expect(screen.getByTestId("name-input")).toHaveValue("");
    expect(screen.getByTestId("email-input")).toHaveValue("");

    // ✅ 제출 버튼이 비활성화되어 있는지 확인
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  // ✅ 정답 2: 텍스트 입력 테스트
  it("사용자가 이름을 입력할 수 있다", async () => {
    // ✅ userEvent를 설정하고 UserForm을 렌더링
    const user = userEvent.setup();
    render(<UserForm />);

    // ✅ name-input을 찾기
    const nameInput = screen.getByTestId("name-input");

    // ✅ user.type()을 사용해서 "John Doe"를 입력
    await user.type(nameInput, "John Doe");

    // ✅ 입력된 값이 "John Doe"인지 확인
    expect(nameInput).toHaveValue("John Doe");
  });

  // ✅ 정답 3: 이메일 입력 테스트
  it("사용자가 이메일을 입력할 수 있다", async () => {
    const user = userEvent.setup();
    render(<UserForm />);

    // ✅ email-input을 찾고 "john@example.com"을 입력
    const emailInput = screen.getByTestId("email-input");
    await user.type(emailInput, "john@example.com");

    // ✅ 입력된 값이 올바른지 확인
    expect(emailInput).toHaveValue("john@example.com");
  });

  // ✅ 정답 4: 폼 검증 테스트 - 부분 입력
  it("이름만 입력했을 때 제출 버튼이 여전히 비활성화되어 있다", async () => {
    // ✅ userEvent 설정과 컴포넌트 렌더링
    const user = userEvent.setup();
    render(<UserForm />);

    // ✅ name-input과 submit-button을 찾기
    const nameInput = screen.getByTestId("name-input");
    const submitButton = screen.getByTestId("submit-button");

    // ✅ 이름만 "John"을 입력
    await user.type(nameInput, "John");

    // ✅ 제출 버튼이 여전히 비활성화되어 있는지 확인
    expect(submitButton).toBeDisabled();
  });

  // ✅ 정답 5: 폼 검증 테스트 - 완전 입력
  it("이름과 이메일을 모두 입력하면 제출 버튼이 활성화된다", async () => {
    // ✅ 필요한 설정
    const user = userEvent.setup();
    render(<UserForm />);

    // ✅ 모든 입력 필드와 제출 버튼을 찾기
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-button");

    // ✅ 이름과 이메일을 모두 입력
    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");

    // ✅ 제출 버튼이 활성화되었는지 확인
    expect(submitButton).toBeEnabled();
  });

  // ✅ 정답 6: 폼 제출 테스트
  it("폼을 제출하면 onSubmit 콜백이 올바른 데이터와 함께 호출된다", async () => {
    // ✅ userEvent와 mock 함수를 설정
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn();

    // ✅ mockOnSubmit을 props로 전달하여 UserForm을 렌더링
    render(<UserForm onSubmit={mockOnSubmit} />);

    // ✅ 입력 필드들과 제출 버튼을 찾기
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-button");

    // ✅ 폼에 데이터를 입력
    await user.type(nameInput, "Jane Smith");
    await user.type(emailInput, "jane@example.com");

    // ✅ 제출 버튼을 클릭
    await user.click(submitButton);

    // ✅ mockOnSubmit이 올바른 데이터와 함께 호출되었는지 확인
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "Jane Smith",
      email: "jane@example.com",
    });
  });

  // ✅ 정답 7: 성공 메시지 표시 테스트
  it("폼 제출 후 성공 메시지가 표시된다", async () => {
    const user = userEvent.setup();
    render(<UserForm />);

    // ✅ 필요한 요소들을 찾기
    const nameInput = screen.getByTestId("name-input");
    const emailInput = screen.getByTestId("email-input");
    const submitButton = screen.getByTestId("submit-button");

    // ✅ 폼에 데이터를 입력하고 제출
    await user.type(nameInput, "Alice Cooper");
    await user.type(emailInput, "alice@example.com");
    await user.click(submitButton);

    // ✅ 성공 메시지가 표시되는지 확인
    expect(screen.getByTestId("success-message")).toBeInTheDocument();

    // ✅ 성공 메시지 텍스트가 올바른지 확인
    expect(
      screen.getByText("Form submitted successfully!")
    ).toBeInTheDocument();

    // ✅ 폼이 더 이상 보이지 않는지 확인
    expect(screen.queryByTestId("name-input")).not.toBeInTheDocument();
  });
});

/**
 * 💡 정답 해설:
 *
 * 📝 폼 테스트의 핵심 패턴:
 * 1. 초기 상태 확인 - 빈 값, 비활성화된 버튼
 * 2. 입력 테스트 - 개별 필드 입력 확인
 * 3. 검증 테스트 - 조건부 버튼 활성화
 * 4. 제출 테스트 - 콜백 함수 호출 확인
 * 5. UI 변화 테스트 - 제출 후 상태 변화
 *
 * 🔍 쿼리 전략:
 * - getByLabelText() - 폼 요소는 label로 찾는 것이 가장 접근성 친화적
 * - getByTestId() - 정확한 요소 식별이 필요할 때
 * - queryByTestId() - 요소가 사라졌는지 확인할 때
 *
 * ✅ 검증 패턴:
 * - toHaveValue() - input의 현재 값 확인
 * - toBeEnabled()/toBeDisabled() - 버튼 상태 확인
 * - toHaveBeenCalledWith() - mock 함수 호출 인자 확인
 * - toBeInTheDocument() - 요소 존재 확인
 *
 * 🎯 실무 적용:
 * - 폼 검증 로직의 정확성 확인
 * - 사용자 경험(UX) 테스트
 * - 에러 처리 및 성공 피드백 테스트
 * - 접근성 고려한 테스트 작성
 */
