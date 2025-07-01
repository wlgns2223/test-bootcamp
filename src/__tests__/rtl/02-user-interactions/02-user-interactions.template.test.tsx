/**
 * React Testing Library 기본 사용법 - 2단계: 사용자 상호작용 (실습)
 *
 * 학습 목표:
 * 1. 클릭 이벤트 시뮬레이션
 * 2. userEvent 사용법
 * 3. 이벤트 핸들러 테스트
 * 4. 폼 입력 상호작용
 * 5. 선택 요소 상호작용
 *
 * 🎯 실습 과제:
 * - 사용자 상호작용을 시뮬레이션하는 테스트를 완성해보세요
 * - userEvent를 사용한 클릭, 키보드 입력을 테스트하세요
 * - 폼 입력과 선택 요소 상호작용을 테스트하세요
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "../../../components/Button";
import UserForm from "../../../components/UserForm";
import SelectionForm from "../../../components/SelectionForm";

describe("RTL 사용자 상호작용 - 클릭 이벤트 (실습)", () => {
  // 🎯 실습 1: 기본 클릭 이벤트
  it("버튼을 클릭하면 클릭 이벤트 핸들러가 호출된다", async () => {
    // TODO: userEvent 인스턴스를 생성하세요 (userEvent.setup() 사용)
    // TODO: jest.fn()을 사용해서 mock 함수를 생성하세요
    // TODO: Button 컴포넌트를 onClick prop과 함께 렌더링하세요
    // TODO: getByRole을 사용해서 버튼을 찾으세요
    // TODO: user.click()을 사용해서 버튼을 클릭하세요 (await 필요)
    // TODO: mock 함수가 1번 호출되었는지 확인하세요 (toHaveBeenCalledTimes 사용)

    const user = userEvent.setup();
    const handleClickMock = jest.fn();

    render(<Button onClick={handleClickMock}>click</Button>);

    const button = screen.getByRole("button");

    await user.click(button);

    expect(button).toBeInTheDocument();
    expect(handleClickMock).toHaveBeenCalled();
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

describe("RTL 폼 입력 상호작용 (실습)", () => {
  const renderAndFindInputs = (handleSubmitMock?: ReturnType<typeof jest.fn>) => {
    render(<UserForm onSubmit={handleSubmitMock} />);
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    return {
      nameInput,
      emailInput,
    };
  };

  // 🎯 실습 1: 텍스트 입력 필드 타이핑
  it("텍스트 입력 필드에 타이핑할 수 있다", async () => {
    // TODO: userEvent 인스턴스를 생성하세요
    // TODO: mock 함수를 생성하세요
    // TODO: UserForm 컴포넌트를 onSubmit prop과 함께 렌더링하세요
    // TODO: getByRole을 사용해서 name 입력 필드를 찾으세요 (textbox role, name 속성 사용)
    // TODO: getByRole을 사용해서 email 입력 필드를 찾으세요
    // TODO: user.type()을 사용해서 name 필드에 "John Doe"를 입력하세요
    // TODO: name 필드의 값이 "John Doe"인지 확인하세요 (toHaveValue 사용)
    // TODO: user.type()을 사용해서 email 필드에 "john@example.com"을 입력하세요
    // TODO: email 필드의 값이 "john@example.com"인지 확인하세요

    const user = userEvent.setup();
    render(<UserForm />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    await user.type(nameInput, "hello");
    await user.type(emailInput, "hello@gmail.com");

    expect(nameInput).toHaveValue("hello");
    expect(emailInput).toHaveValue("hello@gmail.com");
  });

  // 🎯 실습 2: 입력 필드 포커스/블러
  it("입력 필드의 포커스와 블러가 작동한다", async () => {
    // TODO: userEvent 인스턴스를 생성하세요
    // TODO: UserForm 컴포넌트를 렌더링하세요
    // TODO: name과 email 입력 필드를 찾으세요
    // TODO: name 입력 필드를 클릭하세요
    // TODO: name 입력 필드에 포커스가 있는지 확인하세요 (toHaveFocus 사용)
    // TODO: email 입력 필드를 클릭하세요
    // TODO: email 입력 필드에 포커스가 있는지 확인하세요
    // TODO: name 입력 필드에 포커스가 없는지 확인하세요 (not.toHaveFocus 사용)

    const user = userEvent.setup();
    const { emailInput, nameInput } = renderAndFindInputs();

    await user.click(nameInput);
    expect(nameInput).toHaveFocus();

    await user.click(emailInput);
    expect(emailInput).toHaveFocus();
    expect(nameInput).not.toHaveFocus();
  });

  // 🎯 실습 3: 입력값 변경 감지
  it("입력값 변경을 감지할 수 있다", async () => {
    // TODO: userEvent 인스턴스를 생성하세요
    // TODO: UserForm 컴포넌트를 렌더링하세요
    // TODO: name 입력 필드를 찾으세요
    // TODO: user.type()을 사용해서 "A"를 입력하세요
    // TODO: 입력 필드 값이 "A"인지 확인하세요
    // TODO: user.type()을 사용해서 "B"를 추가로 입력하세요
    // TODO: 입력 필드 값이 "AB"인지 확인하세요
    // TODO: user.clear()를 사용해서 입력 필드를 지우세요
    // TODO: 입력 필드 값이 빈 문자열인지 확인하세요

    const user = userEvent.setup();
    const { nameInput } = renderAndFindInputs();

    await user.type(nameInput, "A");
    expect(nameInput).toHaveValue("A");

    await user.type(nameInput, "B");
    expect(nameInput).toHaveValue("AB");
  });

  // 🎯 실습 4: 폼 제출 상호작용
  it("폼을 제출할 수 있다", async () => {
    // TODO: userEvent 인스턴스와 mock 함수를 생성하세요
    // TODO: UserForm 컴포넌트를 onSubmit prop과 함께 렌더링하세요
    // TODO: name, email 입력 필드와 submit 버튼을 찾으세요
    // TODO: 초기에 submit 버튼이 비활성화되어 있는지 확인하세요 (toBeDisabled 사용)
    // TODO: name과 email 필드에 값을 입력하세요
    // TODO: 이제 submit 버튼이 활성화되어 있는지 확인하세요 (toBeEnabled 사용)
    // TODO: submit 버튼을 클릭하세요
    // TODO: mock 함수가 올바른 데이터와 함께 호출되었는지 확인하세요 (toHaveBeenCalledWith 사용)

    const user = userEvent.setup();
    const handleSubmitMock = jest.fn();
    const { emailInput, nameInput } = renderAndFindInputs(handleSubmitMock);
    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeDisabled();

    await user.type(nameInput, "foo");
    await user.type(emailInput, "test@example.com");
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);
    expect(handleSubmitMock).toHaveBeenCalled();
  });
});

describe("RTL 선택 요소 상호작용 (실습)", () => {
  // 🎯 실습 1: 체크박스 선택/해제
  it("체크박스를 선택하고 해제할 수 있다", async () => {
    // TODO: userEvent 인스턴스와 mock 함수를 생성하세요
    // TODO: SelectionForm 컴포넌트를 onSelectionChange prop과 함께 렌더링하세요
    // TODO: getByRole을 사용해서 Reading과 Gaming 체크박스를 찾으세요 (checkbox role 사용)
    // TODO: Reading 체크박스를 클릭하세요
    // TODO: Reading 체크박스가 선택되었는지 확인하세요 (toBeChecked 사용)
    // TODO: Gaming 체크박스를 클릭하세요
    // TODO: Gaming 체크박스가 선택되었는지 확인하세요
    // TODO: Reading 체크박스를 다시 클릭해서 해제하세요
    // TODO: Reading 체크박스가 해제되었는지 확인하세요 (not.toBeChecked 사용)
    // TODO: Gaming 체크박스는 여전히 선택되어 있는지 확인하세요
  });

  // 🎯 실습 2: 라디오 버튼 선택
  it("라디오 버튼 그룹에서 하나만 선택할 수 있다", async () => {
    // TODO: userEvent 인스턴스와 mock 함수를 생성하세요
    // TODO: SelectionForm 컴포넌트를 렌더링하세요
    // TODO: getByRole을 사용해서 Male, Female, Other 라디오 버튼을 찾으세요 (radio role 사용)
    // TODO: Male 라디오 버튼을 클릭하세요
    // TODO: Male 라디오 버튼이 선택되었는지 확인하세요
    // TODO: Female과 Other 라디오 버튼이 선택되지 않았는지 확인하세요
    // TODO: Female 라디오 버튼을 클릭하세요
    // TODO: Female 라디오 버튼이 선택되었는지 확인하세요
    // TODO: Male과 Other 라디오 버튼이 선택되지 않았는지 확인하세요
  });

  // 🎯 실습 3: 선택 상태 변경 감지
  it("선택 상태 변경을 감지할 수 있다", async () => {
    // TODO: userEvent 인스턴스와 mock 함수를 생성하세요
    // TODO: SelectionForm 컴포넌트를 렌더링하세요
    // TODO: Reading 체크박스, Male 라디오 버튼, 알림 토글을 찾으세요
    // TODO: Reading 체크박스를 클릭하세요
    // TODO: mock 함수가 올바른 데이터와 함께 호출되었는지 확인하세요 (toHaveBeenLastCalledWith 사용)
    // TODO: Male 라디오 버튼을 클릭하세요
    // TODO: mock 함수가 업데이트된 데이터와 함께 호출되었는지 확인하세요
    // TODO: 알림 토글을 클릭하세요
    // TODO: mock 함수가 최종 데이터와 함께 호출되었는지 확인하세요
  });

  // 🎯 실습 4: 복합 선택 시나리오
  it("여러 선택 요소를 조합해서 사용할 수 있다", async () => {
    // TODO: userEvent 인스턴스를 생성하세요
    // TODO: SelectionForm 컴포넌트를 렌더링하세요
    // TODO: Reading과 Sports 체크박스를 클릭하세요
    // TODO: Female 라디오 버튼을 클릭하세요
    // TODO: 알림 토글을 클릭하세요
    // TODO: getByText를 사용해서 선택된 항목들이 올바르게 표시되는지 확인하세요
    // TODO: "Selected: Reading, Sports" 텍스트가 있는지 확인하세요
    // TODO: "Selected: Female" 텍스트가 있는지 확인하세요
    // TODO: "Notifications: Enabled" 텍스트가 있는지 확인하세요
  });

  // 🎯 실습 5: 키보드로 선택 요소 조작
  it("키보드로 선택 요소를 조작할 수 있다", async () => {
    // TODO: userEvent 인스턴스를 생성하세요
    // TODO: SelectionForm 컴포넌트를 렌더링하세요
    // TODO: Reading 체크박스와 Male 라디오 버튼을 찾으세요
    // TODO: Reading 체크박스에 포커스를 설정하세요 (focus() 사용)
    // TODO: user.keyboard(' ')를 사용해서 Space 키로 토글하세요
    // TODO: Reading 체크박스가 선택되었는지 확인하세요
    // TODO: Male 라디오 버튼에 포커스를 설정하세요
    // TODO: user.keyboard(' ')를 사용해서 Space 키로 선택하세요
    // TODO: Male 라디오 버튼이 선택되었는지 확인하세요
  });
});

/**
 * 💡 실습에서 사용할 주요 API들:
 *
 * 🖱️ 사용자 상호작용:
 * - const user = userEvent.setup() - userEvent 인스턴스 생성
 * - await user.click(element) - 요소 클릭 (비동기)
 * - await user.type(element, text) - 텍스트 입력 (비동기)
 * - await user.clear(element) - 입력 필드 지우기 (비동기)
 * - await user.keyboard('{Enter}') - Enter 키 입력
 * - await user.keyboard(' ') - Space 키 입력
 * - element.focus() - 요소에 포커스 설정
 *
 * 🧪 Mock 함수:
 * - const mockFn = jest.fn() - mock 함수 생성
 * - expect(mockFn).toHaveBeenCalledTimes(n) - 호출 횟수 확인
 * - expect(mockFn).toHaveBeenCalled() - 호출 여부 확인
 * - expect(mockFn).not.toHaveBeenCalled() - 호출되지 않았는지 확인
 * - expect(mockFn).toHaveBeenCalledWith(data) - 특정 데이터와 함께 호출되었는지 확인
 * - expect(mockFn).toHaveBeenLastCalledWith(data) - 마지막 호출 시 데이터 확인
 *
 * 🔍 요소 찾기 (byRole):
 * - screen.getByRole("textbox", { name: /name/i }) - 텍스트 입력 필드
 * - screen.getByRole("button", { name: /submit/i }) - 버튼
 * - screen.getByRole("checkbox", { name: /reading/i }) - 체크박스
 * - screen.getByRole("radio", { name: /^male$/i }) - 라디오 버튼 (정확한 매칭)
 * - screen.getByText(/selected: reading, sports/i) - 텍스트 내용
 *
 * ✅ 검증:
 * - expect(element).toHaveValue("text") - 입력 필드 값 확인
 * - expect(element).toHaveFocus() - 포커스 상태 확인
 * - expect(element).toBeChecked() - 체크박스/라디오 선택 상태 확인
 * - expect(element).toBeEnabled() / expect(element).toBeDisabled() - 활성화 상태 확인
 * - expect(element).toHaveTextContent("text") - 텍스트 내용 확인
 * - expect(element).toBeInTheDocument() - 요소 존재 확인
 *
 * 📝 컴포넌트 props:
 * Button:
 * - onClick: () => void - 클릭 핸들러
 * - disabled: boolean - 비활성화 상태
 * - variant: 'primary' | 'secondary' - 버튼 스타일
 *
 * UserForm:
 * - onSubmit: (data: {name: string, email: string}) => void - 제출 핸들러
 *
 * SelectionForm:
 * - onSelectionChange: (data: {hobbies: string[], gender: string, notifications: boolean}) => void - 선택 변경 핸들러
 *
 * ⚠️ 주의사항:
 * - userEvent의 모든 메서드는 비동기이므로 await를 사용해야 함
 * - userEvent.setup()은 각 테스트마다 새로 생성하는 것이 권장됨
 * - 라디오 버튼의 name 속성은 정확한 매칭을 위해 /^text$/i 패턴 사용
 * - getByRole을 사용하면 실제 사용자 경험과 유사한 테스트가 됨
 */
