/**
 * React Testing Library 기본 사용법 - 1단계: 렌더링과 기본 쿼리
 *
 * 학습 목표:
 * 1. 컴포넌트 렌더링 (render)
 * 2. 기본 쿼리 메서드들 (getBy*, queryBy*, findBy*)
 * 3. 텍스트 기반 선택
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../../components/Button";

describe("RTL 기본 사용법 - Button 컴포넌트", () => {
  // 1. 기본 렌더링과 텍스트 찾기
  it("버튼이 렌더링되고 텍스트를 찾을 수 있다", () => {
    // 컴포넌트를 DOM에 렌더링
    render(<Button>Click me</Button>);

    // getByText: 텍스트로 요소 찾기 (없으면 에러)
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  // 2. role로 요소 찾기
  it("버튼을 role로 찾을 수 있다", () => {
    render(<Button>Submit</Button>);

    // getByRole: 접근성 role로 요소 찾기
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");
  });

  // 3. testid로 요소 찾기
  it("testid로 버튼을 찾을 수 있다", () => {
    render(<Button data-testid="my-button">Test Button</Button>);

    // getByTestId: data-testid 속성으로 요소 찾기
    const button = screen.getByTestId("my-button");
    expect(button).toBeInTheDocument();
  });

  // 4. 요소의 속성 확인
  it("버튼의 속성을 확인할 수 있다", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button");

    // 버튼이 비활성화되어 있는지 확인
    expect(button).toBeDisabled();

    // CSS 클래스 확인 (부분 매칭)
    expect(button).toHaveClass("px-4", "py-2", "rounded");
  });

  // 5. queryBy와 getBy의 차이
  it("존재하지 않는 요소는 queryBy로 확인한다", () => {
    render(<Button>Only Button</Button>);

    // getByText: 없으면 에러 발생
    // queryByText: 없으면 null 반환
    const nonExistentElement = screen.queryByText("Not Found");
    expect(nonExistentElement).not.toBeInTheDocument();

    // 아래 코드는 에러를 발생시킴 (주석 처리)
    // expect(() => screen.getByText('Not Found')).toThrow();
  });
});

/**
 * 💡 학습 포인트:
 *
 * 1. render() - 컴포넌트를 가상 DOM에 렌더링
 * 2. screen - 렌더링된 컴포넌트에서 요소를 찾는 객체
 * 3. getByText() - 텍스트로 요소 찾기 (없으면 에러)
 * 4. getByRole() - 접근성 role로 찾기 (button, textbox, etc.)
 * 5. getByTestId() - data-testid로 찾기
 * 6. queryBy* - 요소가 없을 때 null 반환 (에러 X)
 * 7. expect().toBeInTheDocument() - 요소가 DOM에 있는지 확인
 * 8. expect().toBeDisabled() - 요소가 비활성화되어 있는지 확인
 * 9. expect().toHaveTextContent() - 텍스트 내용 확인
 * 10. expect().toHaveClass() - CSS 클래스 확인
 */
