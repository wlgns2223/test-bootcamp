/**
 * React Testing Library 기본 사용법 - 7단계: 베스트 프랙티스와 안티패턴 (정답)
 *
 * ✅ 실습 과제 정답: 올바른 RTL 사용법
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

describe("RTL 베스트 프랙티스 (정답)", () => {
  // ✅ 정답 1: 사용자 중심적인 테스트
  it("✅ GOOD: 사용자가 새로운 할일을 추가할 수 있다", async () => {
    const user = userEvent.setup();
    render(<SimpleTodo />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByRole("button", { name: "Add Todo" });

    // 새 할일 추가
    await user.type(input, "Buy groceries");
    await user.click(addButton);

    // 결과 확인 - 사용자가 볼 수 있는 것
    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(input).toHaveValue(""); // 입력창이 비워짐
  });

  // ✅ 정답 2: 접근성을 고려한 쿼리 사용
  it("✅ GOOD: 의미있는 role을 사용한다", () => {
    render(<SimpleTodo />);

    // role을 활용한 의미있는 선택
    const todoList = screen.getByRole("list");
    const addButton = screen.getByRole("button", { name: "Add Todo" });

    expect(todoList).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  // ✅ 정답 3: within을 사용한 범위 제한
  it("✅ GOOD: within으로 특정 영역 내에서 요소를 찾는다", () => {
    render(<SimpleTodo />);

    const todoList = screen.getByRole("list");

    // 특정 리스트 아이템 내에서만 검색
    const firstTodoItem = within(todoList).getByText("Learn React");
    expect(firstTodoItem).toBeInTheDocument();
  });

  // ✅ 정답 4: 올바른 쿼리 선택
  it("testid 사용을 최소화하고 의미있는 쿼리를 사용한다", async () => {
    const user = userEvent.setup();
    render(<SimpleTodo />);

    // ✅ GOOD: 더 의미있는 방법으로 요소 찾기
    const input = screen.getByPlaceholderText("Add a new todo");

    await user.type(input, "New task");
    expect(input).toHaveValue("New task");
  });
});

/**
 * 💡 정답 해설:
 *
 * 🎯 핵심 원칙:
 * "사용자가 할 수 있는 것을 테스트하고,
 *  사용자가 볼 수 있는 것을 확인하라"
 *
 * ✅ 올바른 접근:
 * 1. 사용자 관점에서 테스트 작성
 * 2. 접근성 친화적인 쿼리 우선 사용
 * 3. within()으로 정확한 범위 지정
 * 4. 실제 사용자 행동 모방
 * 5. 결과를 사용자 관점에서 확인
 *
 * ❌ 피해야 할 것:
 * - 구현 세부사항에 의존하는 테스트
 * - testid 남용 (마지막 수단으로만)
 * - CSS 클래스나 내부 상태 직접 테스트
 * - 사용자가 할 수 없는 행동 테스트
 */
