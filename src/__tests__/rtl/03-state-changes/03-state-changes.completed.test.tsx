/**
 * React Testing Library 기본 사용법 - 3단계: 상태 변화 테스트 (정답)
 *
 * 학습 목표:
 * 1. useState를 사용한 컴포넌트 상태 테스트
 * 2. 상태 변화에 따른 UI 업데이트 확인
 * 3. 복합적인 사용자 상호작용
 *
 * ✅ 실습 과제 정답:
 * - Counter 컴포넌트 상태 테스트의 완성된 버전입니다
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Counter from "../../../components/Counter";

describe("RTL 상태 변화 테스트 - Counter 컴포넌트 (정답)", () => {
  // ✅ 정답 1: 초기 상태 확인
  it("초기값이 올바르게 표시된다", () => {
    // ✅ Counter 컴포넌트를 렌더링
    render(<Counter />);

    // ✅ getByText를 사용해서 "0" 텍스트를 찾기
    const counterValue = screen.getByText("0");

    // ✅ 초기값이 '0'인지 확인
    expect(counterValue).toHaveTextContent("0");
  });

  // ✅ 정답 2: 사용자 정의 초기값
  it("사용자 정의 초기값이 올바르게 표시된다", () => {
    // ✅ initialValue={10}으로 Counter 컴포넌트를 렌더링
    render(<Counter initialValue={10} />);

    // ✅ getByText를 사용해서 "10" 텍스트를 찾기
    const counterValue = screen.getByText("10");
    expect(counterValue).toHaveTextContent("10");
  });

  // ✅ 정답 3: 증가 버튼 테스트
  it("증가 버튼이 카운터를 올바르게 증가시킨다", async () => {
    // ✅ userEvent를 설정
    const user = userEvent.setup();

    // ✅ Counter 컴포넌트를 렌더링
    render(<Counter />);

    // ✅ getByText로 "0" 텍스트와 getByRole로 "+" 버튼을 찾기
    const counterValue = screen.getByText("0");
    const incrementButton = screen.getByRole("button", { name: "+" });

    // ✅ 초기값이 '0'인지 확인
    expect(counterValue).toHaveTextContent("0");

    // ✅ 증가 버튼을 클릭
    await user.click(incrementButton);

    // ✅ 값이 '1'로 변경되었는지 확인
    expect(counterValue).toHaveTextContent("1");
  });

  // ✅ 정답 4: 감소 버튼 테스트
  it("감소 버튼이 카운터를 올바르게 감소시킨다", async () => {
    const user = userEvent.setup();

    // ✅ initialValue={5}로 Counter를 렌더링
    render(<Counter initialValue={5} />);

    // ✅ getByText로 "5" 텍스트와 getByRole로 "-" 버튼을 찾기
    const counterValue = screen.getByText("5");
    const decrementButton = screen.getByRole("button", { name: "-" });

    // ✅ 초기값이 '5'인지 확인
    expect(counterValue).toHaveTextContent("5");

    // ✅ 감소 버튼을 클릭
    await user.click(decrementButton);

    // ✅ 값이 '4'로 변경되었는지 확인
    expect(counterValue).toHaveTextContent("4");
  });

  // ✅ 정답 5: 사용자 정의 스텝 테스트
  it("사용자 정의 스텝으로 증가/감소한다", async () => {
    // ✅ userEvent를 설정
    const user = userEvent.setup();

    // ✅ initialValue={0}, step={5}로 Counter를 렌더링
    render(<Counter initialValue={0} step={5} />);

    // ✅ getByText로 "0" 텍스트와 getByRole로 "+", "-" 버튼을 찾기
    const counterValue = screen.getByText("0");
    const incrementButton = screen.getByRole("button", { name: "+" });
    const decrementButton = screen.getByRole("button", { name: "-" });

    // ✅ 증가 버튼을 클릭하고 값이 '5'인지 확인
    await user.click(incrementButton);
    expect(counterValue).toHaveTextContent("5");

    // ✅ 다시 증가 버튼을 클릭하고 값이 '10'인지 확인
    await user.click(incrementButton);
    expect(counterValue).toHaveTextContent("10");

    // ✅ 감소 버튼을 클릭하고 값이 '5'인지 확인
    await user.click(decrementButton);
    expect(counterValue).toHaveTextContent("5");
  });

  // ✅ 정답 6: 리셋 버튼 테스트
  it("리셋 버튼이 카운터를 초기값으로 되돌린다", async () => {
    // ✅ userEvent 설정과 initialValue={3}으로 Counter 렌더링
    const user = userEvent.setup();
    render(<Counter initialValue={3} />);

    // ✅ getByText로 "3" 텍스트와 getByRole로 "+", "Reset" 버튼을 찾기
    const counterValue = screen.getByText("3");
    const incrementButton = screen.getByRole("button", { name: "+" });
    const resetButton = screen.getByRole("button", { name: /reset/i });

    // ✅ 증가 버튼을 3번 클릭
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);

    // ✅ 값이 '6'인지 확인
    expect(counterValue).toHaveTextContent("6");

    // ✅ 리셋 버튼을 클릭
    await user.click(resetButton);

    // ✅ 값이 초기값 '3'으로 되돌아갔는지 확인
    expect(counterValue).toHaveTextContent("3");
  });
});

/**
 * 💡 정답 해설:
 *
 * 🎮 상태 변화 테스트의 핵심:
 * 1. 초기 상태 확인 - 컴포넌트가 올바른 초기값으로 시작하는지
 * 2. 액션 수행 - 사용자 상호작용 시뮬레이션
 * 3. 상태 변화 확인 - UI가 새로운 상태를 정확히 반영하는지
 *
 * 🔍 요소 찾기 전략:
 * - 카운터 값: getByText("숫자") - 실제 표시되는 텍스트로 찾기
 * - 버튼: getByRole("button", { name: "텍스트" }) - 접근성과 사용자 경험 고려
 * - 실제 사용자가 어떻게 요소를 인식하는지와 동일한 방식
 *
 * ⚡ 테스트 패턴:
 * - Before: 초기 상태 확인
 * - Action: 사용자 상호작용
 * - After: 결과 상태 확인
 * - 이 패턴을 반복하여 복합적인 시나리오 테스트
 *
 * 🎯 Props 테스트:
 * - initialValue: 다양한 초기값으로 테스트
 * - step: 증가/감소 단위 변경 테스트
 * - 컴포넌트의 유연성과 안정성 확인
 *
 * 📊 상태 추적:
 * - 각 액션 후 즉시 상태 확인
 * - 누적 효과 테스트 (여러 번 클릭)
 * - 리셋 기능으로 원점 복귀 확인
 *
 * 🎯 접근성 고려사항:
 * - getByRole을 사용하여 스크린 리더 호환성 확인
 * - 버튼의 접근성 이름(name)을 활용한 정확한 요소 선택
 * - 실제 사용자 경험과 유사한 테스트 방식
 */
