/**
 * React Testing Library 기본 사용법 - 7단계: 베스트 프랙티스와 안티패턴
 *
 * 학습 목표:
 * 1. RTL의 베스트 프랙티스 이해
 * 2. 피해야 할 안티패턴 학습
 * 3. 실제 사용자 행동을 모방하는 테스트 작성
 * 4. 유지보수 가능한 테스트 코드 작성
 */

import React, { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// 샘플 컴포넌트들
function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write tests", completed: true },
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

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <h1>Todo App</h1>

      <div>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          data-testid="todo-input"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul role="list">
        {todos.map((todo) => (
          <li key={todo.id} role="listitem">
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.completed ? "completed" : ""}>
                {todo.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

describe("RTL 베스트 프랙티스", () => {
  // ✅ GOOD: 사용자 중심적인 테스트
  it("✅ GOOD: 사용자가 할 수 있는 동작을 테스트한다", async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    // 사용자가 실제로 할 수 있는 동작들
    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByRole("button", { name: "Add Todo" });

    // 새 할일 추가
    await user.type(input, "Buy groceries");
    await user.click(addButton);

    // 결과 확인 - 사용자가 볼 수 있는 것
    expect(screen.getByText("Buy groceries")).toBeInTheDocument();
    expect(input).toHaveValue(""); // 입력창이 비워짐
  });

  // ✅ GOOD: 접근성을 고려한 쿼리 사용
  it("✅ GOOD: 의미있는 role과 label을 사용한다", async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    // role을 활용한 의미있는 선택
    const todoList = screen.getByRole("list");
    const addButton = screen.getByRole("button", { name: "Add Todo" });

    expect(todoList).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();

    // 체크박스 상호작용
    const firstCheckbox = screen.getByRole("checkbox", {
      name: /learn react/i,
    });
    await user.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();
  });

  // ✅ GOOD: within을 사용한 범위 제한
  it("✅ GOOD: within으로 특정 영역 내에서 요소를 찾는다", async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    const todoList = screen.getByRole("list");

    // 특정 리스트 아이템 내에서만 검색
    const firstTodoItem = within(todoList).getByText("Learn React");
    expect(firstTodoItem).toBeInTheDocument();

    // 해당 아이템의 체크박스만 찾기
    const firstTodoContainer = firstTodoItem.closest("li");
    if (firstTodoContainer) {
      const checkbox = within(firstTodoContainer).getByRole("checkbox");
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    }
  });

  // ✅ GOOD: 적절한 비동기 처리
  it("✅ GOOD: 적절한 대기 시간과 비동기 처리", async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByRole("button", { name: "Add Todo" });

    // 사용자의 자연스러운 타이핑 속도 시뮬레이션
    await user.type(input, "New task");
    await user.click(addButton);

    // 요소가 나타날 때까지 적절히 대기
    const newTask = await screen.findByText("New task");
    expect(newTask).toBeInTheDocument();
  });

  // ❌ BAD: 구현 세부사항에 의존하는 테스트
  it("❌ BAD: 구현 세부사항을 테스트하지 않는다", () => {
    render(<TodoApp />);

    // ❌ CSS 클래스나 내부 상태에 의존
    // const todoComponent = container.querySelector('.todo-item');
    // expect(todoComponent).toHaveClass('todo-item');

    // ✅ 대신 사용자가 실제로 보는 것을 테스트
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });

  // ❌ BAD: testid 남용
  it("❌ BAD: testid를 마지막 수단으로만 사용한다", async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    // ❌ testid를 첫 번째 선택으로 사용
    // const input = screen.getByTestId('todo-input');

    // ✅ 더 의미있는 방법으로 요소 찾기
    const input = screen.getByPlaceholderText("Add a new todo");

    await user.type(input, "Test todo");
    expect(input).toHaveValue("Test todo");
  });

  // ✅ GOOD: 명확하고 설명적인 테스트
  it("✅ GOOD: 테스트 이름이 명확하고 설명적이다 - 사용자가 할일을 완료 상태로 변경할 수 있다", async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    // 현재 미완료 상태인 할일 찾기
    const learnReactCheckbox = screen.getByRole("checkbox", {
      name: /learn react/i,
    });
    expect(learnReactCheckbox).not.toBeChecked();

    // 완료 상태로 변경
    await user.click(learnReactCheckbox);

    // 완료 상태 확인
    expect(learnReactCheckbox).toBeChecked();
  });

  // ✅ GOOD: 에러 상황 테스트
  it("✅ GOOD: 빈 입력으로는 할일이 추가되지 않는다", async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    const addButton = screen.getByRole("button", { name: "Add Todo" });
    const initialTodos = screen.getAllByRole("listitem");

    // 빈 상태로 추가 시도
    await user.click(addButton);

    // 할일이 추가되지 않았는지 확인
    const todosAfterClick = screen.getAllByRole("listitem");
    expect(todosAfterClick).toHaveLength(initialTodos.length);
  });

  // ✅ GOOD: 여러 시나리오를 포함한 종합 테스트
  it("✅ GOOD: 완전한 사용자 워크플로우 테스트", async () => {
    const user = userEvent.setup();

    render(<TodoApp />);

    // 1. 새 할일 추가
    const input = screen.getByPlaceholderText("Add a new todo");
    await user.type(input, "Go shopping");
    await user.click(screen.getByRole("button", { name: "Add Todo" }));

    // 2. 추가된 할일 확인
    expect(screen.getByText("Go shopping")).toBeInTheDocument();

    // 3. 기존 할일을 완료 상태로 변경
    const learnReactCheckbox = screen.getByRole("checkbox", {
      name: /learn react/i,
    });
    await user.click(learnReactCheckbox);

    // 4. 모든 할일 상태 확인
    expect(learnReactCheckbox).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: /write tests/i })
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: /go shopping/i })
    ).not.toBeChecked();

    // 5. 총 할일 개수 확인
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });
});

/**
 * 💡 RTL 베스트 프랙티스:
 *
 * ✅ DO (권장사항):
 * 1. 사용자가 실제로 할 수 있는 동작을 테스트
 * 2. 접근성을 고려한 쿼리 사용 (role, label 등)
 * 3. within()으로 특정 영역 내 요소 검색
 * 4. 적절한 비동기 처리와 대기
 * 5. 명확하고 설명적인 테스트 이름
 * 6. 에러 상황과 엣지 케이스 테스트
 * 7. 완전한 사용자 워크플로우 테스트
 * 8. 사용자가 보고 경험하는 것에 집중
 *
 * ❌ DON'T (피해야 할 것):
 * 1. 구현 세부사항 테스트 (CSS 클래스, 내부 상태)
 * 2. testid 남용 (마지막 수단으로만 사용)
 * 3. 복잡한 DOM 구조에 의존
 * 4. 컴포넌트 내부 메서드 직접 호출
 * 5. snapshot 테스트 남용
 * 6. 너무 세부적인 단위 테스트
 * 7. 실제 사용자 행동과 다른 테스트
 *
 * 💡 핵심 원칙:
 * "사용자가 할 수 있는 것을 테스트하고,
 *  사용자가 볼 수 있는 것을 확인하라"
 */
