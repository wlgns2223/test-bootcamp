/**
 * React Testing Library 기본 사용법 - 1단계: 렌더링과 기본 쿼리 (실습)
 *
 * 학습 목표:
 * 1. 컴포넌트 렌더링 (render)
 * 2. 기본 쿼리 메서드들 (getBy*, queryBy*, findBy*)
 * 3. 텍스트 기반 선택
 * 4. 쿼리 우선순위: getByRole > getByLabelText > getByPlaceholderText > getByText > getByDisplayValue > getByTestId
 *
 * 🎯 실습 과제:
 * - 아래의 빈 테스트들을 완성해보세요
 * - 주석을 참고하여 적절한 쿼리와 assertion을 작성하세요
 * - 쿼리 우선순위를 고려하여 가장 적절한 쿼리를 선택하세요
 */

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "../../../components/Button";
import {
  ConditionalComponent,
  AsyncComponent,
  ErrorComponent,
  MultipleElementsComponent,
  TimerComponent,
  FormComponent,
  ListComponent,
  NavigationComponent,
} from "../../../components/QueryPractice";

describe("RTL 기본 사용법 - Button 컴포넌트 (실습)", () => {
  // 🎯 실습 1: 기본 렌더링과 role 찾기
  it("버튼이 렌더링되고 role로 찾을 수 있다", () => {
    // TODO: Button 컴포넌트를 "Click me" 텍스트로 렌더링하세요
    // TODO: getByRole을 사용해서 "button" role을 가진 요소를 찾으세요
    // TODO: 버튼이 DOM에 존재하는지 확인하세요
    // TODO: 버튼의 텍스트가 "Click me"인지 확인하세요
  });

  // 🎯 실습 2: role로 요소 찾기
  it("버튼을 role로 찾을 수 있다", () => {
    render(<Button>Submit</Button>);

    // TODO: getByRole을 사용해서 button role을 가진 요소를 찾으세요

    // TODO: 버튼이 DOM에 존재하는지 확인하세요

    // TODO: 버튼의 텍스트 내용이 "Submit"인지 확인하세요
  });

  // 🎯 실습 3: testid로 요소 찾기 (마지막 수단)
  it("testid로 버튼을 찾을 수 있다", () => {
    // TODO: Button 컴포넌트를 data-testid="my-button"과 "Test Button" 텍스트로 렌더링하세요
    // TODO: getByTestId를 사용해서 "my-button" testid를 가진 요소를 찾으세요
    // TODO: 버튼이 DOM에 존재하는지 확인하세요
  });

  // 🎯 실습 4: 요소의 속성 확인
  it("버튼의 속성을 확인할 수 있다", () => {
    // TODO: 비활성화된 Button 컴포넌트를 "Disabled Button" 텍스트로 렌더링하세요
    // 힌트: disabled prop을 사용하세요
    // TODO: getByRole을 사용해서 버튼을 찾으세요
    // TODO: 버튼이 비활성화되어 있는지 확인하세요 (toBeDisabled 사용)
    // TODO: 버튼이 특정 CSS 클래스들을 가지고 있는지 확인하세요
    // 힌트: "px-4", "py-2", "rounded" 클래스들을 확인해보세요
  });

  // 🎯 실습 5: queryBy와 getBy의 차이
  it("존재하지 않는 요소는 queryBy로 확인한다", () => {
    render(<Button>Only Button</Button>);

    // TODO: queryByRole을 사용해서 존재하지 않는 "textbox" role을 찾으세요

    // TODO: 찾은 요소가 DOM에 존재하지 않는지 확인하세요 (not.toBeInTheDocument 사용)

    // 💡 참고: getByRole("textbox")를 사용하면 에러가 발생합니다!
    // queryByRole은 요소가 없을 때 null을 반환하지만,
    // getByRole은 요소가 없을 때 에러를 던집니다.
  });
});

