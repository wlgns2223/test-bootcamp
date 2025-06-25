/**
 * React Testing Library 기본 사용법 - 3단계: 상태 변화 테스트 (실습)
 *
 * 학습 목표:
 * 1. useState를 사용한 컴포넌트 상태 테스트
 * 2. 상태 변화에 따른 UI 업데이트 확인
 * 3. 복합적인 사용자 상호작용
 *
 * 🎯 실습 과제:
 * - Counter 컴포넌트의 상태 변화를 테스트해보세요
 * - 버튼 클릭에 따른 숫자 변화를 확인하세요
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Counter from "../../../components/Counter";

describe("RTL 상태 변화 테스트 - Counter 컴포넌트 (실습)", () => {
  // 🎯 실습 1: 초기 상태 확인
  it("초기값이 올바르게 표시된다", () => {
    // TODO: Counter 컴포넌트를 렌더링하세요
    // TODO: getByTestId를 사용해서 "counter-value" 요소를 찾으세요
    // TODO: 초기값이 '0'인지 확인하세요 (toHaveTextContent 사용)
  });

  // 🎯 실습 2: 사용자 정의 초기값
  it("사용자 정의 초기값이 올바르게 표시된다", () => {
    // TODO: initialValue={10}으로 Counter 컴포넌트를 렌더링하세요
    // TODO: counter-value 요소를 찾아서 '10'인지 확인하세요
  });

  // 🎯 실습 3: 증가 버튼 테스트
  it("증가 버튼이 카운터를 올바르게 증가시킨다", async () => {
    // TODO: userEvent를 설정하세요
    // TODO: Counter 컴포넌트를 렌더링하세요
    // TODO: counter-value와 increment-button 요소를 찾으세요
    // TODO: 초기값이 '0'인지 확인하세요
    // TODO: 증가 버튼을 클릭하세요
    // TODO: 값이 '1'로 변경되었는지 확인하세요
  });

  // 🎯 실습 4: 감소 버튼 테스트
  it("감소 버튼이 카운터를 올바르게 감소시킨다", async () => {
    const user = userEvent.setup();

    // TODO: initialValue={5}로 Counter를 렌더링하세요

    // TODO: counter-value와 decrement-button을 찾으세요

    // TODO: 초기값이 '5'인지 확인하세요

    // TODO: 감소 버튼을 클릭하세요

    // TODO: 값이 '4'로 변경되었는지 확인하세요
  });

  // 🎯 실습 5: 사용자 정의 스텝 테스트
  it("사용자 정의 스텝으로 증가/감소한다", async () => {
    // TODO: userEvent를 설정하세요
    // TODO: initialValue={0}, step={5}로 Counter를 렌더링하세요
    // TODO: 필요한 요소들을 찾으세요 (counter-value, increment-button, decrement-button)
    // TODO: 증가 버튼을 클릭하고 값이 '5'인지 확인하세요
    // TODO: 다시 증가 버튼을 클릭하고 값이 '10'인지 확인하세요
    // TODO: 감소 버튼을 클릭하고 값이 '5'인지 확인하세요
  });

  // 🎯 실습 6: 리셋 버튼 테스트
  it("리셋 버튼이 카운터를 초기값으로 되돌린다", async () => {
    // TODO: userEvent 설정과 initialValue={3}으로 Counter 렌더링
    // TODO: 필요한 모든 요소들을 찾으세요
    // TODO: 증가 버튼을 3번 클릭하세요
    // TODO: 값이 '6'인지 확인하세요
    // TODO: 리셋 버튼을 클릭하세요
    // TODO: 값이 초기값 '3'으로 되돌아갔는지 확인하세요
  });
});

/**
 * 💡 실습에서 사용할 주요 API들:
 *
 * 🎮 Counter 컴포넌트 props:
 * - initialValue?: number - 초기값 (기본값: 0)
 * - step?: number - 증가/감소 단위 (기본값: 1)
 *
 * 🎯 TestId 요소들:
 * - "counter-value" - 현재 카운터 값을 표시하는 요소
 * - "increment-button" - 증가 버튼
 * - "decrement-button" - 감소 버튼
 * - "reset-button" - 리셋 버튼
 *
 * 🔍 주요 쿼리:
 * - screen.getByTestId("testid") - testid로 요소 찾기
 * - expect(element).toHaveTextContent("text") - 텍스트 내용 확인
 *
 * ⚡ 상태 변화 테스트 패턴:
 * 1. 초기 상태 확인
 * 2. 사용자 액션 수행
 * 3. 변경된 상태 확인
 * 4. 여러 액션의 누적 효과 확인
 */
