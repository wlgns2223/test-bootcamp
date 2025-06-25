/**
 * React Testing Library 기본 사용법 - 5단계: 비동기 동작과 대기 (실습)
 *
 * 🎯 실습 과제: waitFor, findBy, 타이머 모킹을 사용한 비동기 테스트
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// 비동기 컴포넌트 (원본 파일에서 복사)
function AsyncComponent() {
  // ... (원본과 동일)
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
    // TODO: 버튼 클릭
    // TODO: 로딩 상태 확인
  });

  // 🎯 실습 2: waitFor를 사용한 데이터 로딩 완료 대기
  it("데이터 로딩 완료를 기다릴 수 있다", async () => {
    // TODO: Math.random 모킹으로 항상 성공하도록 설정
    // TODO: 버튼 클릭 후 타이머 진행
    // TODO: waitFor로 성공 데이터 확인
  });

  // 🎯 실습 3: findBy를 사용한 비동기 요소 찾기
  it("findBy를 사용하여 비동기 요소를 찾을 수 있다", async () => {
    // TODO: 성공 시나리오 모킹
    // TODO: findByTestId로 성공 데이터 대기
  });
});

/**
 * 💡 실습 API:
 * - waitFor(() => expect(...)) - 조건 만족까지 대기
 * - screen.findByTestId() - 요소가 나타날 때까지 대기
 * - jest.spyOn(Math, 'random').mockReturnValue(0.6) - 랜덤 값 모킹
 * - jest.advanceTimersByTime(1000) - 타이머 1초 진행
 */
