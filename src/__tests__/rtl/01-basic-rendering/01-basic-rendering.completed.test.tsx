/**
 * React Testing Library 기본 사용법 - 1단계: 렌더링과 기본 쿼리 (정답)
 *
 * 학습 목표:
 * 1. 컴포넌트 렌더링 (render)
 * 2. 기본 쿼리 메서드들 (getBy*, queryBy*, findBy*)
 * 3. 텍스트 기반 선택
 * 4. 쿼리 우선순위: getByRole > getByLabelText > getByPlaceholderText > getByText > getByDisplayValue > getByTestId
 *
 * ✅ 실습 과제 정답:
 * - 실습용 템플릿의 완성된 버전입니다
 * - 각 테스트의 올바른 구현을 확인하세요
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

describe("RTL 기본 사용법 - Button 컴포넌트 (정답)", () => {
  // ✅ 정답 1: 기본 렌더링과 role 찾기
  it("버튼이 렌더링되고 role로 찾을 수 있다", () => {
    // ✅ Button 컴포넌트를 "Click me" 텍스트로 렌더링
    render(<Button>Click me</Button>);

    // ✅ getByRole을 사용해서 "button" role을 가진 요소를 찾기
    const button = screen.getByRole("button");

    // ✅ 버튼이 DOM에 존재하는지 확인
    expect(button).toBeInTheDocument();
    // ✅ 버튼의 텍스트가 "Click me"인지 확인
    expect(button).toHaveTextContent("Click me");
  });

  // ✅ 정답 2: role로 요소 찾기
  it("버튼을 role로 찾을 수 있다", () => {
    render(<Button>Submit</Button>);

    // ✅ getByRole을 사용해서 button role을 가진 요소를 찾기
    const button = screen.getByRole("button");

    // ✅ 버튼이 DOM에 존재하는지 확인
    expect(button).toBeInTheDocument();

    // ✅ 버튼의 텍스트 내용이 "Submit"인지 확인
    expect(button).toHaveTextContent("Submit");
  });

  // ✅ 정답 3: testid로 요소 찾기 (마지막 수단)
  it("testid로 버튼을 찾을 수 있다", () => {
    // ✅ Button 컴포넌트를 data-testid="my-button"과 "Test Button" 텍스트로 렌더링
    render(<Button data-testid="my-button">Test Button</Button>);

    // ✅ getByTestId를 사용해서 "my-button" testid를 가진 요소를 찾기
    const button = screen.getByTestId("my-button");

    // ✅ 버튼이 DOM에 존재하는지 확인
    expect(button).toBeInTheDocument();
  });

  // ✅ 정답 4: 요소의 속성 확인
  it("버튼의 속성을 확인할 수 있다", () => {
    // ✅ 비활성화된 Button 컴포넌트를 "Disabled Button" 텍스트로 렌더링
    render(<Button disabled>Disabled Button</Button>);

    // ✅ getByRole을 사용해서 버튼을 찾기
    const button = screen.getByRole("button");

    // ✅ 버튼이 비활성화되어 있는지 확인
    expect(button).toBeDisabled();

    // ✅ 버튼이 특정 CSS 클래스들을 가지고 있는지 확인
    expect(button).toHaveClass("px-4", "py-2", "rounded");
  });

  // ✅ 정답 5: queryBy와 getBy의 차이
  it("존재하지 않는 요소는 queryBy로 확인한다", () => {
    render(<Button>Only Button</Button>);

    // ✅ queryByRole을 사용해서 존재하지 않는 "textbox" role을 찾기
    const nonExistentElement = screen.queryByRole("textbox");

    // ✅ 찾은 요소가 DOM에 존재하지 않는지 확인
    expect(nonExistentElement).not.toBeInTheDocument();

    // 💡 참고: 아래 코드는 에러를 발생시킵니다 (주석 처리)
    // expect(() => screen.getByRole('textbox')).toThrow();
  });
});

describe("getBy* 실습 (정답)", () => {
  // ✅ 정답 6: 기본 getByRole 사용법
  it("존재하는 요소를 getByRole로 찾을 수 있다", () => {
    render(<MultipleElementsComponent />);

    // ✅ getByRole을 사용해서 "첫 번째 버튼" 텍스트를 가진 button role을 찾기
    const firstButton = screen.getByRole("button", { name: "첫 번째 버튼" });
    // ✅ getByRole을 사용해서 "article" role을 가진 요소를 찾기
    const article = screen.getByRole("article");

    // ✅ 두 요소가 모두 DOM에 존재하는지 확인
    expect(firstButton).toBeInTheDocument();
    expect(article).toBeInTheDocument();
    // ✅ 버튼의 텍스트가 "첫 번째 버튼"인지 확인
    expect(firstButton).toHaveTextContent("첫 번째 버튼");
  });

  // ✅ 정답 7: 여러 요소 중 첫 번째 찾기
  it("여러 요소가 있을 때 getByRole는 첫 번째 요소를 찾는다", () => {
    render(<MultipleElementsComponent />);

    // ✅ getByRole을 사용해서 "첫 번째 버튼" 텍스트를 가진 button role을 찾기
    const button = screen.getByRole("button", { name: "첫 번째 버튼" });
    // ✅ 찾은 버튼의 텍스트가 "첫 번째 버튼"인지 확인
    expect(button).toHaveTextContent("첫 번째 버튼");
  });

  // ✅ 정답 8: getByText 사용법
  it("텍스트로 요소를 찾을 수 있다", () => {
    render(<MultipleElementsComponent />);

    // ✅ getByText를 사용해서 "정보 텍스트"를 찾기
    const infoText = screen.getByText("정보 텍스트");
    // ✅ getByText를 사용해서 "라벨"을 찾기
    const label = screen.getByText("라벨");

    // ✅ 두 요소가 모두 DOM에 존재하는지 확인
    expect(infoText).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  // ✅ 정답 9: getByRole로 존재하지 않는 요소 찾기 (에러 발생)
  it("존재하지 않는 요소를 getByRole로 찾으면 에러가 발생한다", () => {
    render(<MultipleElementsComponent />);

    // ✅ expect와 화살표 함수를 사용해서 getByRole("textbox")가 에러를 던지는지 확인
    expect(() => screen.getByRole("textbox")).toThrow();
    // ✅ expect와 화살표 함수를 사용해서 getByText("존재하지 않는 텍스트")가 에러를 던지는지 확인
    expect(() => screen.getByText("존재하지 않는 텍스트")).toThrow();
  });

  // ✅ 정답 10: 조건부 요소 찾기
  it("조건부로 렌더링되는 요소를 getByRole로 찾을 수 있다", () => {
    // ✅ ConditionalComponent를 show={true}로 렌더링
    render(<ConditionalComponent show={true} />);

    // ✅ getByRole을 사용해서 "banner" role을 가진 요소를 찾기
    const conditionalElement = screen.getByRole("banner");
    // ✅ 찾은 요소가 DOM에 존재하는지 확인
    expect(conditionalElement).toBeInTheDocument();
    // ✅ 찾은 요소의 텍스트가 "조건부 요소"인지 확인
    expect(conditionalElement).toHaveTextContent("조건부 요소");
  });
});

describe("queryBy* 실습 (정답)", () => {
  // ✅ 정답 11: 안전한 요소 확인
  it("존재하지 않는 요소를 queryByRole로 안전하게 확인할 수 있다", () => {
    render(<MultipleElementsComponent />);

    // ✅ queryByRole을 사용해서 존재하지 않는 "textbox" role을 찾기
    const nonExistentElement = screen.queryByRole("textbox");
    // ✅ queryByText를 사용해서 존재하지 않는 "존재하지 않는 텍스트"를 찾기
    const nonExistentText = screen.queryByText("존재하지 않는 텍스트");

    // ✅ 두 결과가 모두 null인지 확인
    expect(nonExistentElement).toBeNull();
    expect(nonExistentText).toBeNull();
    // ✅ 첫 번째 결과가 DOM에 존재하지 않는지 확인
    expect(nonExistentElement).not.toBeInTheDocument();
  });

  // ✅ 정답 12: 조건부 렌더링 테스트
  it("조건부 렌더링을 queryByRole로 테스트할 수 있다", () => {
    // ✅ ConditionalComponent를 show={false}로 렌더링하고 rerender 함수를 구조분해할당으로 가져오기
    const { rerender } = render(<ConditionalComponent show={false} />);

    // ✅ queryByRole을 사용해서 "banner" role을 찾기
    const conditionalElement = screen.queryByRole("banner");
    // ✅ 찾은 요소가 DOM에 존재하지 않는지 확인
    expect(conditionalElement).not.toBeInTheDocument();

    // ✅ rerender를 사용해서 ConditionalComponent를 show={true}로 다시 렌더링
    rerender(<ConditionalComponent show={true} />);

    // ✅ getByRole을 사용해서 "banner" role을 찾기
    const newConditionalElement = screen.getByRole("banner");
    // ✅ 이제 요소가 DOM에 존재하는지 확인
    expect(newConditionalElement).toBeInTheDocument();
  });

  // ✅ 정답 13: 요소 제거 테스트
  it("요소가 사라지는 것을 queryByRole로 확인할 수 있다", () => {
    // ✅ ConditionalComponent를 show={true}로 렌더링하고 rerender 함수를 구조분해할당으로 가져오기
    const { rerender } = render(<ConditionalComponent show={true} />);

    // ✅ getByRole을 사용해서 "banner" role을 찾고 DOM에 존재하는지 확인
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // ✅ rerender를 사용해서 ConditionalComponent를 show={false}로 다시 렌더링
    rerender(<ConditionalComponent show={false} />);

    // ✅ queryByRole을 사용해서 "banner" role을 찾고 DOM에 존재하지 않는지 확인
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });

  // ✅ 정답 14: 항상 존재하는 요소와 조건부 요소 구분
  it("항상 존재하는 요소와 조건부 요소를 구분할 수 있다", () => {
    // ✅ ConditionalComponent를 show={false}로 렌더링
    render(<ConditionalComponent show={false} />);

    // ✅ getByRole을 사용해서 "main" role을 찾고 DOM에 존재하는지 확인
    const alwaysPresent = screen.getByRole("main");
    expect(alwaysPresent).toBeInTheDocument();

    // ✅ queryByRole을 사용해서 "banner" role을 찾고 DOM에 존재하지 않는지 확인
    const conditionalElement = screen.queryByRole("banner");
    expect(conditionalElement).not.toBeInTheDocument();
  });
});

describe("findBy* 실습 (정답)", () => {
  // ✅ 정답 15: 비동기 요소 찾기
  it("비동기적으로 나타나는 요소를 findByRole로 찾을 수 있다", async () => {
    // ✅ AsyncComponent를 delay={100}으로 렌더링
    render(<AsyncComponent delay={100} />);

    // ✅ getByRole을 사용해서 "status" role을 찾고 DOM에 존재하는지 확인
    expect(screen.getByRole("status")).toBeInTheDocument();

    // ✅ findByRole을 사용해서 "article" role을 찾기 (await 사용)
    const loadedContent = await screen.findByRole("article");
    // ✅ 찾은 요소가 DOM에 존재하는지 확인
    expect(loadedContent).toBeInTheDocument();
    // ✅ 찾은 요소의 텍스트가 "비동기 데이터가 로드되었습니다!"인지 확인
    expect(loadedContent).toHaveTextContent("비동기 데이터가 로드되었습니다!");

    // ✅ queryByRole을 사용해서 "status" role이 DOM에 존재하지 않는지 확인
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  // ✅ 정답 16: 타이머 기반 요소 찾기
  it("타이머로 지연된 요소를 findByRole로 찾을 수 있다", async () => {
    // ✅ TimerComponent를 렌더링
    render(<TimerComponent />);

    // ✅ getByRole을 사용해서 "main" role을 찾고 DOM에 존재하는지 확인
    expect(screen.getByRole("main")).toBeInTheDocument();

    // ✅ findByRole을 사용해서 "banner" role을 찾기 (await 사용, 타임아웃 3초)
    const delayedElement = await screen.findByRole("banner", {}, { timeout: 3000 });
    // ✅ 찾은 요소가 DOM에 존재하는지 확인
    expect(delayedElement).toBeInTheDocument();
    // ✅ 찾은 요소의 텍스트가 "2초 후 표시되는 요소"인지 확인
    expect(delayedElement).toHaveTextContent("2초 후 표시되는 요소");
  }, 10000); // 타임아웃을 10초로 설정 (2초 + 여유시간)

  // ✅ 정답 17: 에러 상태 변화 테스트
  it("에러 상태로 변화하는 것을 findByRole로 확인할 수 있다", async () => {
    // ✅ ErrorComponent를 shouldError={true}로 렌더링
    render(<ErrorComponent shouldError={true} />);

    // ✅ findByRole을 사용해서 "alert" role을 찾기 (await 사용)
    const errorMessage = await screen.findByRole("alert");
    // ✅ 찾은 요소가 DOM에 존재하는지 확인
    expect(errorMessage).toBeInTheDocument();
    // ✅ 찾은 요소의 텍스트가 "에러가 발생했습니다!"인지 확인
    expect(errorMessage).toHaveTextContent("에러가 발생했습니다!");

    // ✅ queryByRole을 사용해서 "main" role이 DOM에 존재하지 않는지 확인
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
  });

  // ✅ 정답 18: 여러 비동기 요소 찾기
  it("여러 비동기 요소를 동시에 기다릴 수 있다", async () => {
    // ✅ AsyncComponent를 delay={100}으로 렌더링
    render(<AsyncComponent delay={100} />);

    // ✅ Promise.all과 findByRole을 사용해서 "article"과 "alert" role을 동시에 찾기
    const [loadedContent, successMessage] = await Promise.all([
      screen.findByRole("article"),
      screen.findByRole("alert"),
    ]);

    // ✅ 두 요소가 모두 DOM에 존재하는지 확인
    expect(loadedContent).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
  });

  // ✅ 정답 19: findByRole 타임아웃 테스트
  it("findByRole는 타임아웃이 있다", async () => {
    // ✅ AsyncComponent를 delay={3000}으로 렌더링
    render(<AsyncComponent delay={3000} />);

    // ✅ expect와 findByRole을 사용해서 "article" role 찾기가 에러를 던지는지 확인
    await expect(screen.findByRole("article")).rejects.toThrow();
  });
});

describe("다양한 쿼리 타입 실습 (정답)", () => {
  // ✅ 정답 20: 폼 요소 테스트
  it("폼 요소를 다양한 쿼리로 찾을 수 있다", () => {
    // ✅ FormComponent를 렌더링
    render(<FormComponent />);

    // ✅ getByRole을 사용해서 "form" role을 찾기
    const form = screen.getByRole("form");
    // ✅ getAllByRole을 사용해서 "textbox" role을 가진 모든 요소를 찾기
    const textboxes = screen.getAllByRole("textbox");
    // ✅ getByRole을 사용해서 "button" role을 찾기
    const submitButton = screen.getByRole("button");

    // ✅ 폼이 DOM에 존재하는지 확인
    expect(form).toBeInTheDocument();
    // ✅ textbox가 2개인지 확인
    expect(textboxes).toHaveLength(2);
    // ✅ 버튼의 텍스트가 "제출"인지 확인
    expect(submitButton).toHaveTextContent("제출");

    // ✅ getByLabelText를 사용해서 "이름:" 라벨과 연결된 입력 필드를 찾기
    const nameInput = screen.getByLabelText("이름:");
    // ✅ getByLabelText를 사용해서 "이메일:" 라벨과 연결된 입력 필드를 찾기
    const emailInput = screen.getByLabelText("이메일:");

    // ✅ 두 입력 필드가 모두 DOM에 존재하는지 확인
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  // ✅ 정답 21: 리스트 요소 테스트
  it("리스트 요소를 role로 찾을 수 있다", () => {
    // ✅ ListComponent를 렌더링
    render(<ListComponent />);

    // ✅ getByRole을 사용해서 "heading" role을 찾기
    const heading = screen.getByRole("heading");
    // ✅ getByRole을 사용해서 "list" role을 찾기
    const list = screen.getByRole("list");
    // ✅ getAllByRole을 사용해서 "listitem" role을 가진 모든 요소를 찾기
    const listItems = screen.getAllByRole("listitem");

    // ✅ 제목의 텍스트가 "항목 목록"인지 확인
    expect(heading).toHaveTextContent("항목 목록");
    // ✅ 리스트가 DOM에 존재하는지 확인
    expect(list).toBeInTheDocument();
    // ✅ 리스트 항목이 3개인지 확인
    expect(listItems).toHaveLength(3);
    // ✅ 첫 번째 항목의 텍스트가 "첫 번째 항목"인지 확인
    expect(listItems[0]).toHaveTextContent("첫 번째 항목");
  });

  // ✅ 정답 22: 네비게이션 요소 테스트
  it("네비게이션 요소를 role로 찾을 수 있다", () => {
    // ✅ NavigationComponent를 렌더링
    render(<NavigationComponent />);

    // ✅ getByRole을 사용해서 "navigation" role을 찾기
    const navigation = screen.getByRole("navigation");
    // ✅ getAllByRole을 사용해서 "link" role을 가진 모든 요소를 찾기
    const links = screen.getAllByRole("link");

    // ✅ 네비게이션이 DOM에 존재하는지 확인
    expect(navigation).toBeInTheDocument();
    // ✅ 링크가 3개인지 확인
    expect(links).toHaveLength(3);
    // ✅ 첫 번째 링크의 텍스트가 "홈"인지 확인
    expect(links[0]).toHaveTextContent("홈");
    // ✅ 두 번째 링크의 텍스트가 "소개"인지 확인
    expect(links[1]).toHaveTextContent("소개");
    // ✅ 세 번째 링크의 텍스트가 "연락처"인지 확인
    expect(links[2]).toHaveTextContent("연락처");
  });

  // ✅ 정답 23: queryByText와 queryByRole 혼합 사용
  it("queryByText와 queryByRole을 혼합해서 사용할 수 있다", () => {
    // ✅ MultipleElementsComponent를 렌더링
    render(<MultipleElementsComponent />);

    // ✅ queryByText를 사용해서 "정보 텍스트"를 찾기
    const infoText = screen.queryByText("정보 텍스트");
    // ✅ queryByRole을 사용해서 "첫 번째 버튼" 텍스트를 가진 button role을 찾기
    const button = screen.queryByRole("button", { name: "첫 번째 버튼" });

    // ✅ 두 요소가 모두 DOM에 존재하는지 확인
    expect(infoText).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // ✅ queryByText를 사용해서 "존재하지 않는 텍스트"를 찾기
    const nonExistentText = screen.queryByText("존재하지 않는 텍스트");
    // ✅ queryByRole을 사용해서 "textbox" role을 찾기
    const nonExistentRole = screen.queryByRole("textbox");

    // ✅ 두 요소가 모두 DOM에 존재하지 않는지 확인
    expect(nonExistentText).not.toBeInTheDocument();
    expect(nonExistentRole).not.toBeInTheDocument();
  });
});

describe("통합 실습 (정답)", () => {
  // ✅ 정답 24: 복합 조건 테스트
  it("복잡한 조건을 가진 컴포넌트를 테스트할 수 있다", async () => {
    // ✅ AsyncComponent를 delay={100}으로 렌더링
    render(<AsyncComponent delay={100} />);

    // ✅ getByRole을 사용해서 "status" role을 찾고 DOM에 존재하는지 확인
    expect(screen.getByRole("status")).toBeInTheDocument();

    // ✅ waitFor를 사용해서 "status" role이 DOM에서 사라질 때까지 기다리기
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    // ✅ getByRole을 사용해서 "article"과 "alert" role을 찾기
    const loadedContent = screen.getByRole("article");
    const successMessage = screen.getByRole("alert");

    // ✅ 두 요소가 모두 DOM에 존재하는지 확인
    expect(loadedContent).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
  });

  // ✅ 정답 25: 에러 처리와 성공 케이스
  it("에러와 성공 케이스를 모두 테스트할 수 있다", async () => {
    // ✅ ErrorComponent를 shouldError={false}로 렌더링하고 rerender 함수를 구조분해할당으로 가져오기
    const { rerender } = render(<ErrorComponent shouldError={false} />);
    // ✅ getByRole을 사용해서 "main" role을 찾고 DOM에 존재하는지 확인
    expect(screen.getByRole("main")).toBeInTheDocument();

    // ✅ rerender를 사용해서 ErrorComponent를 shouldError={true}로 다시 렌더링
    rerender(<ErrorComponent shouldError={true} />);

    // ✅ findByRole을 사용해서 "alert" role을 찾기 (await 사용)
    const errorMessage = await screen.findByRole("alert");
    // ✅ 찾은 요소가 DOM에 존재하는지 확인
    expect(errorMessage).toBeInTheDocument();
  });

  // ✅ 정답 26: 다양한 role 타입 테스트
  it("다양한 role 타입을 테스트할 수 있다", () => {
    // ✅ FormComponent를 렌더링
    render(<FormComponent />);

    // ✅ getByRole을 사용해서 "form" role을 찾고 DOM에 존재하는지 확인
    expect(screen.getByRole("form")).toBeInTheDocument();
    // ✅ getAllByRole을 사용해서 "textbox" role을 찾고 개수가 2개인지 확인
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    // ✅ getByRole을 사용해서 "button" role을 찾고 DOM에 존재하는지 확인
    expect(screen.getByRole("button")).toBeInTheDocument();
    // ✅ getByRole을 사용해서 "status" role을 찾고 DOM에 존재하는지 확인
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

/**
 * 💡 정답 해설:
 *
 * 🔍 쿼리 선택 가이드:
 * 1. getByRole() - 사용자가 실제로 보는 텍스트로 찾기 (가장 권장)
 * 2. getByLabelText() - 라벨과 연결된 요소 찾기 (폼 요소)
 * 3. getByPlaceholderText() - 플레이스홀더로 요소 찾기
 * 4. getByText() - 텍스트로 요소 찾기
 * 5. getByDisplayValue() - 입력값으로 요소 찾기
 * 6. getByTestId() - data-testid로 찾기 (마지막 수단)
 *
 * ✅ Assertion 패턴:
 * - 요소 존재 확인: toBeInTheDocument()
 * - 요소 상태 확인: toBeDisabled(), toBeEnabled()
 * - 텍스트 확인: toHaveTextContent()
 * - 속성 확인: toHaveClass(), toHaveAttribute()
 * - 부정 확인: not.toBeInTheDocument()
 * - 에러 확인: expect(() => function()).toThrow()
 * - 비동기 에러 확인: await expect(promise).rejects.toThrow()
 * - 배열 길이 확인: toHaveLength()
 *
 * 🔄 비동기 처리 패턴:
 * - findBy*: 요소가 나타날 때까지 기다림 (기본 타임아웃: 1000ms)
 * - waitFor: 조건이 만족될 때까지 기다림
 * - Promise.all: 여러 비동기 작업을 동시에 처리
 *
 * 🚨 주의사항:
 * - getBy*는 요소가 없으면 에러를 던짐
 * - queryBy*는 요소가 없으면 null을 반환
 * - findBy*는 요소가 나타날 때까지 기다림 (타임아웃 있음)
 * - 존재하지 않는 요소를 테스트할 때는 queryBy* 사용
 * - 비동기적으로 나타나는 요소는 findBy* 사용
 * - 쿼리 우선순위를 고려하여 가장 적절한 쿼리 선택
 * - 여러 요소가 있을 때는 name 옵션이나 getAllBy* 사용
 *
 * 🎯 실무 팁:
 * - 사용자 관점에서 테스트 작성
 * - 구현 세부사항보다는 사용자 경험에 집중
 * - testid는 정말 필요할 때만 사용
 * - 비동기 테스트는 적절한 타임아웃 설정
 * - rerender를 활용한 동적 테스트
 * - 접근성을 고려한 role 기반 쿼리 사용
 * - 여러 요소 구분 시 name 옵션 활용
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