describe("getBy* 실습", () => {
  // 🎯 실습 6: 기본 getByRole 사용법
  it("존재하는 요소를 getByRole로 찾을 수 있다", () => {
    render(<MultipleElementsComponent />);

    // TODO: getByRole을 사용해서 "첫 번째 버튼" 텍스트를 가진 button role을 찾으세요
    // 힌트: { name: "첫 번째 버튼" } 옵션을 사용하세요
    // TODO: getByRole을 사용해서 "article" role을 가진 요소를 찾으세요
    // TODO: 두 요소가 모두 DOM에 존재하는지 확인하세요
    // TODO: 버튼의 텍스트가 "첫 번째 버튼"인지 확인하세요
  });

  // 🎯 실습 7: 여러 요소 중 첫 번째 찾기
  it("여러 요소가 있을 때 getByRole는 첫 번째 요소를 찾는다", () => {
    render(<MultipleElementsComponent />);

    // TODO: getByRole을 사용해서 "첫 번째 버튼" 텍스트를 가진 button role을 찾으세요
    // 힌트: { name: "첫 번째 버튼" } 옵션을 사용하세요
    // TODO: 찾은 버튼의 텍스트가 "첫 번째 버튼"인지 확인하세요
  });

  // 🎯 실습 8: getByText 사용법
  it("텍스트로 요소를 찾을 수 있다", () => {
    render(<MultipleElementsComponent />);

    // TODO: getByText를 사용해서 "정보 텍스트"를 찾으세요
    // TODO: getByText를 사용해서 "라벨"을 찾으세요
    // TODO: 두 요소가 모두 DOM에 존재하는지 확인하세요
  });

  // 🎯 실습 9: getByRole로 존재하지 않는 요소 찾기 (에러 발생)
  it("존재하지 않는 요소를 getByRole로 찾으면 에러가 발생한다", () => {
    render(<MultipleElementsComponent />);

    // TODO: expect와 화살표 함수를 사용해서 getByRole("textbox")가 에러를 던지는지 확인하세요
    // TODO: expect와 화살표 함수를 사용해서 getByText("존재하지 않는 텍스트")가 에러를 던지는지 확인하세요
    // 힌트: expect(() => function()).toThrow() 형태를 사용하세요
  });

  // 🎯 실습 10: 조건부 요소 찾기
  it("조건부로 렌더링되는 요소를 getByRole로 찾을 수 있다", () => {
    // TODO: ConditionalComponent를 show={true}로 렌더링하세요
    // TODO: getByRole을 사용해서 "banner" role을 가진 요소를 찾으세요
    // TODO: 찾은 요소가 DOM에 존재하는지 확인하세요
    // TODO: 찾은 요소의 텍스트가 "조건부 요소"인지 확인하세요
  });
});

describe("queryBy* 실습", () => {
  // 🎯 실습 11: 안전한 요소 확인
  it("존재하지 않는 요소를 queryByRole로 안전하게 확인할 수 있다", () => {
    render(<MultipleElementsComponent />);

    // TODO: queryByRole을 사용해서 존재하지 않는 "textbox" role을 찾으세요
    // TODO: queryByText를 사용해서 존재하지 않는 "존재하지 않는 텍스트"를 찾으세요
    // TODO: 두 결과가 모두 null인지 확인하세요
    // TODO: 첫 번째 결과가 DOM에 존재하지 않는지 확인하세요 (not.toBeInTheDocument 사용)
  });

  // 🎯 실습 12: 조건부 렌더링 테스트
  it("조건부 렌더링을 queryByRole로 테스트할 수 있다", () => {
    // TODO: ConditionalComponent를 show={false}로 렌더링하고 rerender 함수를 구조분해할당으로 가져오세요
    // TODO: queryByRole을 사용해서 "banner" role을 찾으세요
    // TODO: 찾은 요소가 DOM에 존재하지 않는지 확인하세요
    // TODO: rerender를 사용해서 ConditionalComponent를 show={true}로 다시 렌더링하세요
    // TODO: getByRole을 사용해서 "banner" role을 찾으세요
    // TODO: 이제 요소가 DOM에 존재하는지 확인하세요
  });

  // 🎯 실습 13: 요소 제거 테스트
  it("요소가 사라지는 것을 queryByRole로 확인할 수 있다", () => {
    // TODO: ConditionalComponent를 show={true}로 렌더링하고 rerender 함수를 구조분해할당으로 가져오세요
    // TODO: getByRole을 사용해서 "banner" role을 찾고 DOM에 존재하는지 확인하세요
    // TODO: rerender를 사용해서 ConditionalComponent를 show={false}로 다시 렌더링하세요
    // TODO: queryByRole을 사용해서 "banner" role을 찾고 DOM에 존재하지 않는지 확인하세요
  });

  // 🎯 실습 14: 항상 존재하는 요소와 조건부 요소 구분
  it("항상 존재하는 요소와 조건부 요소를 구분할 수 있다", () => {
    // TODO: ConditionalComponent를 show={false}로 렌더링하세요
    // TODO: getByRole을 사용해서 "main" role을 찾고 DOM에 존재하는지 확인하세요
    // TODO: queryByRole을 사용해서 "banner" role을 찾고 DOM에 존재하지 않는지 확인하세요
  });
});

