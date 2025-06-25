# React Testing Library (RTL) 학습 가이드

신입 프론트엔드 개발자를 위한 React Testing Library 단계별 학습 자료입니다.

## 📁 프로젝트 구조

```
src/
├── components/                 # 테스트할 React 컴포넌트들
│   ├── Button.tsx             # 간단한 버튼 컴포넌트
│   ├── Counter.tsx            # 상태 변화가 있는 카운터 컴포넌트
│   └── UserForm.tsx           # 폼 입력과 검증이 있는 컴포넌트
└── __tests__/
    └── rtl/                   # React Testing Library 학습 자료
        ├── 01-basic-rendering/
        │   ├── 01-basic-rendering.test.tsx          # 📖 설명용 (완전한 예시)
        │   ├── 01-basic-rendering.template.test.tsx # 📝 실습용 (빈 템플릿)
        │   └── 01-basic-rendering.completed.test.tsx # ✅ 정답용 (완성된 코드)
        ├── 02-user-interactions/
        │   ├── 02-user-interactions.test.tsx
        │   ├── 02-user-interactions.template.test.tsx
        │   └── 02-user-interactions.completed.test.tsx
        ├── 03-state-changes/
        │   ├── 03-state-changes.test.tsx
        │   ├── 03-state-changes.template.test.tsx
        │   └── 03-state-changes.completed.test.tsx
        ├── 04-forms-and-inputs/
        │   ├── 04-forms-and-inputs.test.tsx
        │   ├── 04-forms-and-inputs.template.test.tsx
        │   └── 04-forms-and-inputs.completed.test.tsx
        ├── 05-async-and-waiting/
        │   ├── 05-async-and-waiting.test.tsx
        │   ├── 05-async-and-waiting.template.test.tsx
        │   └── 05-async-and-waiting.completed.test.tsx
        ├── 06-query-priorities/
        │   ├── 06-query-priorities.test.tsx
        │   ├── 06-query-priorities.template.test.tsx
        │   └── 06-query-priorities.completed.test.tsx
        └── 07-best-practices/
            ├── 07-best-practices.test.tsx
            ├── 07-best-practices.template.test.tsx
            └── 07-best-practices.completed.test.tsx
```

## 🎯 학습 방법

### 📖 1단계: 설명 학습
각 주제의 **`.test.tsx`** 파일을 읽고 이해하세요.
- 완전한 예시 코드와 상세한 주석
- 학습 목표와 핵심 개념 설명
- 실제 동작하는 테스트 코드

```bash
# 설명용 파일 실행
npm test -- --testPathPatterns="01-basic-rendering.test.tsx"
```

### 📝 2단계: 실습 연습
**`.template.test.tsx`** 파일로 직접 코딩 연습을 하세요.
- TODO 주석이 있는 빈 템플릿
- 단계별 가이드와 힌트 제공
- 스스로 코드를 완성해보는 실습

```bash
# 실습용 템플릿 파일 실행 (실패할 수 있음)
npm test -- --testPathPatterns="01-basic-rendering.template.test.tsx"
```

### ✅ 3단계: 정답 확인
**`.completed.test.tsx`** 파일로 정답을 확인하세요.
- 실습의 완성된 정답 코드
- 상세한 해설과 설명
- 베스트 프랙티스 가이드

```bash
# 정답 파일 실행
npm test -- --testPathPatterns="01-basic-rendering.completed.test.tsx"
```

## 📚 학습 커리큘럼

### 1단계: 기본 렌더링과 쿼리 (`01-basic-rendering`)
- ✅ 컴포넌트 렌더링 방법
- ✅ 기본 쿼리 메서드 (`getBy*`, `queryBy*`)
- ✅ 요소의 존재와 속성 확인

### 2단계: 사용자 상호작용 (`02-user-interactions`)
- ✅ `userEvent`를 사용한 클릭, 키보드 입력
- ✅ Mock 함수를 활용한 이벤트 핸들러 테스트
- ✅ 비활성화된 요소 테스트

