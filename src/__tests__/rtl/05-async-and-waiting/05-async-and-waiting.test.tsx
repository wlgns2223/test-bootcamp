/**
 * React Testing Library 기본 사용법 - 5단계: 비동기 동작과 대기
 *
 * 학습 목표:
 * 1. waitFor를 사용한 비동기 상태 변화 대기
 * 2. findBy* 쿼리로 비동기 요소 찾기
 * 3. 타이머와 지연 동작 테스트
 * 4. 로딩 상태 테스트
 */

import React, { useState, useEffect } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// 비동기 동작을 시뮬레이션하는 간단한 컴포넌트
function AsyncComponent() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // API 호출 시뮬레이션 (1초 대기)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 랜덤하게 성공/실패 결정
      if (Math.random() > 0.5) {
        setData("Successfully fetched data!");
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
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
      {error && <div role="alert">{error}</div>}
    </div>
  );
}

// 자동 로딩 컴포넌트
function AutoLoadingComponent() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Content loaded!");
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div role="status" aria-live="polite">
      {message}
    </div>
  );
}

describe("RTL 비동기 테스트", () => {
  // Jest 타이머 모킹 설정
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // 1. 초기 상태 확인
  it("초기에는 버튼만 표시된다", () => {
    render(<AsyncComponent />);

    expect(screen.getByRole("button", { name: "Fetch Data" })).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  // 2. 로딩 상태 테스트
  it("버튼 클릭 시 로딩 상태가 표시된다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<AsyncComponent />);

    const fetchButton = screen.getByRole("button", { name: "Fetch Data" });

    // 버튼 클릭
    await user.click(fetchButton);

    // 로딩 상태 즉시 확인
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  });

  // 3. waitFor를 사용한 비동기 상태 변화 대기
  it("데이터 로딩 완료를 기다릴 수 있다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // Math.random을 모킹하여 항상 성공하도록 설정
    jest.spyOn(Math, "random").mockReturnValue(0.6);

    render(<AsyncComponent />);

    const fetchButton = screen.getByRole("button", { name: "Fetch Data" });
    await user.click(fetchButton);

    // 타이머를 1초 진행
    jest.advanceTimersByTime(1000);

    // waitFor를 사용하여 성공 데이터가 나타날 때까지 대기
    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent("Successfully fetched data!");
    });

    // 로딩이 사라졌는지 확인
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();

    // Math.random 모킹 복원
    jest.restoreAllMocks();
  });

  // 4. findBy를 사용한 비동기 요소 찾기
  it("findBy를 사용하여 비동기 요소를 찾을 수 있다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // 항상 성공하도록 설정
    jest.spyOn(Math, "random").mockReturnValue(0.7);

    render(<AsyncComponent />);

    const fetchButton = screen.getByRole("button", { name: "Fetch Data" });
    await user.click(fetchButton);

    // 타이머 진행
    jest.advanceTimersByTime(1000);

    // findByText는 요소가 나타날 때까지 자동으로 대기
    const successData = await screen.findByText("Successfully fetched data!");
    expect(successData).toBeInTheDocument();
    expect(successData).toHaveTextContent("Successfully fetched data!");

    jest.restoreAllMocks();
  });

  // 5. 에러 상태 테스트
  it("에러 발생 시 에러 메시지가 표시된다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // 항상 실패하도록 설정
    jest.spyOn(Math, "random").mockReturnValue(0.3);

    render(<AsyncComponent />);

    const fetchButton = screen.getByRole("button", { name: "Fetch Data" });
    await user.click(fetchButton);

    // 타이머 진행
    jest.advanceTimersByTime(1000);

    // 에러 메시지가 나타날 때까지 대기
    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Failed to fetch data");

    // 로딩이 사라졌는지 확인
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();

    jest.restoreAllMocks();
  });

  // 6. 자동 로딩 컴포넌트 테스트
  it("컴포넌트 마운트 시 자동으로 내용이 변경된다", async () => {
    render(<AutoLoadingComponent />);

    // 초기 로딩 메시지 확인
    expect(screen.getByRole("status")).toHaveTextContent("Loading...");

    // 500ms 후 내용 변경
    jest.advanceTimersByTime(10000);

    // 변경된 내용 확인
    // await waitFor(() => {
    //   expect(screen.getByRole("status")).toHaveTextContent("Content loaded!");
    // });

    // const statusByRole = await screen.findByRole("status",undefined, {timeout:6000});
    // expect(statusByRole).toHaveTextContent("Content");

    const status = await screen.findByText("Content loaded!", undefined, { timeout: 15000 });
    expect(status).toHaveTextContent("Content");
  }, 15000);

  // 7. 타임아웃 테스트
  it("waitFor 타임아웃을 설정할 수 있다", async () => {
    render(
      <div data-testid="never-appears" style={{ display: "none" }}>
        Never
      </div>
    );

    // 짧은 타임아웃으로 설정하여 빠르게 실패하도록 함
    await expect(
      waitFor(
        () => {
          expect(screen.getByTestId("never-appears")).toBeVisible();
        },
        { timeout: 100 }
      )
    ).rejects.toThrow();
  });
});

/**
 * 💡 학습 포인트:
 *
 * 1. waitFor() - 조건이 만족될 때까지 대기
 * 2. findByText() - 텍스트가 나타날 때까지 자동으로 대기하는 쿼리
 * 3. getByRole() - 접근성 기반 요소 찾기 (버튼, 상태, 알림)
 * 4. jest.useFakeTimers() - 시간 기반 동작을 제어
 * 5. jest.advanceTimersByTime() - 타이머를 수동으로 진행
 * 6. Math.random 모킹으로 랜덤 동작 제어
 * 7. 로딩/성공/에러 상태의 순차적 테스트
 * 8. useEffect 훅과 자동 실행되는 비동기 동작 테스트
 * 9. waitFor의 timeout 옵션
 * 10. 비동기 상태 변화 패턴 테스트
 * 11. 타이머 정리 (beforeEach/afterEach)
 * 12. 접근성 역할(role)을 활용한 테스트
 */