describe("findBy* 실습", () => {
  // 🎯 실습 15: 비동기 요소 찾기
  it("비동기적으로 나타나는 요소를 findByRole로 찾을 수 있다", async () => {
    // TODO: AsyncComponent를 delay={100}으로 렌더링하세요
    // TODO: getByRole을 사용해서 "status" role을 찾고 DOM에 존재하는지 확인하세요
    // TODO: findByRole을 사용해서 "article" role을 찾으세요 (await 사용)
    // TODO: 찾은 요소가 DOM에 존재하는지 확인하세요
    // TODO: 찾은 요소의 텍스트가 "비동기 데이터가 로드되었습니다!"인지 확인하세요
    // TODO: queryByRole을 사용해서 "status" role이 DOM에 존재하지 않는지 확인하세요
  });

  // 🎯 실습 16: 타이머 기반 요소 찾기
  it("타이머로 지연된 요소를 findByRole로 찾을 수 있다", async () => {
    // TODO: TimerComponent를 렌더링하세요
    // TODO: getByRole을 사용해서 "main" role을 찾고 DOM에 존재하는지 확인하세요
    // TODO: findByRole을 사용해서 "banner" role을 찾으세요 (await 사용)
    // 힌트: findByRole("banner", {}, { timeout: 3000 }) 형태로 타임아웃을 늘려보세요
    // TODO: 찾은 요소가 DOM에 존재하는지 확인하세요
    // TODO: 찾은 요소의 텍스트가 "2초 후 표시되는 요소"인지 확인하세요
  }, 10000); // 타임아웃을 10초로 설정 (2초 + 여유시간)

  // 🎯 실습 17: 에러 상태 변화 테스트
  it("에러 상태로 변화하는 것을 findByRole로 확인할 수 있다", async () => {
    // TODO: ErrorComponent를 shouldError={true}로 렌더링하세요
    // TODO: findByRole을 사용해서 "alert" role을 찾으세요 (await 사용)
    // TODO: 찾은 요소가 DOM에 존재하는지 확인하세요
    // TODO: 찾은 요소의 텍스트가 "에러가 발생했습니다!"인지 확인하세요
    // TODO: queryByRole을 사용해서 "main" role이 DOM에 존재하지 않는지 확인하세요
  });

  // 🎯 실습 18: 여러 비동기 요소 찾기
  it("여러 비동기 요소를 동시에 기다릴 수 있다", async () => {
    // TODO: AsyncComponent를 delay={100}으로 렌더링하세요
    // TODO: Promise.all과 findByRole을 사용해서 "article"과 "alert" role을 동시에 찾으세요
    // TODO: 두 요소가 모두 DOM에 존재하는지 확인하세요
  });

  // 🎯 실습 19: findByRole 타임아웃 테스트
  it("findByRole는 타임아웃이 있다", async () => {
    // TODO: AsyncComponent를 delay={3000}으로 렌더링하세요
    // TODO: expect와 findByRole을 사용해서 "article" role 찾기가 에러를 던지는지 확인하세요
    // 힌트: await expect(screen.findByRole("article")).rejects.toThrow() 형태를 사용하세요
  });
});

