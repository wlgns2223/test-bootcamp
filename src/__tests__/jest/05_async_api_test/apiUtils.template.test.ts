/**
 * 비동기 API 호출 테스트 - 실습 템플릿
 *
 * 이 파일은 비동기 함수와 API 호출 테스트를 직접 작성해보는 실습용입니다.
 * 주석의 지시사항을 따라 테스트 코드를 완성해보세요.
 *
 * 실습 과제:
 * 1. 기본 비동기 함수 테스트 작성
 * 2. 다양한 HTTP 메서드 테스트
 * 3. 에러 처리 테스트
 * 4. 타임아웃과 재시도 테스트
 * 5. 병렬 처리 테스트
 */

import {
  getUser,
  getUsers,
  createPost,
  updatePost,
  deletePost,
  fetchWithTimeout,
  fetchWithRetry,
  fetchMultipleUsers,
  ApiService,
  ApiError,
  User,
  Post,
} from "../../../utils/apiUtils";

// fetch mock 설정
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("비동기 API 호출 테스트 - 실습", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe("1. 기본 비동기 함수 테스트", () => {
    it("성공적인 사용자 조회", async () => {
      // TODO: 실습 1-1
      // 1. mockUser 데이터를 정의하세요
      const mockUser: User = {
        id: 1,
        name: "", // 여기에 사용자 이름을 작성하세요
        email: "", // 여기에 이메일을 작성하세요
      };

      // 2. fetch mock이 성공 응답을 반환하도록 설정하세요
      mockFetch.mockResolvedValueOnce({
        // 여기에 성공 응답 객체를 작성하세요
      } as Response);

      // 3. getUser 함수를 호출하세요
      // const result =

      // 4. 결과를 검증하세요
      // expect(result).toEqual(???);
      // expect(fetch).toHaveBeenCalledWith(???);
    });

    it("사용자 조회 실패 - 404 오류", async () => {
      // TODO: 실습 1-2
      // 1. fetch mock이 404 오류를 반환하도록 설정하세요
      // 2. getUser 함수 호출 시 에러가 발생하는지 테스트하세요
      // await expect(???).rejects.toThrow(???);
    });

    it("네트워크 오류 처리", async () => {
      // TODO: 실습 1-3
      // 1. fetch mock이 네트워크 오류를 발생시키도록 설정하세요
      // 2. 네트워크 오류 처리를 테스트하세요
    });
  });

  describe("2. 다양한 HTTP 메서드 테스트", () => {
    it("POST - 게시글 생성", async () => {
      // TODO: 실습 2-1
      // 1. 새 게시글 데이터를 정의하세요
      const newPost = {
        // 여기에 게시글 데이터를 작성하세요
      };

      // 2. 생성된 게시글 mock 데이터를 정의하세요
      const mockCreatedPost: Post = {
        id: 1, // 여기에 ID를 작성하세요
        title: "", // 여기에 제목을 작성하세요
        body: "", // 여기에 내용을 작성하세요
        userId: 1, // 여기에 사용자 ID를 작성하세요
      };

      // 3. fetch mock 설정 (POST 요청)

      // 4. createPost 함수 호출 및 검증
    });

    it("PATCH - 게시글 수정", async () => {
      // TODO: 실습 2-2
      // PATCH 요청을 테스트하는 코드를 작성하세요
    });

    it("DELETE - 게시글 삭제", async () => {
      // TODO: 실습 2-3
      // DELETE 요청을 테스트하는 코드를 작성하세요
    });
  });

  describe("3. 타임아웃 테스트", () => {
    it("정상적인 응답 시간 내에 성공", async () => {
      // TODO: 실습 3-1
      // 1. mock 데이터 정의
      // 2. fetch mock이 빠르게 응답하도록 설정
      // 3. fetchWithTimeout 함수 호출 및 검증
    });

    it("타임아웃 발생", async () => {
      // TODO: 실습 3-2
      // 1. fetch mock이 지연된 응답을 하도록 설정
      // 힌트: mockImplementationOnce와 setTimeout 사용
      // 2. 타임아웃 에러 발생을 테스트
    });
  });

  describe("4. 재시도 로직 테스트", () => {
    it("첫 번째 시도에서 성공", async () => {
      // TODO: 실습 4-1
      // 첫 번째 시도에서 성공하는 경우를 테스트하세요
    });

    it("재시도 후 성공", async () => {
      // TODO: 실습 4-2
      // 1. 첫 번째 호출은 실패, 두 번째 호출은 성공하도록 mock 설정
      // 힌트: mockRejectedValueOnce와 mockResolvedValueOnce 함께 사용
      // 2. fetchWithRetry 함수 호출 및 검증
      // 3. fetch가 2번 호출되었는지 확인
    });

    it("최대 재시도 횟수 초과 후 실패", async () => {
      // TODO: 실습 4-3
      // 모든 재시도가 실패하는 경우를 테스트하세요
    });
  });

  describe("5. 병렬 처리 테스트", () => {
    it("여러 사용자를 병렬로 조회", async () => {
      // TODO: 실습 5-1
      // 1. 여러 사용자 mock 데이터 정의
      const mockUsers: User[] = [
        // 여기에 사용자 배열을 작성하세요
      ];

      // 2. 각 API 호출에 대한 mock 설정
      // 힌트: forEach와 mockResolvedValueOnce 사용

      // 3. fetchMultipleUsers 함수 호출 및 검증
      // 4. 병렬 호출 확인 (호출 횟수와 URL 검증)
    });

    it("병렬 처리 중 일부 실패", async () => {
      // TODO: 실습 5-2
      // 병렬 처리 중 일부가 실패하는 경우를 테스트하세요
      // 힌트: 일부 호출은 성공, 일부는 실패하도록 설정
    });
  });

  describe("6. API 서비스 클래스 테스트", () => {
    let apiService: ApiService;

    beforeEach(() => {
      apiService = new ApiService();
    });

    it("GET 요청 성공", async () => {
      // TODO: 실습 6-1
      // ApiService의 get 메서드를 테스트하세요
    });

    it("POST 요청 성공", async () => {
      // TODO: 실습 6-2
      // ApiService의 post 메서드를 테스트하세요
    });

    it("API 에러 처리", async () => {
      // TODO: 실습 6-3
      // ApiError가 제대로 발생하는지 테스트하세요
    });
  });

  describe("7. 고급 시나리오 테스트", () => {
    it("특정 시간 대기 후 응답", async () => {
      // TODO: 실습 7-1
      // 지연 시간을 측정하는 테스트를 작성하세요
      // 힌트: Date.now()를 사용하여 시간 측정
    });

    it("여러 상태 코드 테스트", async () => {
      // TODO: 실습 7-2
      // 다양한 HTTP 상태 코드에 대한 테스트를 작성하세요
      // 힌트: 배열과 반복문을 사용하여 여러 케이스 테스트

      const testCases = [
        { status: 200, shouldThrow: false },
        { status: 400, shouldThrow: true },
        { status: 404, shouldThrow: true },
        { status: 500, shouldThrow: true },
      ];

      // 여기에 반복문을 사용한 테스트 코드를 작성하세요
    });
  });
});

