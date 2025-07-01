/**
 * React Testing Library 기본 사용법 - 2단계: 사용자 상호작용
 *
 * 학습 목표:
 * 1. 클릭 이벤트 시뮬레이션
 * 2. userEvent vs fireEvent
 * 3. 이벤트 핸들러 테스트
 * 4. 폼 입력 상호작용
 * 5. 선택 요소 상호작용
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Button from "../../../components/Button";
import UserForm from "../../../components/UserForm";
import SelectionForm from "../../../components/SelectionForm";

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

describe("RTL 폼 입력 상호작용", () => {
  // 1. 텍스트 입력 필드 타이핑
  it("텍스트 입력 필드에 타이핑할 수 있다", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<UserForm onSubmit={handleSubmit} />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    // 이름 입력
    await user.type(nameInput, "John Doe");
    expect(nameInput).toHaveValue("John Doe");

    // 이메일 입력
    await user.type(emailInput, "john@example.com");
    expect(emailInput).toHaveValue("john@example.com");
  });

  // 2. 입력 필드 포커스/블러
  it("입력 필드의 포커스와 블러가 작동한다", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });

    // 포커스 이동
    await user.click(nameInput);
    expect(nameInput).toHaveFocus();

    await user.click(emailInput);
    expect(emailInput).toHaveFocus();
    expect(nameInput).not.toHaveFocus();
  });

  // 3. 입력값 변경 감지
  it("입력값 변경을 감지할 수 있다", async () => {
    const user = userEvent.setup();

    render(<UserForm />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });

    // 한 글자씩 입력
    await user.type(nameInput, "A");
    expect(nameInput).toHaveValue("A");

    await user.type(nameInput, "B");
    expect(nameInput).toHaveValue("AB");

    // 전체 텍스트 지우기
    await user.clear(nameInput);
    expect(nameInput).toHaveValue("");
  });

  // 4. 폼 제출 상호작용
  it("폼을 제출할 수 있다", async () => {
    const user = userEvent.setup();
    const handleSubmit = jest.fn();

    render(<UserForm onSubmit={handleSubmit} />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    // 초기에는 제출 버튼이 비활성화
    expect(submitButton).toBeDisabled();

    // 필수 필드 입력
    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");

    // 이제 제출 버튼이 활성화
    expect(submitButton).toBeEnabled();

    // 폼 제출
    await user.click(submitButton);

    // 제출 핸들러가 호출되었는지 확인
    expect(handleSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
    });
  });
});

describe("RTL 선택 요소 상호작용", () => {
  // 1. 체크박스 선택/해제
  it("체크박스를 선택하고 해제할 수 있다", async () => {
    const user = userEvent.setup();
    const handleSelectionChange = jest.fn();

    render(<SelectionForm onSelectionChange={handleSelectionChange} />);

    const readingCheckbox = screen.getByRole("checkbox", { name: /reading/i });
    const gamingCheckbox = screen.getByRole("checkbox", { name: /gaming/i });

    // 체크박스 선택
    await user.click(readingCheckbox);
    expect(readingCheckbox).toBeChecked();

    // 다른 체크박스도 선택
    await user.click(gamingCheckbox);
    expect(gamingCheckbox).toBeChecked();

    // 체크박스 해제
    await user.click(readingCheckbox);
    expect(readingCheckbox).not.toBeChecked();
    expect(gamingCheckbox).toBeChecked(); // 다른 체크박스는 그대로 유지
  });

  // 2. 라디오 버튼 선택
  it("라디오 버튼 그룹에서 하나만 선택할 수 있다", async () => {
    const user = userEvent.setup();
    const handleSelectionChange = jest.fn();

    render(<SelectionForm onSelectionChange={handleSelectionChange} />);

    const maleRadio = screen.getByRole("radio", { name: /^male$/i });
    const femaleRadio = screen.getByRole("radio", { name: /^female$/i });
    const otherRadio = screen.getByRole("radio", { name: /^other$/i });

    // 첫 번째 라디오 버튼 선택
    await user.click(maleRadio);
    expect(maleRadio).toBeChecked();
    expect(femaleRadio).not.toBeChecked();
    expect(otherRadio).not.toBeChecked();

    // 다른 라디오 버튼 선택
    await user.click(femaleRadio);
    expect(maleRadio).not.toBeChecked();
    expect(femaleRadio).toBeChecked();
    expect(otherRadio).not.toBeChecked();
  });

  // 3. 선택 상태 변경 감지
  it("선택 상태 변경을 감지할 수 있다", async () => {
    const user = userEvent.setup();
    const handleSelectionChange = jest.fn();

    render(<SelectionForm onSelectionChange={handleSelectionChange} />);

    const readingCheckbox = screen.getByRole("checkbox", { name: /reading/i });
    const maleRadio = screen.getByRole("radio", { name: /^male$/i });
    const notificationsToggle = screen.getByRole("checkbox", { name: /enable notifications/i });

    // 체크박스 선택
    await user.click(readingCheckbox);
    expect(handleSelectionChange).toHaveBeenLastCalledWith({
      hobbies: ["Reading"],
      gender: "",
      notifications: false,
    });

    // 라디오 버튼 선택
    await user.click(maleRadio);
    expect(handleSelectionChange).toHaveBeenLastCalledWith({
      hobbies: ["Reading"],
      gender: "Male",
      notifications: false,
    });

    // 알림 토글
    await user.click(notificationsToggle);
    expect(handleSelectionChange).toHaveBeenLastCalledWith({
      hobbies: ["Reading"],
      gender: "Male",
      notifications: true,
    });
  });

  // 4. 복합 선택 시나리오
  it("여러 선택 요소를 조합해서 사용할 수 있다", async () => {
    const user = userEvent.setup();

    render(<SelectionForm />);

    // 여러 취미 선택
    await user.click(screen.getByRole("checkbox", { name: /reading/i }));
    await user.click(screen.getByRole("checkbox", { name: /sports/i }));

    // 성별 선택
    await user.click(screen.getByRole("radio", { name: /^female$/i }));

    // 알림 활성화
    await user.click(screen.getByRole("checkbox", { name: /enable notifications/i }));

    // 선택된 항목들이 올바르게 표시되는지 확인
    expect(screen.getByText(/selected: reading, sports/i)).toBeInTheDocument();
    expect(screen.getByText(/selected: female/i)).toBeInTheDocument();
    expect(screen.getByText(/notifications: enabled/i)).toBeInTheDocument();
  });

  // 5. 키보드로 선택 요소 조작
  it("키보드로 선택 요소를 조작할 수 있다", async () => {
    const user = userEvent.setup();

    render(<SelectionForm />);

    const readingCheckbox = screen.getByRole("checkbox", { name: /reading/i });
    const maleRadio = screen.getByRole("radio", { name: /^male$/i });

    // 체크박스에 포커스하고 Space로 토글
    readingCheckbox.focus();
    await user.keyboard(" ");
    expect(readingCheckbox).toBeChecked();

    // 라디오 버튼에 포커스하고 Space로 선택
    maleRadio.focus();
    await user.keyboard(" ");
    expect(maleRadio).toBeChecked();
  });
});

/**
 * 💡 학습 포인트:
 *
 * 1. userEvent.setup() - 사용자 상호작용을 시뮬레이션하는 객체 생성
 * 2. await user.click() - 클릭 이벤트 시뮬레이션 (비동기)
 * 3. await user.type() - 텍스트 입력 시뮬레이션
 * 4. await user.clear() - 입력 필드 내용 지우기
 * 5. await user.keyboard() - 키보드 입력 시뮬레이션
 * 6. element.focus() - 요소에 포커스 설정
 * 7. expect().toHaveValue() - 입력 필드 값 확인
 * 8. expect().toHaveFocus() - 포커스 상태 확인
 * 9. expect().toBeChecked() - 체크박스/라디오 버튼 선택 상태 확인
 * 10. expect().not.toBeChecked() - 선택되지 않았음을 확인
 * 11. expect().toBeEnabled() / expect().toBeDisabled() - 버튼 활성화 상태 확인
 * 12. expect().toHaveTextContent() - 텍스트 내용 확인
 */
