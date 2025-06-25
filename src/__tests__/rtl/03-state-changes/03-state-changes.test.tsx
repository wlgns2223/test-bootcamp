/**
 * React Testing Library 기본 사용법 - 3단계: 상태 변화 테스트
 *
 * 학습 목표:
 * 1. useState를 사용한 컴포넌트 상태 테스트
 * 2. 상태 변화에 따른 UI 업데이트 확인
 * 3. 복합적인 사용자 상호작용
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Counter from "../../../components/Counter";

describe("RTL 상태 변화 테스트 - Counter 컴포넌트", () => {
  // 1. 초기 상태 확인
  it("초기값이 올바르게 표시된다", () => {
    render(<Counter />);

    // 초기값 0이 표시되는지 확인
    const counterValue = screen.getByTestId("counter-value");
    expect(counterValue).toHaveTextContent("0");
  });

  // 2. 사용자 정의 초기값
  it("사용자 정의 초기값이 올바르게 표시된다", () => {
    render(<Counter initialValue={10} />);

    const counterValue = screen.getByTestId("counter-value");
    expect(counterValue).toHaveTextContent("10");
  });

  // 3. 증가 버튼 테스트
  it("증가 버튼이 카운터를 올바르게 증가시킨다", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    const counterValue = screen.getByTestId("counter-value");
    const incrementButton = screen.getByTestId("increment-button");

    // 초기값 확인
    expect(counterValue).toHaveTextContent("0");

    // 증가 버튼 클릭
    await user.click(incrementButton);

    // 값이 1로 변경되었는지 확인
    expect(counterValue).toHaveTextContent("1");
  });

  // 4. 감소 버튼 테스트
  it("감소 버튼이 카운터를 올바르게 감소시킨다", async () => {
    const user = userEvent.setup();

    render(<Counter initialValue={5} />);

    const counterValue = screen.getByTestId("counter-value");
    const decrementButton = screen.getByTestId("decrement-button");

    // 초기값 확인
    expect(counterValue).toHaveTextContent("5");

    // 감소 버튼 클릭
    await user.click(decrementButton);

    // 값이 4로 변경되었는지 확인
    expect(counterValue).toHaveTextContent("4");
  });

  // 5. 사용자 정의 스텝 테스트
  it("사용자 정의 스텝으로 증가/감소한다", async () => {
    const user = userEvent.setup();

    render(<Counter initialValue={0} step={5} />);

    const counterValue = screen.getByTestId("counter-value");
    const incrementButton = screen.getByTestId("increment-button");
    const decrementButton = screen.getByTestId("decrement-button");

    // 5씩 증가
    await user.click(incrementButton);
    expect(counterValue).toHaveTextContent("5");

    await user.click(incrementButton);
    expect(counterValue).toHaveTextContent("10");

    // 5씩 감소
    await user.click(decrementButton);
    expect(counterValue).toHaveTextContent("5");
  });

  // 6. 리셋 버튼 테스트
  it("리셋 버튼이 카운터를 초기값으로 되돌린다", async () => {
    const user = userEvent.setup();

    render(<Counter initialValue={3} />);

    const counterValue = screen.getByTestId("counter-value");
    const incrementButton = screen.getByTestId("increment-button");
    const resetButton = screen.getByTestId("reset-button");

    // 값을 여러 번 증가
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(counterValue).toHaveTextContent("6");

    // 리셋 버튼 클릭
    await user.click(resetButton);

    // 초기값으로 되돌아갔는지 확인
    expect(counterValue).toHaveTextContent("3");
  });

  // 7. 복합적인 상호작용 테스트
  it("여러 버튼을 조합해서 사용할 수 있다", async () => {
    const user = userEvent.setup();

    render(<Counter initialValue={0} step={2} />);

    const counterValue = screen.getByTestId("counter-value");
    const incrementButton = screen.getByTestId("increment-button");
    const decrementButton = screen.getByTestId("decrement-button");
    const resetButton = screen.getByTestId("reset-button");

    // 복합적인 조작
    await user.click(incrementButton); // +2 = 2
    await user.click(incrementButton); // +2 = 4
    await user.click(decrementButton); // -2 = 2
    await user.click(incrementButton); // +2 = 4

    expect(counterValue).toHaveTextContent("4");

    // 리셋 후 다시 조작
    await user.click(resetButton); // = 0
    await user.click(decrementButton); // -2 = -2

    expect(counterValue).toHaveTextContent("-2");
  });
});

/**
 * 💡 학습 포인트:
 *
 * 1. 컴포넌트 초기 상태 테스트
 * 2. props를 통한 초기값 설정 테스트
 * 3. 사용자 상호작용 후 상태 변화 확인
 * 4. 여러 번의 연속적인 상호작용 테스트
 * 5. 사용자 정의 props(step, initialValue) 테스트
 * 6. 리셋 기능과 같은 복원 동작 테스트
 * 7. 복합적인 시나리오 테스트
 * 8. data-testid를 활용한 정확한 요소 선택
 * 9. 음수 값도 정상적으로 처리되는지 확인
 */
