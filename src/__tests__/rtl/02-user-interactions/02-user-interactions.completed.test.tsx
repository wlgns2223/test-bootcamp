/**
 * React Testing Library 기본 사용법 - 2단계: 사용자 상호작용 (정답)
 *
 * 학습 목표:
 * 1. 클릭 이벤트 시뮬레이션
 * 2. userEvent 사용법
 * 3. 이벤트 핸들러 테스트
 * 4. 폼 입력 상호작용
 * 5. 선택 요소 상호작용
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
import UserForm from "../../../components/UserForm";
import SelectionForm from "../../../components/SelectionForm";

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

describe("RTL 폼 입력 상호작용 (정답)", () => {
  // ✅ 정답 1: 텍스트 입력 필드 타이핑
  it("텍스트 입력 필드에 타이핑할 수 있다", async () => {
    // ✅ userEvent 인스턴스를 생성
    const user = userEvent.setup();

    // ✅ mock 함수를 생성
    const handleSubmit = jest.fn();

    // ✅ UserForm 컴포넌트를 onSubmit prop과 함께 렌더링
    render(<UserForm onSubmit={handleSubmit} />);

    // ✅ getByRole을 사용해서 name 입력 필드를 찾기
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    // ✅ getByRole을 사용해서 email 입력 필드를 찾기
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    // ✅ user.type()을 사용해서 name 필드에 "John Doe"를 입력
    await user.type(nameInput, "John Doe");
    // ✅ name 필드의 값이 "John Doe"인지 확인
    expect(nameInput).toHaveValue("John Doe");

    // ✅ user.type()을 사용해서 email 필드에 "john@example.com"을 입력
    await user.type(emailInput, "john@example.com");
    // ✅ email 필드의 값이 "john@example.com"인지 확인
    expect(emailInput).toHaveValue("john@example.com");
  });

  // ✅ 정답 2: 입력 필드 포커스/블러
  it("입력 필드의 포커스와 블러가 작동한다", async () => {
    // ✅ userEvent 인스턴스를 생성
    const user = userEvent.setup();

    // ✅ UserForm 컴포넌트를 렌더링
    render(<UserForm />);

    // ✅ name과 email 입력 필드를 찾기
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    // ✅ name 입력 필드를 클릭
    await user.click(nameInput);
    // ✅ name 입력 필드에 포커스가 있는지 확인
    expect(nameInput).toHaveFocus();

    // ✅ email 입력 필드를 클릭
    await user.click(emailInput);
    // ✅ email 입력 필드에 포커스가 있는지 확인
    expect(emailInput).toHaveFocus();
    // ✅ name 입력 필드에 포커스가 없는지 확인
    expect(nameInput).not.toHaveFocus();
  });

  // ✅ 정답 3: 입력값 변경 감지
  it("입력값 변경을 감지할 수 있다", async () => {
    // ✅ userEvent 인스턴스를 생성
    const user = userEvent.setup();

    // ✅ UserForm 컴포넌트를 렌더링
    render(<UserForm />);

    // ✅ name 입력 필드를 찾기
    const nameInput = screen.getByRole("textbox", { name: /name/i });

    // ✅ user.type()을 사용해서 "A"를 입력
    await user.type(nameInput, "A");
    // ✅ 입력 필드 값이 "A"인지 확인
    expect(nameInput).toHaveValue("A");

    // ✅ user.type()을 사용해서 "B"를 추가로 입력
    await user.type(nameInput, "B");
    // ✅ 입력 필드 값이 "AB"인지 확인
    expect(nameInput).toHaveValue("AB");

    // ✅ user.clear()를 사용해서 입력 필드를 지우기
    await user.clear(nameInput);
    // ✅ 입력 필드 값이 빈 문자열인지 확인
    expect(nameInput).toHaveValue("");
  });

  // ✅ 정답 4: 폼 제출 상호작용
  it("폼을 제출할 수 있다", async () => {
    // ✅ userEvent 인스턴스와 mock 함수를 생성
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    // ✅ UserForm 컴포넌트를 onSubmit prop과 함께 렌더링
    render(<UserForm onSubmit={handleSubmit} />);

    // ✅ name, email 입력 필드와 submit 버튼을 찾기
    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    // ✅ 초기에 submit 버튼이 비활성화되어 있는지 확인
    expect(submitButton).toBeDisabled();

    // ✅ name과 email 필드에 값을 입력
    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");

    // ✅ 이제 submit 버튼이 활성화되어 있는지 확인
    expect(submitButton).toBeEnabled();

    // ✅ submit 버튼을 클릭
    await user.click(submitButton);

    // ✅ mock 함수가 올바른 데이터와 함께 호출되었는지 확인
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
    });
  });
});

describe("RTL 선택 요소 상호작용 (정답)", () => {
  // ✅ 정답 1: 체크박스 선택/해제
  it("체크박스를 선택하고 해제할 수 있다", async () => {
    // ✅ userEvent 인스턴스와 mock 함수를 생성
    const user = userEvent.setup();
    const handleSelectionChange = jest.fn();

    // ✅ SelectionForm 컴포넌트를 onSelectionChange prop과 함께 렌더링
    render(<SelectionForm onSelectionChange={handleSelectionChange} />);

    // ✅ getByRole을 사용해서 Reading과 Gaming 체크박스를 찾기
    const readingCheckbox = screen.getByRole("checkbox", { name: /reading/i });
    const gamingCheckbox = screen.getByRole("checkbox", { name: /gaming/i });

    // ✅ Reading 체크박스를 클릭
    await user.click(readingCheckbox);
    // ✅ Reading 체크박스가 선택되었는지 확인
    expect(readingCheckbox).toBeChecked();

    // ✅ Gaming 체크박스를 클릭
    await user.click(gamingCheckbox);
    // ✅ Gaming 체크박스가 선택되었는지 확인
    expect(gamingCheckbox).toBeChecked();

    // ✅ Reading 체크박스를 다시 클릭해서 해제
    await user.click(readingCheckbox);
    // ✅ Reading 체크박스가 해제되었는지 확인
    expect(readingCheckbox).not.toBeChecked();
    // ✅ Gaming 체크박스는 여전히 선택되어 있는지 확인
    expect(gamingCheckbox).toBeChecked();
  });

  // ✅ 정답 2: 라디오 버튼 선택
  it("라디오 버튼 그룹에서 하나만 선택할 수 있다", async () => {
    // ✅ userEvent 인스턴스와 mock 함수를 생성
    const user = userEvent.setup();
    const handleSelectionChange = jest.fn();

    // ✅ SelectionForm 컴포넌트를 렌더링
    render(<SelectionForm onSelectionChange={handleSelectionChange} />);

    // ✅ getByRole을 사용해서 Male, Female, Other 라디오 버튼을 찾기
    const maleRadio = screen.getByRole("radio", { name: /^male$/i });
    const femaleRadio = screen.getByRole("radio", { name: /^female$/i });
    const otherRadio = screen.getByRole("radio", { name: /^other$/i });

    // ✅ Male 라디오 버튼을 클릭
    await user.click(maleRadio);
    // ✅ Male 라디오 버튼이 선택되었는지 확인
    expect(maleRadio).toBeChecked();
    // ✅ Female과 Other 라디오 버튼이 선택되지 않았는지 확인
    expect(femaleRadio).not.toBeChecked();
    expect(otherRadio).not.toBeChecked();

    // ✅ Female 라디오 버튼을 클릭
    await user.click(femaleRadio);
    // ✅ Female 라디오 버튼이 선택되었는지 확인
    expect(femaleRadio).toBeChecked();
    // ✅ Male과 Other 라디오 버튼이 선택되지 않았는지 확인
    expect(maleRadio).not.toBeChecked();
    expect(otherRadio).not.toBeChecked();
  });

  // ✅ 정답 3: 선택 상태 변경 감지
  it("선택 상태 변경을 감지할 수 있다", async () => {
    // ✅ userEvent 인스턴스와 mock 함수를 생성
    const user = userEvent.setup();
    const handleSelectionChange = jest.fn();

    // ✅ SelectionForm 컴포넌트를 렌더링
    render(<SelectionForm onSelectionChange={handleSelectionChange} />);

    // ✅ Reading 체크박스, Male 라디오 버튼, 알림 토글을 찾기
    const readingCheckbox = screen.getByRole("checkbox", { name: /reading/i });
    const maleRadio = screen.getByRole("radio", { name: /^male$/i });
    const notificationsToggle = screen.getByRole("checkbox", { name: /enable notifications/i });

    // ✅ Reading 체크박스를 클릭
    await user.click(readingCheckbox);
    // ✅ mock 함수가 올바른 데이터와 함께 호출되었는지 확인
    expect(handleSelectionChange).toHaveBeenLastCalledWith({
      hobbies: ["Reading"],
      gender: "",
      notifications: false,
    });

    // ✅ Male 라디오 버튼을 클릭
    await user.click(maleRadio);
    // ✅ mock 함수가 업데이트된 데이터와 함께 호출되었는지 확인
    expect(handleSelectionChange).toHaveBeenLastCalledWith({
      hobbies: ["Reading"],
      gender: "Male",
      notifications: false,
    });

    // ✅ 알림 토글을 클릭
    await user.click(notificationsToggle);
    // ✅ mock 함수가 최종 데이터와 함께 호출되었는지 확인
    expect(handleSelectionChange).toHaveBeenLastCalledWith({
      hobbies: ["Reading"],
      gender: "Male",
      notifications: true,
    });
  });

  // ✅ 정답 4: 복합 선택 시나리오
  it("여러 선택 요소를 조합해서 사용할 수 있다", async () => {
    // ✅ userEvent 인스턴스를 생성
    const user = userEvent.setup();

    // ✅ SelectionForm 컴포넌트를 렌더링
    render(<SelectionForm />);

    // ✅ Reading과 Sports 체크박스를 클릭
    await user.click(screen.getByRole("checkbox", { name: /reading/i }));
    await user.click(screen.getByRole("checkbox", { name: /sports/i }));

    // ✅ Female 라디오 버튼을 클릭
    await user.click(screen.getByRole("radio", { name: /^female$/i }));

    // ✅ 알림 토글을 클릭
    await user.click(screen.getByRole("checkbox", { name: /enable notifications/i }));

    // ✅ getByText를 사용해서 선택된 항목들이 올바르게 표시되는지 확인
    // ✅ "Selected: Reading, Sports" 텍스트가 있는지 확인
    expect(screen.getByText(/selected: reading, sports/i)).toBeInTheDocument();
    // ✅ "Selected: Female" 텍스트가 있는지 확인
    expect(screen.getByText(/selected: female/i)).toBeInTheDocument();
    // ✅ "Notifications: Enabled" 텍스트가 있는지 확인
    expect(screen.getByText(/notifications: enabled/i)).toBeInTheDocument();
  });

  // ✅ 정답 5: 키보드로 선택 요소 조작
  it("키보드로 선택 요소를 조작할 수 있다", async () => {
    // ✅ userEvent 인스턴스를 생성
    const user = userEvent.setup();

    // ✅ SelectionForm 컴포넌트를 렌더링
    render(<SelectionForm />);

    // ✅ Reading 체크박스와 Male 라디오 버튼을 찾기
    const readingCheckbox = screen.getByRole("checkbox", { name: /reading/i });
    const maleRadio = screen.getByRole("radio", { name: /^male$/i });

    // ✅ Reading 체크박스에 포커스를 설정
    readingCheckbox.focus();
    // ✅ user.keyboard(' ')를 사용해서 Space 키로 토글
    await user.keyboard(" ");
    // ✅ Reading 체크박스가 선택되었는지 확인
    expect(readingCheckbox).toBeChecked();

    // ✅ Male 라디오 버튼에 포커스를 설정
    maleRadio.focus();
    // ✅ user.keyboard(' ')를 사용해서 Space 키로 선택
    await user.keyboard(" ");
    // ✅ Male 라디오 버튼이 선택되었는지 확인
    expect(maleRadio).toBeChecked();
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
 * - toHaveBeenCalledWith(data) - 특정 데이터와 함께 호출되었는지 확인
 * - toHaveBeenLastCalledWith(data) - 마지막 호출 시 데이터 확인
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
 * ⚡ 사용자 상호작용 패턴:
 * 1. 컴포넌트 렌더링 (with props)
 * 2. 요소 찾기 (getByRole 등)
 * 3. 사용자 액션 실행 (click, type, keyboard 등)
 * 4. 결과 확인 (assertion)
 *
 * 🔍 접근성 고려사항:
 * - 버튼은 마우스 클릭뿐만 아니라 키보드로도 활성화 가능
 * - Enter, Space 키 모두 버튼 활성화에 사용됨
 * - 비활성화된 요소는 상호작용이 불가능
 * - 체크박스와 라디오 버튼도 키보드로 조작 가능
 *
 * 🎯 실무 팁:
 * - 실제 사용자가 하는 행동을 테스트
 * - 키보드 접근성도 함께 테스트
 * - 예외 상황(비활성화 등)도 테스트
 * - mock 함수로 이벤트 핸들러 동작 검증
 * - byRole을 사용해서 접근성과 사용자 경험을 고려한 테스트
 * - 라디오 버튼의 name 속성은 정확한 매칭을 위해 /^text$/i 패턴 사용
 */
