import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  initialTodos?: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ initialTodos = [] }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="todo-list">
      <h2>할일 목록</h2>

      <div className="add-todo">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="할일을 입력하세요"
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul className="todos">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            <span>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <div className="todo-stats">
          <span>총 {todos.length}개</span>
          <span>완료 {todos.filter((t) => t.completed).length}개</span>
          <button onClick={clearCompleted}>완료된 항목 삭제</button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
