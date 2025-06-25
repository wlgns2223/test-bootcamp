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
      <button onClick={fetchData} data-testid="fetch-button">
        Fetch Data
      </button>

      {loading && <div data-testid="loading">Loading...</div>}
      {data && <div data-testid="success-data">{data}</div>}
      {error && <div data-testid="error-message">{error}</div>}
    </div>
  );
}

// 자동 로딩 컴포넌트
function AutoLoadingComponent() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("Content loaded!");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <div data-testid="auto-message">{message}</div>;
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

    expect(screen.getByTestId("fetch-button")).toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("success-data")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-message")).not.toBeInTheDocument();
  });

  // 2. 로딩 상태 테스트
  it("버튼 클릭 시 로딩 상태가 표시된다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(<AsyncComponent />);

    const fetchButton = screen.getByTestId("fetch-button");

    // 버튼 클릭
    await user.click(fetchButton);

    // 로딩 상태 즉시 확인
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  // 3. waitFor를 사용한 비동기 상태 변화 대기
  it("데이터 로딩 완료를 기다릴 수 있다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // Math.random을 모킹하여 항상 성공하도록 설정
    jest.spyOn(Math, "random").mockReturnValue(0.6);

    render(<AsyncComponent />);

    const fetchButton = screen.getByTestId("fetch-button");
    await user.click(fetchButton);

    // 타이머를 1초 진행
    jest.advanceTimersByTime(1000);

    // waitFor를 사용하여 성공 데이터가 나타날 때까지 대기
    await waitFor(() => {
      expect(screen.getByTestId("success-data")).toBeInTheDocument();
    });

    // 로딩이 사라졌는지 확인
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();

    // Math.random 모킹 복원
    jest.restoreAllMocks();
  });

  // 4. findBy를 사용한 비동기 요소 찾기
  it("findBy를 사용하여 비동기 요소를 찾을 수 있다", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    // 항상 성공하도록 설정
    jest.spyOn(Math, "random").mockReturnValue(0.7);

    render(<AsyncComponent />);

    const fetchButton = screen.getByTestId("fetch-button");
    await user.click(fetchButton);

    // 타이머 진행
    jest.advanceTimersByTime(1000);

    // findByTestId는 요소가 나타날 때까지 자동으로 대기
    const successData = await screen.findByTestId("success-data");
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

    const fetchButton = screen.getByTestId("fetch-button");
    await user.click(fetchButton);

    // 타이머 진행
    jest.advanceTimersByTime(1000);

    // 에러 메시지가 나타날 때까지 대기
    const errorMessage = await screen.findByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Failed to fetch data");

    // 로딩이 사라졌는지 확인
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();

    jest.restoreAllMocks();
  });

  // 6. 자동 로딩 컴포넌트 테스트
  it("컴포넌트 마운트 시 자동으로 내용이 변경된다", async () => {
    render(<AutoLoadingComponent />);

    // 초기 로딩 메시지 확인
    expect(screen.getByTestId("auto-message")).toHaveTextContent("Loading...");

    // 500ms 후 내용 변경
    jest.advanceTimersByTime(500);

    // 변경된 내용 확인
    await waitFor(() => {
      expect(screen.getByTestId("auto-message")).toHaveTextContent(
        "Content loaded!"
      );
    });
  });

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
 * 2. findBy*() - 요소가 나타날 때까지 자동으로 대기하는 쿼리
 * 3. jest.useFakeTimers() - 시간 기반 동작을 제어
 * 4. jest.advanceTimersByTime() - 타이머를 수동으로 진행
 * 5. Math.random 모킹으로 랜덤 동작 제어
 * 6. 로딩/성공/에러 상태의 순차적 테스트
 * 7. useEffect 훅과 자동 실행되는 비동기 동작 테스트
 * 8. waitFor의 timeout 옵션
 * 9. 비동기 상태 변화 패턴 테스트
 * 10. 타이머 정리 (beforeEach/afterEach)
 */