describe("다양한 쿼리 타입 실습", () => {
  // 🎯 실습 20: 폼 요소 테스트
  it("폼 요소를 다양한 쿼리로 찾을 수 있다", () => {
    // TODO: FormComponent를 렌더링하세요
    // TODO: getByRole을 사용해서 "form" role을 찾으세요
    // TODO: getAllByRole을 사용해서 "textbox" role을 가진 모든 요소를 찾으세요
    // TODO: getByRole을 사용해서 "button" role을 찾으세요
    // TODO: 폼이 DOM에 존재하는지 확인하세요
    // TODO: textbox가 2개인지 확인하세요
    // TODO: 버튼의 텍스트가 "제출"인지 확인하세요
    // TODO: getByLabelText를 사용해서 "이름:" 라벨과 연결된 입력 필드를 찾으세요
    // TODO: getByLabelText를 사용해서 "이메일:" 라벨과 연결된 입력 필드를 찾으세요
    // TODO: 두 입력 필드가 모두 DOM에 존재하는지 확인하세요
  });

  // 🎯 실습 21: 리스트 요소 테스트
  it("리스트 요소를 role로 찾을 수 있다", () => {
    // TODO: ListComponent를 렌더링하세요
    // TODO: getByRole을 사용해서 "heading" role을 찾으세요
    // TODO: getByRole을 사용해서 "list" role을 찾으세요
    // TODO: getAllByRole을 사용해서 "listitem" role을 가진 모든 요소를 찾으세요
    // TODO: 제목의 텍스트가 "항목 목록"인지 확인하세요
    // TODO: 리스트가 DOM에 존재하는지 확인하세요
    // TODO: 리스트 항목이 3개인지 확인하세요
    // TODO: 첫 번째 항목의 텍스트가 "첫 번째 항목"인지 확인하세요
  });

  // 🎯 실습 22: 네비게이션 요소 테스트
  it("네비게이션 요소를 role로 찾을 수 있다", () => {
    // TODO: NavigationComponent를 렌더링하세요
    // TODO: getByRole을 사용해서 "navigation" role을 찾으세요
    // TODO: getAllByRole을 사용해서 "link" role을 가진 모든 요소를 찾으세요
    // TODO: 네비게이션이 DOM에 존재하는지 확인하세요
    // TODO: 링크가 3개인지 확인하세요
    // TODO: 첫 번째 링크의 텍스트가 "홈"인지 확인하세요
    // TODO: 두 번째 링크의 텍스트가 "소개"인지 확인하세요
    // TODO: 세 번째 링크의 텍스트가 "연락처"인지 확인하세요
  });

  // 🎯 실습 23: queryByText와 queryByRole 혼합 사용
  it("queryByText와 queryByRole을 혼합해서 사용할 수 있다", () => {
    // TODO: MultipleElementsComponent를 렌더링하세요
    // TODO: queryByText를 사용해서 "정보 텍스트"를 찾으세요
    // TODO: queryByRole을 사용해서 "첫 번째 버튼" 텍스트를 가진 button role을 찾으세요
    // 힌트: { name: "첫 번째 버튼" } 옵션을 사용하세요
    // TODO: 두 요소가 모두 DOM에 존재하는지 확인하세요
    // TODO: queryByText를 사용해서 "존재하지 않는 텍스트"를 찾으세요
    // TODO: queryByRole을 사용해서 "textbox" role을 찾으세요
    // TODO: 두 요소가 모두 DOM에 존재하지 않는지 확인하세요
  });
});

describe("통합 실습", () => {
  // 🎯 실습 24: 복합 조건 테스트
  it("복잡한 조건을 가진 컴포넌트를 테스트할 수 있다", async () => {
    // TODO: AsyncComponent를 delay={100}으로 렌더링하세요
    // TODO: getByRole을 사용해서 "status" role을 찾고 DOM에 존재하는지 확인하세요
    // TODO: waitFor를 사용해서 "status" role이 DOM에서 사라질 때까지 기다리세요
    // TODO: getByRole을 사용해서 "article"과 "alert" role을 찾으세요
    // TODO: 두 요소가 모두 DOM에 존재하는지 확인하세요
  });

  // 🎯 실습 25: 에러 처리와 성공 케이스
  it("에러와 성공 케이스를 모두 테스트할 수 있다", async () => {
    // TODO: ErrorComponent를 shouldError={false}로 렌더링하고 rerender 함수를 구조분해할당으로 가져오세요
    // TODO: getByRole을 사용해서 "main" role을 찾고 DOM에 존재하는지 확인하세요
    // TODO: rerender를 사용해서 ErrorComponent를 shouldError={true}로 다시 렌더링하세요
    // TODO: findByRole을 사용해서 "alert" role을 찾으세요 (await 사용)
    // TODO: 찾은 요소가 DOM에 존재하는지 확인하세요
  });

  // 🎯 실습 26: 다양한 role 타입 테스트
  it("다양한 role 타입을 테스트할 수 있다", () => {
    // TODO: FormComponent를 렌더링하세요
    // TODO: getByRole을 사용해서 "form" role을 찾고 DOM에 존재하는지 확인하세요
    // TODO: getAllByRole을 사용해서 "textbox" role을 찾고 개수가 2개인지 확인하세요
    // TODO: getByRole을 사용해서 "button" role을 찾고 DOM에 존재하는지 확인하세요
    // TODO: getByRole을 사용해서 "status" role을 찾고 DOM에 존재하는지 확인하세요
  });
});

