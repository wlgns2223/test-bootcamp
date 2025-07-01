/**
 * React Testing Library 기본 사용법 - 5단계: 비동기 동작과 대기 (정답)
 *
 * ✅ 실습 과제 정답: 비동기 테스트의 완성된 버전
 */

import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// 비동기 동작을 시뮬레이션하는 컴포넌트
function AsyncComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (Math.random() > 0.5) {
      setData("Successfully fetched data!");
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {loading && (
        <div role="status" aria-live="polite">
          Loading...
        </div>
      )}
      {data && (
        <div role="status" aria-live="polite">
          {data}
        </div>
      )}
    </div>
  );
}

describe("RTL 비동기 테스트 (정답)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // ✅ 정답 1: 로딩 상태 테스트
  it("버튼 클릭 시 로딩 상태가 표시된다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<AsyncComponent />);

    await user.click(screen.getByRole("button", { name: "Fetch Data" }));
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  });

  // ✅ 정답 2: waitFor를 사용한 데이터 로딩 완료 대기
  it("데이터 로딩 완료를 기다릴 수 있다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    jest.spyOn(Math, "random").mockReturnValue(0.6);

    render(<AsyncComponent />);
    await user.click(screen.getByRole("button", { name: "Fetch Data" }));
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("Successfully fetched data!");
    });

    jest.restoreAllMocks();
  });

  // ✅ 정답 3: findBy를 사용한 비동기 요소 찾기
  it("findBy를 사용하여 비동기 요소를 찾을 수 있다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    jest.spyOn(Math, "random").mockReturnValue(0.7);

    render(<AsyncComponent />);
    await user.click(screen.getByRole("button", { name: "Fetch Data" }));
    jest.advanceTimersByTime(1000);

    const successData = await screen.findByText("Successfully fetched data!");
    expect(successData).toHaveTextContent("Successfully fetched data!");

    jest.restoreAllMocks();
  });
});

/**
 * 💡 정답 해설:
 * - waitFor: 조건이 만족될 때까지 반복 확인
 * - findByText: 텍스트가 나타날 때까지 자동 대기
 * - getByRole: 접근성 기반 요소 찾기 (버튼, 상태 메시지)
 * - 타이머 모킹으로 비동기 동작 제어
 */
