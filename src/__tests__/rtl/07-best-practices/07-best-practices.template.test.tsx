/**
 * React Testing Library 기본 사용법 - 7단계: 베스트 프랙티스와 안티패턴 (실습)
 *
 * 🎯 실습 과제: RTL의 올바른 사용법과 피해야 할 패턴을 학습
 */

import React, { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// 간단한 Todo 컴포넌트
function SimpleTodo() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul role="list">
        {todos.map((todo) => (
          <li key={todo.id} role="listitem">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe("RTL 베스트 프랙티스 (실습)", () => {
  // 🎯 실습 1: ✅ GOOD - 사용자 중심적인 테스트
  it("✅ GOOD: 사용자가 새로운 할일을 추가할 수 있다", async () => {
    // TODO: userEvent 설정
    // TODO: 컴포넌트 렌더링
    // TODO: placeholder로 input 찾기
    // TODO: role로 버튼 찾기
    // TODO: 새 할일 입력 및 추가
    // TODO: 결과 확인 - 새 할일이 목록에 표시되는지
    // TODO: 입력창이 비워졌는지 확인
  });

  // 🎯 실습 2: ✅ GOOD - 접근성을 고려한 쿼리 사용
  it("✅ GOOD: 의미있는 role을 사용한다", () => {
    // TODO: 컴포넌트 렌더링
    // TODO: getByRole로 list와 button 찾기
    // TODO: 존재 확인
  });

  // 🎯 실습 3: ✅ GOOD - within을 사용한 범위 제한
  it("✅ GOOD: within으로 특정 영역 내에서 요소를 찾는다", () => {
    // TODO: 컴포넌트 렌더링
    // TODO: getByRole로 list 찾기
    // TODO: within(list)를 사용해서 리스트 내부의 특정 텍스트 찾기
  });

  // 🎯 실습 4: ❌ BAD vs ✅ GOOD 비교
  it("testid 사용을 최소화하고 의미있는 쿼리를 사용한다", async () => {
    const user = userEvent.setup();
    render(<SimpleTodo />);

    // ❌ BAD: testid를 첫 번째 선택으로 사용하지 말기
    // const input = screen.getByTestId('todo-input');

    // ✅ GOOD: 더 의미있는 방법으로 요소 찾기
    // TODO: placeholder로 input 찾기
    // TODO: 텍스트 입력 후 값 확인
  });
});

/**
 * 💡 베스트 프랙티스 체크리스트:
 *
 * ✅ DO (권장사항):
 * - 사용자 관점에서 테스트 작성
 * - 접근성 친화적인 쿼리 사용 (role, label)
 * - within()으로 범위 제한
 * - 실제 사용자 행동 모방
 *
 * ❌ DON'T (피해야 할 것):
 * - 구현 세부사항 테스트
 * - testid 남용
 * - CSS 클래스나 내부 상태 의존
 */
