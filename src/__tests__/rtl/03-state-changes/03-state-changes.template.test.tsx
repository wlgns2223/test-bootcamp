/**
 * React Testing Library 기본 사용법 - 3단계: 상태 변화 테스트 (실습)
 *
 * 학습 목표:
 * 1. 다양한 컴포넌트의 상태 변화 테스트
 * 2. 복합적인 사용자 상호작용과 상태 관리
 * 3. 폼 입력, 선택, 토글 등 다양한 UI 패턴 테스트
 *
 * 🎯 실습 과제:
 * - 다양한 컴포넌트의 상태 변화를 테스트해보세요
 * - 사용자 상호작용에 따른 UI 업데이트를 확인하세요
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import TodoList from "../../../components/TodoList";
import Toggle from "../../../components/Toggle";
import Form from "../../../components/Form";
import Tab from "../../../components/Tab";
import Accordion from "../../../components/Accordion";
import MultiSelect from "../../../components/MultiSelect";

describe("RTL 상태 변화 테스트 - 다양한 컴포넌트 (실습)", () => {
  // 🎯 실습 1: TodoList 컴포넌트 - 할일 추가/삭제 상태 변화
  it("할일을 추가하고 삭제할 수 있다", async () => {
    // TODO: userEvent를 설정하세요
    // TODO: TodoList 컴포넌트를 렌더링하세요
    // TODO: getByPlaceholderText로 입력 필드를 찾으세요
    // TODO: getByRole로 "추가" 버튼을 찾으세요
    // TODO: "테스트 할일"을 입력하고 추가 버튼을 클릭하세요
    // TODO: getByText로 "테스트 할일"이 추가되었는지 확인하세요
    // TODO: getByText로 "삭제" 버튼을 찾아 클릭하세요
    // TODO: "테스트 할일"이 삭제되었는지 확인하세요 (queryByText 사용)
  });

  // 🎯 실습 2: Toggle 컴포넌트 - 체크박스 상태 변화
  it("토글 상태가 올바르게 변경된다", async () => {
    // TODO: userEvent를 설정하세요
    // TODO: Toggle 컴포넌트를 렌더링하세요
    // TODO: getByRole로 체크박스를 찾으세요
    // TODO: 초기 상태가 체크되지 않았는지 확인하세요
    // TODO: 체크박스를 클릭하세요
    // TODO: 상태가 "켜짐"으로 변경되었는지 확인하세요
    // TODO: 토글 횟수가 1로 증가했는지 확인하세요
  });

  // 🎯 실습 3: Form 컴포넌트 - 폼 입력 상태 변화
  it("폼 입력과 제출이 올바르게 작동한다", async () => {
    // TODO: userEvent를 설정하세요
    // TODO: Form 컴포넌트를 렌더링하세요
    // TODO: getByLabelText로 "이름" 입력 필드를 찾으세요
    // TODO: getByLabelText로 "이메일" 입력 필드를 찾으세요
    // TODO: getByLabelText로 "메시지" 입력 필드를 찾으세요
    // TODO: 각 필드에 값을 입력하세요 (이름: "홍길동", 이메일: "test@test.com", 메시지: "테스트 메시지")
    // TODO: getByRole로 "제출" 버튼을 찾아 클릭하세요
    // TODO: 제출 완료 메시지가 표시되는지 확인하세요
  });

  // 🎯 실습 4: Tab 컴포넌트 - 탭 전환 상태 변화
  it("탭 전환이 올바르게 작동한다", async () => {
    const tabs = [
      { id: "tab1", label: "첫번째 탭", content: "첫번째 탭 내용" },
      { id: "tab2", label: "두번째 탭", content: "두번째 탭 내용" },
      { id: "tab3", label: "세번째 탭", content: "세번째 탭 내용" },
    ];

    // TODO: userEvent를 설정하세요
    // TODO: Tab 컴포넌트를 tabs prop과 함께 렌더링하세요
    // TODO: getByText로 "첫번째 탭" 버튼을 찾으세요
    // TODO: getByText로 "두번째 탭" 버튼을 찾으세요
    // TODO: 초기에는 "첫번째 탭 내용"이 표시되는지 확인하세요
    // TODO: "두번째 탭" 버튼을 클릭하세요
    // TODO: "두번째 탭 내용"이 표시되는지 확인하세요
    // TODO: 탭 히스토리가 2개인지 확인하세요
  });

  // 🎯 실습 5: Accordion 컴포넌트 - 아코디언 열기/닫기
  it("아코디언 항목을 열고 닫을 수 있다", async () => {
    const items = [
      { id: "item1", title: "항목 1", content: "항목 1의 내용입니다" },
      { id: "item2", title: "항목 2", content: "항목 2의 내용입니다" },
    ];

    // TODO: userEvent를 설정하세요
    // TODO: Accordion 컴포넌트를 items prop과 함께 렌더링하세요
    // TODO: getByText로 "항목 1" 버튼을 찾으세요
    // TODO: 초기에는 내용이 숨겨져 있는지 확인하세요 (queryByText 사용)
    // TODO: "항목 1" 버튼을 클릭하세요
    // TODO: "항목 1의 내용입니다"가 표시되는지 확인하세요
    // TODO: 클릭 횟수가 1로 증가했는지 확인하세요
  });

  // 🎯 실습 6: MultiSelect 컴포넌트 - 다중 선택 상태 변화
  it("다중 선택이 올바르게 작동한다", async () => {
    const options = [
      { id: "opt1", label: "옵션 1", value: "value1" },
      { id: "opt2", label: "옵션 2", value: "value2" },
      { id: "opt3", label: "옵션 3", value: "value3" },
      { id: "opt4", label: "옵션 4", value: "value4" },
    ];

    // TODO: userEvent를 설정하세요
    // TODO: MultiSelect 컴포넌트를 options prop과 함께 렌더링하세요
    // TODO: getByRole로 "옵션 보기" 버튼을 찾아 클릭하세요
    // TODO: getByRole로 첫 번째 체크박스를 찾아 클릭하세요
    // TODO: 선택 개수가 1로 증가했는지 확인하세요
    // TODO: "모두 선택" 버튼을 클릭하세요
    // TODO: 선택 개수가 최대값(3)에 도달했는지 확인하세요
    // TODO: "최대 선택 개수에 도달했습니다!" 경고가 표시되는지 확인하세요
  });
});

/**
 * 💡 실습에서 사용할 주요 API들:
 *
 * 🎮 컴포넌트별 주요 props:
 * - TodoList: initialTodos - 초기 할일 목록
 * - Toggle: initialChecked, label, disabled - 초기 상태, 라벨, 비활성화 여부
 * - Form: initialData - 초기 폼 데이터
 * - Tab: tabs, defaultActiveTab - 탭 목록, 기본 활성 탭
 * - Accordion: items, allowMultiple, defaultOpen - 항목 목록, 다중 열기 허용, 기본 열린 항목
 * - MultiSelect: options, maxSelections, defaultSelected - 옵션 목록, 최대 선택 개수, 기본 선택된 항목
 *
 * 🎯 요소 찾기:
 * - 입력 필드: getByPlaceholderText("placeholder"), getByLabelText("라벨")
 * - 버튼: getByRole("button", { name: "버튼 텍스트" })
 * - 체크박스: getByRole("checkbox")
 * - 텍스트: getByText("텍스트"), queryByText("텍스트") (존재하지 않을 수 있는 경우)
 *
 * 🔍 주요 쿼리:
 * - screen.getByText("text") - 텍스트로 요소 찾기
 * - screen.getByRole("button", { name: "text" }) - 버튼 역할과 텍스트로 찾기
 * - screen.getByPlaceholderText("placeholder") - placeholder로 입력 필드 찾기
 * - screen.getByLabelText("label") - label로 입력 필드 찾기
 * - screen.queryByText("text") - 텍스트로 요소 찾기 (없으면 null)
 * - expect(element).toHaveTextContent("text") - 텍스트 내용 확인
 * - expect(element).toBeChecked() - 체크박스가 체크되었는지 확인
 * - expect(element).toBeDisabled() - 요소가 비활성화되었는지 확인
 *
 * ⚡ 상태 변화 테스트 패턴:
 * 1. 초기 상태 확인
 * 2. 사용자 액션 수행 (클릭, 입력, 선택 등)
 * 3. 변경된 상태 확인
 * 4. 복합적인 상호작용 테스트
 * 5. 에러 상태나 경계 조건 테스트
 */
