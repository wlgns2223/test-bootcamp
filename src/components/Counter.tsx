import React, { useState } from "react";

interface CounterProps {
  initialValue?: number;
  step?: number;
  "data-testid"?: string;
}

export default function Counter({
  initialValue = 0,
  step = 1,
  "data-testid": testId,
}: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + step);
  const decrement = () => setCount((prev) => prev - step);
  const reset = () => setCount(initialValue);

  return (
    <div data-testid={testId} className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Counter</h2>
      <div className="text-2xl font-mono mb-4" data-testid="counter-value">
        {count}
      </div>
      <div className="space-x-2">
        <button
          onClick={decrement}
          data-testid="decrement-button"
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <button
          onClick={increment}
          data-testid="increment-button"
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
        <button
          onClick={reset}
          data-testid="reset-button"
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
