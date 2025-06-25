/**
 * React Testing Library 기본 사용법 - 2단계: 사용자 상호작용 (실습)
 *
 * 학습 목표:
 * 1. 클릭 이벤트 시뮬레이션
 * 2. userEvent 사용법
 * 3. 이벤트 핸들러 테스트
 *
 * 🎯 실습 과제:
 * - 사용자 상호작용을 시뮬레이션하는 테스트를 완성해보세요
 * - userEvent를 사용한 클릭, 키보드 입력을 테스트하세요
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "../../../components/Button";

describe("RTL 사용자 상호작용 - 클릭 이벤트 (실습)", () => {
  // 🎯 실습 1: 기본 클릭 이벤트
  it("버튼 클릭이 작동한다", async () => {
    // TODO: userEvent 인스턴스를 생성하세요 (userEvent.setup() 사용)
    // TODO: jest.fn()을 사용해서 mock 함수를 생성하세요
    // TODO: Button 컴포넌트를 onClick prop과 함께 렌더링하세요
    // TODO: getByRole을 사용해서 버튼을 찾으세요
    // TODO: user.click()을 사용해서 버튼을 클릭하세요 (await 필요)
    // TODO: mock 함수가 1번 호출되었는지 확인하세요 (toHaveBeenCalledTimes 사용)
  });

  // 🎯 실습 2: 여러 번 클릭
  it("버튼을 여러 번 클릭할 수 있다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Multi Click</Button>);
    const button = screen.getByRole("button");

    // TODO: 버튼을 3번 클릭하세요

    // TODO: mock 함수가 3번 호출되었는지 확인하세요
  });

  // 🎯 실습 3: 비활성화된 버튼 클릭
  it("비활성화된 버튼은 클릭되지 않는다", async () => {
    // TODO: userEvent 인스턴스를 생성하세요
    // TODO: mock 함수를 생성하세요
    // TODO: 비활성화된 Button 컴포넌트를 렌더링하세요 (disabled prop 사용)
    // TODO: 버튼을 찾으세요
    // TODO: 비활성화된 버튼을 클릭해보세요
    // TODO: mock 함수가 호출되지 않았는지 확인하세요 (not.toHaveBeenCalled 사용)
  });

  // 🎯 실습 4: 다른 variant 버튼 테스트
  it("secondary variant 버튼도 정상 작동한다", async () => {
    // TODO: userEvent와 mock 함수를 설정하세요
    // TODO: variant="secondary"인 Button을 렌더링하세요
    // TODO: 버튼을 찾고 클릭하세요
    // TODO: mock 함수가 호출되었는지 확인하세요
    // TODO: 버튼이 올바른 CSS 클래스를 가지고 있는지 확인하세요 ("bg-gray-200" 클래스)
  });

  // 🎯 실습 5: 키보드 상호작용 (Enter, Space)
  it("키보드로 버튼을 활성화할 수 있다", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Keyboard Test</Button>);
    const button = screen.getByRole("button");

    // TODO: 버튼에 포커스를 설정하세요 (button.focus() 사용)

    // TODO: Enter 키로 버튼을 활성화하세요 (user.keyboard('{Enter}') 사용)

    // TODO: mock 함수가 1번 호출되었는지 확인하세요

    // TODO: Space 키로 버튼을 활성화하세요 (user.keyboard(' ') 사용)

    // TODO: mock 함수가 총 2번 호출되었는지 확인하세요
  });
});

/**
 * 💡 실습에서 사용할 주요 API들:
 *
 * 🖱️ 사용자 상호작용:
 * - const user = userEvent.setup() - userEvent 인스턴스 생성
 * - await user.click(element) - 요소 클릭 (비동기)
 * - await user.keyboard('{Enter}') - Enter 키 입력
 * - await user.keyboard(' ') - Space 키 입력
 * - element.focus() - 요소에 포커스 설정
 *
 * 🧪 Mock 함수:
 * - const mockFn = jest.fn() - mock 함수 생성
 * - expect(mockFn).toHaveBeenCalledTimes(n) - 호출 횟수 확인
 * - expect(mockFn).toHaveBeenCalled() - 호출 여부 확인
 * - expect(mockFn).not.toHaveBeenCalled() - 호출되지 않았는지 확인
 *
 * 📝 Button 컴포넌트 props:
 * - onClick: () => void - 클릭 핸들러
 * - disabled: boolean - 비활성화 상태
 * - variant: 'primary' | 'secondary' - 버튼 스타일
 *
 * ⚠️ 주의사항:
 * - userEvent의 모든 메서드는 비동기이므로 await를 사용해야 함
 * - userEvent.setup()은 각 테스트마다 새로 생성하는 것이 권장됨
 */