/**
 * 💡 실습에서 사용할 주요 API들:
 *
 * 🔍 쿼리 메서드 (우선순위 순):
 * - render(<Component />) - 컴포넌트를 가상 DOM에 렌더링
 * - screen.getByRole("role") - role로 요소 찾기 (가장 권장)
 * - screen.getByRole("role", { name: "텍스트" }) - role과 텍스트로 요소 찾기
 * - screen.getByLabelText("라벨") - 라벨과 연결된 요소 찾기
 * - screen.getByPlaceholderText("플레이스홀더") - 플레이스홀더로 요소 찾기
 * - screen.getByText("텍스트") - 텍스트로 요소 찾기
 * - screen.getByDisplayValue("값") - 입력값으로 요소 찾기
 * - screen.getByTestId("testid") - data-testid로 요소 찾기 (마지막 수단)
 * - screen.queryByRole("role") - role로 요소 찾기 (없으면 null)
 * - screen.queryByText("텍스트") - 텍스트로 요소 찾기 (없으면 null)
 * - screen.findByRole("role") - 비동기적으로 role로 요소 찾기
 * - screen.findByText("텍스트") - 비동기적으로 텍스트로 요소 찾기
 * - screen.getAllByRole("role") - 특정 role을 가진 모든 요소 찾기
 *
 * ✅ Assertion 메서드:
 * - expect(element).toBeInTheDocument() - 요소가 DOM에 있는지 확인
 * - expect(element).toBeDisabled() - 요소가 비활성화되어 있는지 확인
 * - expect(element).toHaveTextContent("텍스트") - 텍스트 내용 확인
 * - expect(element).toHaveClass("클래스명") - CSS 클래스 확인
 * - expect(element).not.toBeInTheDocument() - 요소가 DOM에 없는지 확인
 * - expect(() => function()).toThrow() - 함수가 에러를 던지는지 확인
 * - await expect(promise).rejects.toThrow() - 비동기 함수가 에러를 던지는지 확인
 * - expect(array).toHaveLength(number) - 배열의 길이 확인
 *
 * 🔄 비동기 처리:
 * - waitFor(() => expect()) - 조건이 만족될 때까지 기다림
 * - await screen.findBy*() - 요소가 나타날 때까지 기다림
 *
 * 📝 컴포넌트 사용법:
 * - <ConditionalComponent show={true/false} />
 * - <AsyncComponent delay={1000} />
 * - <ErrorComponent shouldError={true/false} />
 * - <MultipleElementsComponent />
 * - <TimerComponent />
 * - <FormComponent />
 * - <ListComponent />
 * - <NavigationComponent />
 *
 * 🎯 쿼리 우선순위 가이드:
 * 1. getByRole (가장 권장 - 접근성 고려)
 * 2. getByLabelText (폼 요소)
 * 3. getByPlaceholderText (플레이스홀더)
 * 4. getByText (텍스트 내용)
 * 5. getByDisplayValue (입력값)
 * 6. getByTestId (마지막 수단)
 *
 * 💡 여러 요소가 있을 때:
 * - getByRole("button", { name: "특정 텍스트" }) - 특정 텍스트를 가진 요소 찾기
 * - getAllByRole("button") - 모든 버튼 찾기
 * - getByTestId("specific-id") - 특정 testid로 찾기
 */
