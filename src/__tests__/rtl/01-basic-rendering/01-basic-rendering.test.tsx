/**
 * React Testing Library 기본 사용법 - 1단계: 렌더링과 기본 쿼리
 *
 * 학습 목표:
 * 1. 컴포넌트 렌더링 (render)
 * 2. 기본 쿼리 메서드들 (getBy*, queryBy*, findBy*)
 * 3. 텍스트 기반 선택
 * 4. 쿼리 우선순위: getByRole > getByLabelText > getByPlaceholderText > getByText > getByDisplayValue > getByTestId
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

describe("RTL 기본 사용법 - Button 컴포넌트", () => {
  // 1. 기본 렌더링과 텍스트 찾기
  it("버튼이 렌더링되고 텍스트를 찾을 수 있다", () => {
    // 컴포넌트를 DOM에 렌더링
    render(<Button>Click me</Button>);

    // getByRole: 접근성 role로 요소 찾기 (가장 권장)
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  // 2. role로 요소 찾기
  it("버튼을 role로 찾을 수 있다", () => {
    render(<Button>Submit</Button>);

    // getByRole: 접근성 role로 요소 찾기
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");
  });

  // 3. testid로 요소 찾기 (마지막 수단)
  it("testid로 버튼을 찾을 수 있다", () => {
    render(<Button data-testid="my-button">Test Button</Button>);

    // getByTestId: data-testid 속성으로 요소 찾기 (다른 방법이 없을 때만 사용)
    const button = screen.getByTestId("my-button");
    expect(button).toBeInTheDocument();
  });

  // 4. 요소의 속성 확인
  it("버튼의 속성을 확인할 수 있다", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button");

    // 버튼이 비활성화되어 있는지 확인
    expect(button).toBeDisabled();

    // CSS 클래스 확인 (부분 매칭)
    expect(button).toHaveClass("px-4", "py-2", "rounded");
  });

  // 5. queryBy와 getBy의 차이
  it("존재하지 않는 요소는 queryBy로 확인한다", () => {
    render(<Button>Only Button</Button>);

    // getByRole: 없으면 에러 발생
    // queryByRole: 없으면 null 반환
    const nonExistentElement = screen.queryByRole("textbox");
    expect(nonExistentElement).not.toBeInTheDocument();

    // 아래 코드는 에러를 발생시킴 (주석 처리)
    // expect(() => screen.getByRole('textbox')).toThrow();
  });
});

describe("getBy* 실습", () => {
  // 1. 기본 getByRole 사용법
  it("존재하는 요소를 getByRole로 찾을 수 있다", () => {
    render(<MultipleElementsComponent />);

    // getByRole로 버튼 찾기 (첫 번째 버튼)
    const firstButton = screen.getByRole("button", { name: "첫 번째 버튼" });
    const article = screen.getByRole("article");

    expect(firstButton).toBeInTheDocument();
    expect(article).toBeInTheDocument();
    expect(firstButton).toHaveTextContent("첫 번째 버튼");
  });

  // 2. getByRole로 여러 요소 중 첫 번째 찾기
  it("여러 요소가 있을 때 getByRole는 첫 번째 요소를 찾는다", () => {
    render(<MultipleElementsComponent />);

    // 여러 버튼이 있지만 첫 번째 버튼만 찾음 (name으로 구분)
    const button = screen.getByRole("button", { name: "첫 번째 버튼" });
    expect(button).toHaveTextContent("첫 번째 버튼");
  });

  // 3. getByText 사용법 (텍스트로 찾기)
  it("텍스트로 요소를 찾을 수 있다", () => {
    render(<MultipleElementsComponent />);

    // getByText로 텍스트 기반 찾기
    const infoText = screen.getByText("정보 텍스트");
    const label = screen.getByText("라벨");

    expect(infoText).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  // 4. getByRole로 존재하지 않는 요소 찾기 (에러 발생)
  it("존재하지 않는 요소를 getByRole로 찾으면 에러가 발생한다", () => {
    render(<MultipleElementsComponent />);

    // 존재하지 않는 요소를 찾으면 에러 발생
    expect(() => screen.getByRole("textbox")).toThrow();
    expect(() => screen.getByText("존재하지 않는 텍스트")).toThrow();
  });

  // 5. getByRole로 조건부 요소 찾기
  it("조건부로 렌더링되는 요소를 getByRole로 찾을 수 있다", () => {
    render(<ConditionalComponent show={true} />);

    // 조건부 요소가 렌더링되었을 때 찾기
    const conditionalElement = screen.getByRole("banner");
    expect(conditionalElement).toBeInTheDocument();
    expect(conditionalElement).toHaveTextContent("조건부 요소");
  });
});

describe("queryBy* 실습", () => {
  // 1. 안전한 요소 확인
  it("존재하지 않는 요소를 queryByRole로 안전하게 확인할 수 있다", () => {
    render(<MultipleElementsComponent />);

    // queryByRole는 요소가 없어도 에러를 발생시키지 않음
    const nonExistentElement = screen.queryByRole("textbox");
    const nonExistentText = screen.queryByText("존재하지 않는 텍스트");

    expect(nonExistentElement).toBeNull();
    expect(nonExistentText).toBeNull();
    expect(nonExistentElement).not.toBeInTheDocument();
  });

  // 2. 조건부 렌더링 테스트
  it("조건부 렌더링을 queryByRole로 테스트할 수 있다", () => {
    const { rerender } = render(<ConditionalComponent show={false} />);

    // 요소가 렌더링되지 않았을 때
    const conditionalElement = screen.queryByRole("banner");
    expect(conditionalElement).not.toBeInTheDocument();

    // 조건을 변경하여 다시 렌더링
    rerender(<ConditionalComponent show={true} />);

    // 이제 요소가 존재함
    const newConditionalElement = screen.getByRole("banner");
    expect(newConditionalElement).toBeInTheDocument();
  });

  // 3. 요소 제거 테스트
  it("요소가 사라지는 것을 queryByRole로 확인할 수 있다", () => {
    const { rerender } = render(<ConditionalComponent show={true} />);

    // 처음에는 요소가 존재
    expect(screen.getByRole("banner")).toBeInTheDocument();

    // 조건을 false로 변경
    rerender(<ConditionalComponent show={false} />);

    // 이제 요소가 사라짐
    expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  });

  // 4. 항상 존재하는 요소와 조건부 요소 구분
  it("항상 존재하는 요소와 조건부 요소를 구분할 수 있다", () => {
    render(<ConditionalComponent show={false} />);

    // 항상 존재하는 요소는 getByRole로 찾기
    const alwaysPresent = screen.getByRole("main");
    expect(alwaysPresent).toBeInTheDocument();

    // 조건부 요소는 queryByRole로 안전하게 확인
    const conditionalElement = screen.queryByRole("banner");
    expect(conditionalElement).not.toBeInTheDocument();
  });
});

describe("findBy* 실습", () => {
  // 1. 비동기 요소 찾기
  it("비동기적으로 나타나는 요소를 findByRole로 찾을 수 있다", async () => {
    render(<AsyncComponent delay={100} />);

    // 처음에는 로딩 상태
    expect(screen.getByRole("status")).toBeInTheDocument();

    // 비동기적으로 로드된 콘텐츠를 기다림
    const loadedContent = await screen.findByRole("article");
    expect(loadedContent).toBeInTheDocument();
    expect(loadedContent).toHaveTextContent("비동기 데이터가 로드되었습니다!");

    // 로딩 상태는 사라짐
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  // 2. 타이머 기반 요소 찾기
  it("타이머로 지연된 요소를 findByRole로 찾을 수 있다", async () => {
    render(<TimerComponent />);

    // 즉시 표시되는 요소
    expect(screen.getByRole("main")).toBeInTheDocument();

    // 지연된 요소를 기다림 (2초 후 나타남)
    const delayedElement = await screen.findByRole("banner", {}, { timeout: 3000 });
    expect(delayedElement).toBeInTheDocument();
    expect(delayedElement).toHaveTextContent("2초 후 표시되는 요소");
  }, 10000); // 타임아웃을 10초로 설정 (2초 + 여유시간)

  // 3. 에러 상태 변화 테스트
  it("에러 상태로 변화하는 것을 findByRole로 확인할 수 있다", async () => {
    render(<ErrorComponent shouldError={true} />);

    // 에러 메시지가 나타날 때까지 기다림 (500ms 후)
    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("에러가 발생했습니다!");

    // 정상 콘텐츠는 사라짐
    expect(screen.queryByRole("main")).not.toBeInTheDocument();
  });

  // 4. 여러 비동기 요소 찾기
  it("여러 비동기 요소를 동시에 기다릴 수 있다", async () => {
    render(<AsyncComponent delay={100} />);

    // 여러 요소를 동시에 기다림
    const [loadedContent, successMessage] = await Promise.all([
      screen.findByRole("article"),
      screen.findByRole("alert"),
    ]);

    expect(loadedContent).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
  });

  // 5. findByRole 타임아웃 테스트
  it("findByRole는 타임아웃이 있다", async () => {
    render(<AsyncComponent delay={3000} />);

    // 기본 타임아웃(1000ms)보다 긴 지연시간
    await expect(screen.findByRole("article")).rejects.toThrow();
  });
});

describe("다양한 쿼리 타입 실습", () => {
  // 1. 폼 요소 테스트
  it("폼 요소를 다양한 쿼리로 찾을 수 있다", () => {
    render(<FormComponent />);

    // getByRole로 폼과 입력 필드 찾기
    const form = screen.getByRole("form");
    const textboxes = screen.getAllByRole("textbox");
    const submitButton = screen.getByRole("button");

    expect(form).toBeInTheDocument();
    expect(textboxes).toHaveLength(2);
    expect(submitButton).toHaveTextContent("제출");

    // getByLabelText로 라벨과 연결된 입력 필드 찾기
    const nameInput = screen.getByLabelText("이름:");
    const emailInput = screen.getByLabelText("이메일:");

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
  });

  // 2. 리스트 요소 테스트
  it("리스트 요소를 role로 찾을 수 있다", () => {
    render(<ListComponent />);

    // getByRole로 리스트와 항목들 찾기
    const heading = screen.getByRole("heading");
    const list = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    expect(heading).toHaveTextContent("항목 목록");
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent("첫 번째 항목");
  });

  // 3. 네비게이션 요소 테스트
  it("네비게이션 요소를 role로 찾을 수 있다", () => {
    render(<NavigationComponent />);

    // getByRole로 네비게이션과 링크들 찾기
    const navigation = screen.getByRole("navigation");
    const links = screen.getAllByRole("link");

    expect(navigation).toBeInTheDocument();
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveTextContent("홈");
    expect(links[1]).toHaveTextContent("소개");
    expect(links[2]).toHaveTextContent("연락처");
  });

  // 4. queryByText와 queryByRole 혼합 사용
  it("queryByText와 queryByRole을 혼합해서 사용할 수 있다", () => {
    render(<MultipleElementsComponent />);

    // 존재하는 요소들
    const infoText = screen.queryByText("정보 텍스트");
    const button = screen.queryByRole("button", { name: "첫 번째 버튼" });

    expect(infoText).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    // 존재하지 않는 요소들
    const nonExistentText = screen.queryByText("존재하지 않는 텍스트");
    const nonExistentRole = screen.queryByRole("textbox");

    expect(nonExistentText).not.toBeInTheDocument();
    expect(nonExistentRole).not.toBeInTheDocument();
  });
});

describe("통합 실습", () => {
  // 1. 복합 조건 테스트
  it("복잡한 조건을 가진 컴포넌트를 테스트할 수 있다", async () => {
    render(<AsyncComponent delay={100} />);

    // 로딩 상태 확인
    expect(screen.getByRole("status")).toBeInTheDocument();

    // 로딩 완료 후 콘텐츠 확인
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    const loadedContent = screen.getByRole("article");
    const successMessage = screen.getByRole("alert");

    expect(loadedContent).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
  });

  // 2. 에러 처리와 성공 케이스
  it("에러와 성공 케이스를 모두 테스트할 수 있다", async () => {
    // 성공 케이스
    const { rerender } = render(<ErrorComponent shouldError={false} />);
    expect(screen.getByRole("main")).toBeInTheDocument();

    // 에러 케이스로 변경
    rerender(<ErrorComponent shouldError={true} />);

    const errorMessage = await screen.findByRole("alert");
    expect(errorMessage).toBeInTheDocument();
  });

  // 3. 다양한 role 타입 테스트
  it("다양한 role 타입을 테스트할 수 있다", () => {
    render(<FormComponent />);

    // 다양한 role 확인
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

/**
 * 💡 학습 포인트:
 *
 * 1. render() - 컴포넌트를 가상 DOM에 렌더링
 * 2. screen - 렌더링된 컴포넌트에서 요소를 찾는 객체
 * 3. getByRole() - 접근성 role로 찾기 (가장 권장)
 * 4. getByText() - 텍스트로 요소 찾기
 * 5. getByLabelText() - 라벨과 연결된 요소 찾기
 * 6. getByTestId() - data-testid로 찾기 (마지막 수단)
 * 7. queryBy* - 요소가 없을 때 null 반환 (에러 X)
 * 8. findBy* - 비동기적으로 나타나는 요소 찾기
 * 9. expect().toBeInTheDocument() - 요소가 DOM에 있는지 확인
 * 10. expect().toBeDisabled() - 요소가 비활성화되어 있는지 확인
 * 11. expect().toHaveTextContent() - 텍스트 내용 확인
 * 12. expect().toHaveClass() - CSS 클래스 확인
 * 13. waitFor() - 비동기 작업 완료 대기
 *
 * 🎯 쿼리 우선순위:
 * 1. getByRole (가장 권장 - 접근성 고려)
 * 2. getByLabelText (폼 요소)
 * 3. getByPlaceholderText (플레이스홀더)
 * 4. getByText (텍스트 내용)
 * 5. getByDisplayValue (입력값)
 * 6. getByTestId (마지막 수단)
 */