/**
 * 실습 완료 체크리스트:
 *
 * □ 1-1: 성공적인 API 호출 테스트
 * □ 1-2: 404 오류 처리 테스트
 * □ 1-3: 네트워크 오류 테스트
 * □ 2-1: POST 요청 테스트
 * □ 2-2: PATCH 요청 테스트
 * □ 2-3: DELETE 요청 테스트
 * □ 3-1: 정상 타임아웃 테스트
 * □ 3-2: 타임아웃 발생 테스트
 * □ 4-1: 첫 시도 성공 테스트
 * □ 4-2: 재시도 후 성공 테스트
 * □ 4-3: 재시도 실패 테스트
 * □ 5-1: 병렬 처리 성공 테스트
 * □ 5-2: 병렬 처리 실패 테스트
 * □ 6-1: API 서비스 GET 테스트
 * □ 6-2: API 서비스 POST 테스트
 * □ 6-3: API 에러 처리 테스트
 * □ 7-1: 시간 측정 테스트
 * □ 7-2: 상태 코드 테스트
 *
 * 실습 팁:
 * 1. 각 TODO 섹션을 하나씩 완성하세요
 * 2. 테스트 실행 후 결과를 확인하세요
 * 3. 에러가 발생하면 에러 메시지를 읽고 수정하세요
 * 4. 완성된 테스트는 정답 파일과 비교해보세요
 */