### 3단계: 상태 변화 테스트 (`03-state-changes`)
- ✅ `useState`를 사용한 컴포넌트 상태 테스트
- ✅ 사용자 상호작용 후 UI 업데이트 확인
- ✅ 복합적인 상호작용 시나리오

### 4단계: 폼과 입력 테스트 (`04-forms-and-inputs`)
- ✅ 텍스트 입력 필드 테스트
- ✅ 폼 검증 로직 테스트
- ✅ 폼 제출과 조건부 렌더링

### 5단계: 비동기 동작 테스트 (`05-async-and-waiting`)
- ✅ `waitFor`를 사용한 비동기 상태 변화 대기
- ✅ `findBy*` 쿼리로 비동기 요소 찾기
- ✅ 타이머와 지연 동작 테스트

### 6단계: 쿼리 우선순위와 접근성 (`06-query-priorities`)
- ✅ RTL의 쿼리 우선순위 이해
- ✅ 접근성을 고려한 요소 선택
- ✅ 사용자 중심적인 테스트 작성

### 7단계: 베스트 프랙티스 (`07-best-practices`)
- ✅ RTL의 권장사항과 안티패턴
- ✅ 실제 사용자 행동을 모방하는 테스트
- ✅ 유지보수 가능한 테스트 코드 작성

## 🚀 실행 명령어

### 전체 RTL 테스트 실행
```bash
npm test -- --testPathPatterns="rtl"
```

### 특정 단계 테스트
```bash
# 1단계 - 기본 렌더링
npm test -- --testPathPatterns="01-basic-rendering"

# 2단계 - 사용자 상호작용
npm test -- --testPathPatterns="02-user-interactions"

# 특정 파일만 실행
npm test -- --testPathPatterns="01-basic-rendering.test.tsx"
```

### 감시 모드
```bash
npm run test:watch -- --testPathPatterns="rtl"
```

## 💡 핵심 개념 요약

### RTL의 핵심 원칙
> **"사용자가 할 수 있는 것을 테스트하고, 사용자가 볼 수 있는 것을 확인하라"**

### 쿼리 우선순위 (사용자 친화적 순서)
1. 🥇 `getByRole()` - 접근성 role (button, textbox, etc.)
2. 🥈 `getByLabelText()` - form label과 연결된 요소
3. 🥉 `getByPlaceholderText()` - input placeholder
4. 4️⃣ `getByText()` - 텍스트 내용
5. 5️⃣ `getByDisplayValue()` - form 요소의 현재 값
6. 6️⃣ `getByAltText()` - img의 alt 속성
7. 7️⃣ `getByTitle()` - title 속성
8. 🔧 `getByTestId()` - data-testid (마지막 수단)

### 베스트 프랙티스

#### ✅ DO (권장사항)
- 사용자가 실제로 할 수 있는 동작을 테스트
- 접근성을 고려한 쿼리 사용 (role, label 등)
- 적절한 비동기 처리와 대기
- 명확하고 설명적인 테스트 이름
- 완전한 사용자 워크플로우 테스트

#### ❌ DON'T (피해야 할 것)
- 구현 세부사항 테스트 (CSS 클래스, 내부 상태)
- testid 남용 (마지막 수단으로만 사용)
- 복잡한 DOM 구조에 의존
- 실제 사용자 행동과 다른 테스트

## 🤝 학습 팁

1. **순차 학습**: 1단계부터 차례대로 진행하세요
2. **반복 연습**: template → completed → 다시 template 순으로 반복
3. **실제 적용**: 학습한 내용을 실제 프로젝트에 적용해보세요
4. **문서 참고**: 막힐 때는 [RTL 공식 문서](https://testing-library.com/docs/react-testing-library/intro/) 참고
5. **베스트 프랙티스**: 항상 "사용자 관점"에서 생각하세요

---

Happy Testing! 🎉

📖 [RTL 공식 문서](https://testing-library.com/docs/react-testing-library/intro/)  
🧪 [Jest DOM Matchers](https://github.com/testing-library/jest-dom)  
🖱️ [User Event API](https://testing-library.com/docs/user-event/intro)
