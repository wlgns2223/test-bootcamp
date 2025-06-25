/**
 * React Testing Library 기본 사용법 - 2단계: 사용자 상호작용 (정답)
 *
 * 학습 목표:
 * 1. 클릭 이벤트 시뮬레이션
 * 2. userEvent 사용법
 * 3. 이벤트 핸들러 테스트
 *
 * ✅ 실습 과제 정답:
 * - 사용자 상호작용 테스트의 완성된 버전입니다
 * - userEvent를 활용한 올바른 구현을 확인하세요
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "../../../components/Button";

describe("RTL 사용자 상호작용 - 클릭 이벤트 (정답)", () => {
  // ✅ 정답 1: 기본 클릭 이벤트
  it("버튼 클릭이 작동한다", async () => {
    // ✅ userEvent 인스턴스를 생성
    const user = userEvent.setup();

    // ✅ jest.fn()을 사용해서 mock 함수를 생성
    const handleClick = jest.fn();

    // ✅ Button 컴포넌트를 onClick prop과 함께 렌더링
    render(<Button onClick={handleClick}>Click me</Button>);

    // ✅ getByRole을 사용해서 버튼을 찾기
    const button = screen.getByRole("button");

    // ✅ user.click()을 사용해서 버튼을 클릭
    await user.click(button);

    // ✅ mock 함수가 1번 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ✅ 정답 2: 여러 번 클릭
  it("버튼을 여러 번 클릭할 수 있다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Multi Click</Button>);
    const button = screen.getByRole("button");

    // ✅ 버튼을 3번 클릭
    await user.click(button);
    await user.click(button);
    await user.click(button);

    // ✅ mock 함수가 3번 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  // ✅ 정답 3: 비활성화된 버튼 클릭
  it("비활성화된 버튼은 클릭되지 않는다", async () => {
    // ✅ userEvent 인스턴스를 생성
    const user = userEvent.setup();

    // ✅ mock 함수를 생성
    const handleClick = jest.fn();

    // ✅ 비활성화된 Button 컴포넌트를 렌더링
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    // ✅ 버튼을 찾기
    const button = screen.getByRole("button");

    // ✅ 비활성화된 버튼을 클릭 시도
    await user.click(button);

    // ✅ mock 함수가 호출되지 않았는지 확인
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ✅ 정답 4: 다른 variant 버튼 테스트
  it("secondary variant 버튼도 정상 작동한다", async () => {
    // ✅ userEvent와 mock 함수를 설정
    const user = userEvent.setup();
    const handleClick = jest.fn();

    // ✅ variant="secondary"인 Button을 렌더링
    render(
      <Button onClick={handleClick} variant="secondary">
        Secondary
      </Button>
    );

    // ✅ 버튼을 찾고 클릭
    const button = screen.getByRole("button");
    await user.click(button);

    // ✅ mock 함수가 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(1);

    // ✅ 버튼이 올바른 CSS 클래스를 가지고 있는지 확인
    expect(button).toHaveClass("bg-gray-200");
  });

  // ✅ 정답 5: 키보드 상호작용 (Enter, Space)
  it("키보드로 버튼을 활성화할 수 있다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Keyboard Test</Button>);
    const button = screen.getByRole("button");

    // ✅ 버튼에 포커스를 설정
    button.focus();

    // ✅ Enter 키로 버튼을 활성화
    await user.keyboard("{Enter}");
    // ✅ mock 함수가 1번 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(1);

    // ✅ Space 키로 버튼을 활성화
    await user.keyboard(" ");
    // ✅ mock 함수가 총 2번 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});

/**
 * 💡 정답 해설:
 *
 * 🖱️ userEvent의 핵심 개념:
 * 1. userEvent.setup() - 각 테스트마다 새로운 인스턴스 생성
 * 2. 모든 userEvent 메서드는 비동기 (await 필수)
 * 3. 실제 사용자 행동을 최대한 모방
 *
 * 🧪 Mock 함수 활용:
 * - jest.fn() - 함수 호출을 추적할 수 있는 mock 함수 생성
 * - toHaveBeenCalledTimes(n) - 정확한 호출 횟수 확인
 * - not.toHaveBeenCalled() - 호출되지 않았음을 확인
 *
 * ⚡ 사용자 상호작용 패턴:
 * 1. 컴포넌트 렌더링 (with props)
 * 2. 요소 찾기 (getByRole 등)
 * 3. 사용자 액션 실행 (click, keyboard 등)
 * 4. 결과 확인 (assertion)
 *
 * 🔍 접근성 고려사항:
 * - 버튼은 마우스 클릭뿐만 아니라 키보드로도 활성화 가능
 * - Enter, Space 키 모두 버튼 활성화에 사용됨
 * - 비활성화된 요소는 상호작용이 불가능
 *
 * 🎯 실무 팁:
 * - 실제 사용자가 하는 행동을 테스트
 * - 키보드 접근성도 함께 테스트
 * - 예외 상황(비활성화 등)도 테스트
 * - mock 함수로 이벤트 핸들러 동작 검증
 */
