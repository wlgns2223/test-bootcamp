import React, { useState, useEffect } from "react";

// 조건부 렌더링을 위한 컴포넌트
export const ConditionalComponent: React.FC<{ show: boolean }> = ({ show }) => {
  return (
    <div>
      {show && (
        <div role="banner" data-testid="conditional-element">
          조건부 요소
        </div>
      )}
      <div role="main" data-testid="always-present">
        항상 존재하는 요소
      </div>
    </div>
  );
};

// 비동기 로딩을 시뮬레이션하는 컴포넌트
export const AsyncComponent: React.FC<{ delay?: number }> = ({ delay = 1000 }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
      setData("비동기 데이터가 로드되었습니다!");
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isLoaded) {
    return (
      <div role="status" data-testid="loading">
        로딩 중...
      </div>
    );
  }

  return (
    <div>
      <div role="article" data-testid="loaded-content">
        {data}
      </div>
      <div role="alert" data-testid="success-message">
        성공적으로 로드되었습니다!
      </div>
    </div>
  );
};

// 에러 상태를 가진 컴포넌트
export const ErrorComponent: React.FC<{ shouldError?: boolean }> = ({ shouldError = false }) => {
  const [hasError, setHasError] = useState(shouldError);

  useEffect(() => {
    if (shouldError) {
      const timer = setTimeout(() => {
        setHasError(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [shouldError]);

  if (hasError) {
    return (
      <div role="alert" data-testid="error-message">
        에러가 발생했습니다!
      </div>
    );
  }

  return (
    <div role="main" data-testid="normal-content">
      정상 콘텐츠
    </div>
  );
};

// 여러 요소를 가진 컴포넌트
export const MultipleElementsComponent: React.FC = () => {
  return (
    <div>
      <button role="button" data-testid="first-button">
        첫 번째 버튼
      </button>
      <button role="button" data-testid="second-button">
        두 번째 버튼
      </button>
      <button role="button" data-testid="third-button">
        세 번째 버튼
      </button>
      <div role="article" data-testid="info-text">
        정보 텍스트
      </div>
      <span role="text" data-testid="label">
        라벨
      </span>
    </div>
  );
};

// 타이머 기반 요소
export const TimerComponent: React.FC = () => {
  const [showDelayedElement, setShowDelayedElement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDelayedElement(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div role="main" data-testid="immediate-element">
        즉시 표시되는 요소
      </div>
      {showDelayedElement && (
        <div role="banner" data-testid="delayed-element">
          2초 후 표시되는 요소
        </div>
      )}
    </div>
  );
};

// 폼 요소를 가진 컴포넌트 (인터랙션 없이)
export const FormComponent: React.FC = () => {
  return (
    <form role="form">
      <label htmlFor="name">이름:</label>
      <input id="name" type="text" role="textbox" data-testid="name-input" placeholder="이름을 입력하세요" />

      <label htmlFor="email">이메일:</label>
      <input id="email" type="email" role="textbox" data-testid="email-input" placeholder="이메일을 입력하세요" />

      <button type="submit" role="button" data-testid="submit-button">
        제출
      </button>

      <div role="status" data-testid="form-status">
        폼 상태: 준비됨
      </div>
    </form>
  );
};

// 리스트 요소를 가진 컴포넌트
export const ListComponent: React.FC = () => {
  return (
    <div>
      <h2 role="heading">항목 목록</h2>
      <ul role="list">
        <li role="listitem" data-testid="item-1">
          첫 번째 항목
        </li>
        <li role="listitem" data-testid="item-2">
          두 번째 항목
        </li>
        <li role="listitem" data-testid="item-3">
          세 번째 항목
        </li>
      </ul>
      <div role="status" data-testid="list-count">
        총 3개 항목
      </div>
    </div>
  );
};

// 네비게이션 요소를 가진 컴포넌트
export const NavigationComponent: React.FC = () => {
  return (
    <nav role="navigation">
      <ul role="list">
        <li role="listitem">
          <a href="/" role="link" data-testid="home-link">
            홈
          </a>
        </li>
        <li role="listitem">
          <a href="/about" role="link" data-testid="about-link">
            소개
          </a>
        </li>
        <li role="listitem">
          <a href="/contact" role="link" data-testid="contact-link">
            연락처
          </a>
        </li>
      </ul>
      <div role="status" data-testid="nav-status">
        네비게이션 준비됨
      </div>
    </nav>
  );
};
