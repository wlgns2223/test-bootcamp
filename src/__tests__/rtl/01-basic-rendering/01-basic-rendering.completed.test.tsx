/**
 * React Testing Library 기본 사용법 - 1단계: 렌더링과 기본 쿼리 (정답)
 *
 * 학습 목표:
 * 1. 컴포넌트 렌더링 (render)
 * 2. 기본 쿼리 메서드들 (getBy*, queryBy*, findBy*)
 * 3. 텍스트 기반 선택
 *
 * ✅ 실습 과제 정답:
 * - 실습용 템플릿의 완성된 버전입니다
 * - 각 테스트의 올바른 구현을 확인하세요
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../../components/Button";

describe("RTL 기본 사용법 - Button 컴포넌트 (정답)", () => {
  // ✅ 정답 1: 기본 렌더링과 텍스트 찾기
  it("버튼이 렌더링되고 텍스트를 찾을 수 있다", () => {
    // ✅ Button 컴포넌트를 "Click me" 텍스트로 렌더링
    render(<Button>Click me</Button>);

    // ✅ getByText를 사용해서 "Click me" 텍스트를 가진 버튼을 찾기
    const button = screen.getByText("Click me");

    // ✅ 버튼이 DOM에 존재하는지 확인
    expect(button).toBeInTheDocument();
  });

  // ✅ 정답 2: role로 요소 찾기
  it("버튼을 role로 찾을 수 있다", () => {
    render(<Button>Submit</Button>);

    // ✅ getByRole을 사용해서 button role을 가진 요소를 찾기
    const button = screen.getByRole("button");

    // ✅ 버튼이 DOM에 존재하는지 확인
    expect(button).toBeInTheDocument();

    // ✅ 버튼의 텍스트 내용이 "Submit"인지 확인
    expect(button).toHaveTextContent("Submit");
  });

  // ✅ 정답 3: testid로 요소 찾기
  it("testid로 버튼을 찾을 수 있다", () => {
    // ✅ Button 컴포넌트를 data-testid="my-button"과 "Test Button" 텍스트로 렌더링
    render(<Button data-testid="my-button">Test Button</Button>);

    // ✅ getByTestId를 사용해서 "my-button" testid를 가진 요소를 찾기
    const button = screen.getByTestId("my-button");

    // ✅ 버튼이 DOM에 존재하는지 확인
    expect(button).toBeInTheDocument();
  });

  // ✅ 정답 4: 요소의 속성 확인
  it("버튼의 속성을 확인할 수 있다", () => {
    // ✅ 비활성화된 Button 컴포넌트를 "Disabled Button" 텍스트로 렌더링
    render(<Button disabled>Disabled Button</Button>);

    // ✅ getByRole을 사용해서 버튼을 찾기
    const button = screen.getByRole("button");

    // ✅ 버튼이 비활성화되어 있는지 확인
    expect(button).toBeDisabled();

    // ✅ 버튼이 특정 CSS 클래스들을 가지고 있는지 확인
    expect(button).toHaveClass("px-4", "py-2", "rounded");
  });

  // ✅ 정답 5: queryBy와 getBy의 차이
  it("존재하지 않는 요소는 queryBy로 확인한다", () => {
    render(<Button>Only Button</Button>);

    // ✅ queryByText를 사용해서 존재하지 않는 "Not Found" 텍스트를 찾기
    const nonExistentElement = screen.queryByText("Not Found");

    // ✅ 찾은 요소가 DOM에 존재하지 않는지 확인
    expect(nonExistentElement).not.toBeInTheDocument();

    // 💡 참고: 아래 코드는 에러를 발생시킵니다 (주석 처리)
    // expect(() => screen.getByText('Not Found')).toThrow();
  });
});

/**
 * 💡 정답 해설:
 *
 * 🔍 쿼리 선택 가이드:
 * 1. getByText() - 사용자가 실제로 보는 텍스트로 찾기 (가장 권장)
 * 2. getByRole() - 접근성을 고려한 요소의 역할로 찾기 (두 번째 권장)
 * 3. getByTestId() - 다른 방법으로 찾기 어려울 때만 사용 (마지막 수단)
 *
 * ✅ Assertion 패턴:
 * - 요소 존재 확인: toBeInTheDocument()
 * - 요소 상태 확인: toBeDisabled(), toBeEnabled()
 * - 텍스트 확인: toHaveTextContent()
 * - 속성 확인: toHaveClass(), toHaveAttribute()
 * - 부정 확인: not.toBeInTheDocument()
 *
 * 🚨 주의사항:
 * - getBy*는 요소가 없으면 에러를 던짐
 * - queryBy*는 요소가 없으면 null을 반환
 * - 존재하지 않는 요소를 테스트할 때는 queryBy* 사용
 *
 * 🎯 실무 팁:
 * - 사용자 관점에서 테스트 작성
 * - 구현 세부사항보다는 사용자 경험에 집중
 * - testid는 정말 필요할 때만 사용
 */
