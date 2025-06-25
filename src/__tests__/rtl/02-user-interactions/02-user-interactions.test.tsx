/**
 * React Testing Library 기본 사용법 - 2단계: 사용자 상호작용
 *
 * 학습 목표:
 * 1. 클릭 이벤트 시뮬레이션
 * 2. userEvent vs fireEvent
 * 3. 이벤트 핸들러 테스트
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "../../../components/Button";

describe("RTL 사용자 상호작용 - 클릭 이벤트", () => {
  // 1. 기본 클릭 이벤트
  it("버튼 클릭이 작동한다", async () => {
    // userEvent 인스턴스 생성 (권장 방법)
    const user = userEvent.setup();

    // 클릭 핸들러 mock 함수
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");

    // 사용자 클릭 시뮬레이션
    await user.click(button);

    // 클릭 핸들러가 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 2. 여러 번 클릭
  it("버튼을 여러 번 클릭할 수 있다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Multi Click</Button>);

    const button = screen.getByRole("button");

    // 3번 클릭
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  // 3. 비활성화된 버튼 클릭
  it("비활성화된 버튼은 클릭되지 않는다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByRole("button");

    // 비활성화된 버튼 클릭 시도
    await user.click(button);

    // 클릭 핸들러가 호출되지 않음
    expect(handleClick).not.toHaveBeenCalled();
  });

  // 4. 다양한 버튼 variant 테스트
  it("다른 variant 버튼도 정상 작동한다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button onClick={handleClick} variant="secondary">
        Secondary
      </Button>
    );

    const button = screen.getByRole("button");

    // secondary 버튼도 클릭 가능
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveClass("bg-gray-200");
  });

  // 5. 키보드 상호작용 (Enter, Space)
  it("키보드로 버튼을 활성화할 수 있다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Keyboard Test</Button>);

    const button = screen.getByRole("button");

    // 버튼에 포커스
    button.focus();

    // Enter 키로 버튼 활성화
    await user.keyboard("{Enter}");
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Space 키로 버튼 활성화
    await user.keyboard(" ");
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});

/**
 * 💡 학습 포인트:
 *
 * 1. userEvent.setup() - 사용자 상호작용을 시뮬레이션하는 객체 생성
 * 2. await user.click() - 클릭 이벤트 시뮬레이션 (비동기)
 * 3. jest.fn() - Mock 함수 생성
 * 4. expect().toHaveBeenCalledTimes() - 함수 호출 횟수 확인
 * 5. expect().not.toHaveBeenCalled() - 함수가 호출되지 않았음을 확인
 * 6. element.focus() - 요소에 포커스 설정
 * 7. await user.keyboard() - 키보드 입력 시뮬레이션
 * 8. 비활성화된 요소는 클릭되지 않음을 테스트
 * 9. 키보드 접근성 테스트 (Enter, Space)
 */
