/**
 * React Testing Library 기본 사용법 - 4단계: 폼 입력과 제출 (실습)
 *
 * 학습 목표:
 * 1. 텍스트 입력 필드 테스트
 * 2. 폼 검증 테스트
 * 3. 폼 제출 테스트
 * 4. 조건부 렌더링 테스트
 *
 * 🎯 실습 과제:
 * - UserForm 컴포넌트의 폼 입력과 검증을 테스트해보세요
 * - 텍스트 입력, 폼 제출, 조건부 렌더링을 확인하세요
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import UserForm from "../../../components/UserForm";

describe("RTL 폼 테스트 - UserForm 컴포넌트 (실습)", () => {
  // 🎯 실습 1: 폼 초기 상태 확인
  it("폼이 올바른 초기 상태로 렌더링된다", () => {
    // TODO: UserForm 컴포넌트를 렌더링하세요
    // TODO: getByLabelText를 사용해서 "Name"과 "Email" 입력 필드가 존재하는지 확인하세요
    // TODO: getByRole을 사용해서 name과 email 입력 필드의 초기값이 비어있는지 확인하세요
    // TODO: getByRole을 사용해서 submit 버튼이 비활성화되어 있는지 확인하세요
  });

  // 🎯 실습 2: 텍스트 입력 테스트
  it("사용자가 이름을 입력할 수 있다", async () => {
    // TODO: userEvent를 설정하고 UserForm을 렌더링하세요
    // TODO: getByRole을 사용해서 name 입력 필드를 찾으세요
    // TODO: user.type()을 사용해서 "John Doe"를 입력하세요
    // TODO: 입력된 값이 "John Doe"인지 확인하세요 (toHaveValue 사용)
  });

  // 🎯 실습 3: 이메일 입력 테스트
  it("사용자가 이메일을 입력할 수 있다", async () => {
    const user = userEvent.setup();
    render(<UserForm />);

    // TODO: getByRole을 사용해서 email 입력 필드를 찾고 "john@example.com"을 입력하세요

    // TODO: 입력된 값이 올바른지 확인하세요
  });

  // 🎯 실습 4: 폼 검증 테스트 - 부분 입력
  it("이름만 입력했을 때 제출 버튼이 여전히 비활성화되어 있다", async () => {
    // TODO: userEvent 설정과 컴포넌트 렌더링
    // TODO: getByRole을 사용해서 name 입력 필드와 submit 버튼을 찾으세요
    // TODO: 이름만 "John"을 입력하세요
    // TODO: 제출 버튼이 여전히 비활성화되어 있는지 확인하세요
  });

  // 🎯 실습 5: 폼 검증 테스트 - 완전 입력
  it("이름과 이메일을 모두 입력하면 제출 버튼이 활성화된다", async () => {
    // TODO: 필요한 설정을 하세요
    // TODO: getByRole을 사용해서 모든 입력 필드와 제출 버튼을 찾으세요
    // TODO: 이름과 이메일을 모두 입력하세요
    // TODO: 제출 버튼이 활성화되었는지 확인하세요 (toBeEnabled 사용)
  });

  // 🎯 실습 6: 폼 제출 테스트
  it("폼을 제출하면 onSubmit 콜백이 올바른 데이터와 함께 호출된다", async () => {
    // TODO: userEvent와 mock 함수를 설정하세요
    // TODO: mockOnSubmit을 props로 전달하여 UserForm을 렌더링하세요
    // TODO: getByRole을 사용해서 입력 필드들과 제출 버튼을 찾으세요
    // TODO: 폼에 데이터를 입력하세요 ("Jane Smith", "jane@example.com")
    // TODO: 제출 버튼을 클릭하세요
    // TODO: mockOnSubmit이 올바른 데이터와 함께 호출되었는지 확인하세요
  });

  // 🎯 실습 7: 성공 메시지 표시 테스트
  it("폼 제출 후 성공 메시지가 표시된다", async () => {
    const user = userEvent.setup();
    render(<UserForm />);

    // TODO: getByRole을 사용해서 필요한 요소들을 찾으세요

    // TODO: 폼에 데이터를 입력하고 제출하세요

    // TODO: 성공 메시지가 표시되는지 확인하세요 (getByTestId "success-message")

    // TODO: 성공 메시지 텍스트가 올바른지 확인하세요

    // TODO: 폼이 더 이상 보이지 않는지 확인하세요 (queryByRole 사용)
  });
});

/**
 * 💡 실습에서 사용할 주요 API들:
 *
 * 📝 UserForm 컴포넌트:
 * - onSubmit?: (userData: {name: string, email: string}) => void
 * - 이름과 이메일이 모두 입력되어야 제출 버튼 활성화
 * - 제출 후 성공 메시지 표시
 *
 * 🎯 요소 찾기:
 * - 이름 입력 필드: getByRole("textbox", { name: /name/i })
 * - 이메일 입력 필드: getByRole("textbox", { name: /email/i })
 * - 제출 버튼: getByRole("button", { name: /submit/i })
 * - 성공 메시지: getByTestId("success-message")
 *
 * 🔍 폼 테스트 주요 API:
 * - screen.getByLabelText(/name/i) - label로 input 찾기
 * - screen.getByRole("textbox", { name: /name/i }) - 역할과 이름으로 input 찾기
 * - screen.getByRole("button", { name: /submit/i }) - 역할과 이름으로 button 찾기
 * - await user.type(input, "text") - 텍스트 입력
 * - expect(input).toHaveValue("value") - input 값 확인
 * - expect(button).toBeEnabled() - 버튼 활성화 확인
 * - expect(button).toBeDisabled() - 버튼 비활성화 확인
 * - screen.queryByRole() - 요소 존재 여부 확인
 *
 * 🧪 Mock 함수:
 * - const mockFn = jest.fn() - mock 함수 생성
 * - expect(mockFn).toHaveBeenCalledWith(data) - 호출 인자 확인
 */
