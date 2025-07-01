/**
 * React Testing Library 기본 사용법 - 5단계: 비동기 동작과 대기 (실습)
 *
 * 🎯 실습 과제: waitFor, findBy, 타이머 모킹을 사용한 비동기 테스트
 */

import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// 비동기 컴포넌트 (원본 파일에서 복사)
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

describe("RTL 비동기 테스트 (실습)", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // 🎯 실습 1: 로딩 상태 테스트
  it("버튼 클릭 시 로딩 상태가 표시된다", async () => {
    // TODO: userEvent 설정, 컴포넌트 렌더링
    // TODO: getByRole로 버튼 찾기 및 클릭
    // TODO: getByRole로 로딩 상태 확인
  });

  // 🎯 실습 2: waitFor를 사용한 데이터 로딩 완료 대기
  it("waitFor를 사용하여 데이터 로딩 완료를 기다릴 수 있다", async () => {
    // TODO: Math.random 모킹으로 항상 성공하도록 설정
    // TODO: getByRole로 버튼 찾기 및 클릭 후 타이머 진행
    // TODO: waitFor로 getByRole로 성공 데이터 확인
  });

  // 🎯 실습 3: findBy를 사용한 비동기 요소 찾기
  it("findBy를 사용하여 비동기 요소를 찾을 수 있다", async () => {
    // TODO: 성공 시나리오 모킹
    // TODO: findByText로 성공 데이터 대기
  });

  // 🎯 실습 4: 에러 상태 처리 테스트
  it("에러 발생 시 에러 메시지가 표시된다", async () => {
    // TODO: Math.random 모킹으로 항상 실패하도록 설정
    // TODO: 버튼 클릭 후 타이머 진행
    // TODO: findByRole로 에러 메시지 대기
  });

  // 🎯 실습 5: 복합적인 비동기 시나리오 테스트
  it("로딩 → 성공 → 로딩 → 실패 시나리오를 테스트할 수 있다", async () => {
    // TODO: Math.random을 순차적으로 성공, 실패 반환하도록 모킹
    // TODO: 첫 번째 버튼 클릭 후 성공 데이터 확인
    // TODO: 두 번째 버튼 클릭 후 에러 메시지 확인
    // TODO: waitFor를 사용하여 상태 변화 검증
  });
});

/**
 * 💡 실습 API:
 * - waitFor(() => expect(...)) - 조건 만족까지 대기
 * - screen.findByText() - 요소가 나타날 때까지 대기
 * - screen.findByRole() - 역할로 요소를 찾을 때까지 대기
 * - screen.getByRole("button", { name: "Fetch Data" }) - 버튼 찾기
 * - screen.getByRole("status") - 상태 메시지 찾기
 * - screen.getByRole("alert") - 에러 메시지 찾기
 * - jest.spyOn(Math, 'random').mockReturnValue(0.6) - 랜덤 값 모킹
 * - jest.spyOn(Math, 'random').mockReturnValueOnce(0.6).mockReturnValueOnce(0.3) - 순차적 모킹
 * - jest.advanceTimersByTime(1000) - 타이머 1초 진행
 * - jest.runAllTimers() - 모든 타이머 실행
 */
