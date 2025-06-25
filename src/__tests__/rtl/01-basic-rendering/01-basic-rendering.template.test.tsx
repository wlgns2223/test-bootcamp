/**
 * React Testing Library 기본 사용법 - 1단계: 렌더링과 기본 쿼리 (실습)
 *
 * 학습 목표:
 * 1. 컴포넌트 렌더링 (render)
 * 2. 기본 쿼리 메서드들 (getBy*, queryBy*, findBy*)
 * 3. 텍스트 기반 선택
 *
 * 🎯 실습 과제:
 * - 아래의 빈 테스트들을 완성해보세요
 * - 주석을 참고하여 적절한 쿼리와 assertion을 작성하세요
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../../components/Button";

describe("RTL 기본 사용법 - Button 컴포넌트 (실습)", () => {
  // 🎯 실습 1: 기본 렌더링과 텍스트 찾기
  it("버튼이 렌더링되고 텍스트를 찾을 수 있다", () => {
    // TODO: Button 컴포넌트를 "Click me" 텍스트로 렌더링하세요
    // TODO: getByText를 사용해서 "Click me" 텍스트를 가진 버튼을 찾으세요
    // TODO: 버튼이 DOM에 존재하는지 확인하세요
  });

  // 🎯 실습 2: role로 요소 찾기
  it("버튼을 role로 찾을 수 있다", () => {
    render(<Button>Submit</Button>);

    // TODO: getByRole을 사용해서 button role을 가진 요소를 찾으세요

    // TODO: 버튼이 DOM에 존재하는지 확인하세요

    // TODO: 버튼의 텍스트 내용이 "Submit"인지 확인하세요
  });

  // 🎯 실습 3: testid로 요소 찾기
  it("testid로 버튼을 찾을 수 있다", () => {
    // TODO: Button 컴포넌트를 data-testid="my-button"과 "Test Button" 텍스트로 렌더링하세요
    // TODO: getByTestId를 사용해서 "my-button" testid를 가진 요소를 찾으세요
    // TODO: 버튼이 DOM에 존재하는지 확인하세요
  });

  // 🎯 실습 4: 요소의 속성 확인
  it("버튼의 속성을 확인할 수 있다", () => {
    // TODO: 비활성화된 Button 컴포넌트를 "Disabled Button" 텍스트로 렌더링하세요
    // 힌트: disabled prop을 사용하세요
    // TODO: getByRole을 사용해서 버튼을 찾으세요
    // TODO: 버튼이 비활성화되어 있는지 확인하세요 (toBeDisabled 사용)
    // TODO: 버튼이 특정 CSS 클래스들을 가지고 있는지 확인하세요
    // 힌트: "px-4", "py-2", "rounded" 클래스들을 확인해보세요
  });

  // 🎯 실습 5: queryBy와 getBy의 차이
  it("존재하지 않는 요소는 queryBy로 확인한다", () => {
    render(<Button>Only Button</Button>);

    // TODO: queryByText를 사용해서 존재하지 않는 "Not Found" 텍스트를 찾으세요

    // TODO: 찾은 요소가 DOM에 존재하지 않는지 확인하세요 (not.toBeInTheDocument 사용)

    // 💡 참고: getByText("Not Found")를 사용하면 에러가 발생합니다!
    // queryByText는 요소가 없을 때 null을 반환하지만,
    // getByText는 요소가 없을 때 에러를 던집니다.
  });
});

/**
 * 💡 실습에서 사용할 주요 API들:
 *
 * 🔍 쿼리 메서드:
 * - render(<Component />) - 컴포넌트를 가상 DOM에 렌더링
 * - screen.getByText("텍스트") - 텍스트로 요소 찾기
 * - screen.getByRole("button") - role로 요소 찾기
 * - screen.getByTestId("testid") - data-testid로 요소 찾기
 * - screen.queryByText("텍스트") - 텍스트로 요소 찾기 (없으면 null)
 *
 * ✅ Assertion 메서드:
 * - expect(element).toBeInTheDocument() - 요소가 DOM에 있는지 확인
 * - expect(element).toBeDisabled() - 요소가 비활성화되어 있는지 확인
 * - expect(element).toHaveTextContent("텍스트") - 텍스트 내용 확인
 * - expect(element).toHaveClass("클래스명") - CSS 클래스 확인
 * - expect(element).not.toBeInTheDocument() - 요소가 DOM에 없는지 확인
 *
 * 📝 Button 컴포넌트 사용법:
 * - <Button>텍스트</Button>
 * - <Button disabled>텍스트</Button>
 * - <Button data-testid="id">텍스트</Button>
 */
