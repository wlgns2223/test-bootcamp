/**
 * 비동기 API 호출 테스트 - 정답 완성본
 *
 * 이 파일은 비동기 함수와 API 호출 테스트의 완성된 정답입니다.
 * 실습 후 본인의 답안과 비교해보세요.
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

describe("비동기 API 호출 테스트 - 정답", () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe("1. 기본 비동기 함수 테스트", () => {
    it("성공적인 사용자 조회", async () => {
      // 실습 1-1 정답
      const mockUser: User = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      const result = await getUser(1);

      expect(result).toEqual(mockUser);
      expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1");
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("사용자 조회 실패 - 404 오류", async () => {
      // 실습 1-2 정답
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      await expect(getUser(999)).rejects.toThrow("사용자를 찾을 수 없습니다. ID: 999");
      expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/999");
    });

    it("네트워크 오류 처리", async () => {
      // 실습 1-3 정답
      mockFetch.mockRejectedValueOnce(new Error("Network Error"));

      await expect(getUser(1)).rejects.toThrow("Network Error");
      expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1");
    });
  });

  describe("2. 다양한 HTTP 메서드 테스트", () => {
    it("POST - 게시글 생성", async () => {
      // 실습 2-1 정답
      const newPost = {
        title: "새 게시글",
        body: "게시글 내용",
        userId: 1,
      };

      const mockCreatedPost: Post = {
        id: 101,
        title: "새 게시글",
        body: "게시글 내용",
        userId: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCreatedPost,
      } as Response);

      const result = await createPost(newPost);

      expect(result).toEqual(mockCreatedPost);
      expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
    });

    it("PATCH - 게시글 수정", async () => {
      // 실습 2-2 정답
      const postId = 1;
      const updateData = { title: "수정된 제목" };
      const mockUpdatedPost: Post = {
        id: postId,
        title: "수정된 제목",
        body: "기존 내용",
        userId: 1,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedPost,
      } as Response);

      const result = await updatePost(postId, updateData);

      expect(result).toEqual(mockUpdatedPost);
      expect(fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
    });

    it("DELETE - 게시글 삭제", async () => {
      // 실습 2-3 정답
      const postId = 1;

      mockFetch.mockResolvedValueOnce({
        ok: true,
      } as Response);

      await deletePost(postId);

      expect(fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      });
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("3. 타임아웃 테스트", () => {
    it("정상적인 응답 시간 내에 성공", async () => {
      // 실습 3-1 정답
      const mockData = { message: "success" };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await fetchWithTimeout("https://api.example.com/data", 1000);

      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith("https://api.example.com/data", {
        signal: expect.any(AbortSignal),
      });
    });

    it("타임아웃 발생", async () => {
      // 실습 3-2 정답
      mockFetch.mockRejectedValueOnce(Object.assign(new Error("The operation was aborted"), { name: "AbortError" }));

      await expect(fetchWithTimeout("https://api.example.com/slow", 100)).rejects.toThrow(
        "요청이 타임아웃되었습니다. (100ms)"
      );
    });
  });

  describe("4. 재시도 로직 테스트", () => {
    it("첫 번째 시도에서 성공", async () => {
      // 실습 4-1 정답
      const mockData = { success: true };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await fetchWithRetry("https://api.example.com/data");

      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("재시도 후 성공", async () => {
      // 실습 4-2 정답
      const mockData = { success: true };

      mockFetch.mockRejectedValueOnce(new Error("Network Error")).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await fetchWithRetry("https://api.example.com/data", 3, 10);

      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("최대 재시도 횟수 초과 후 실패", async () => {
      // 실습 4-3 정답
      mockFetch.mockRejectedValue(new Error("Persistent Error"));

      await expect(fetchWithRetry("https://api.example.com/data", 2, 10)).rejects.toThrow(
        "2번 재시도 후 실패: Persistent Error"
      );

      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe("5. 병렬 처리 테스트", () => {
    it("여러 사용자를 병렬로 조회", async () => {
      // 실습 5-1 정답
      const mockUsers: User[] = [
        { id: 1, name: "User 1", email: "user1@example.com" },
        { id: 2, name: "User 2", email: "user2@example.com" },
        { id: 3, name: "User 3", email: "user3@example.com" },
      ];

      mockUsers.forEach((user) => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => user,
        } as Response);
      });

      const result = await fetchMultipleUsers([1, 2, 3]);

      expect(result).toHaveLength(3);
      expect(result).toEqual(mockUsers);
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(fetch).toHaveBeenNthCalledWith(1, "https://jsonplaceholder.typicode.com/users/1");
      expect(fetch).toHaveBeenNthCalledWith(2, "https://jsonplaceholder.typicode.com/users/2");
      expect(fetch).toHaveBeenNthCalledWith(3, "https://jsonplaceholder.typicode.com/users/3");
    });

    it("병렬 처리 중 일부 실패", async () => {
      // 실습 5-2 정답
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: 1, name: "User 1", email: "user1@example.com" }),
        } as Response)
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ id: 3, name: "User 3", email: "user3@example.com" }),
        } as Response);

      await expect(fetchMultipleUsers([1, 2, 3])).rejects.toThrow();
      expect(fetch).toHaveBeenCalledTimes(3);
    });
  });

  describe("6. API 서비스 클래스 테스트", () => {
    let apiService: ApiService;

    beforeEach(() => {
      apiService = new ApiService();
    });

    it("GET 요청 성공", async () => {
      // 실습 6-1 정답
      const mockData = { message: "Hello World" };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      } as Response);

      const result = await apiService.get("/test");

      expect(result).toEqual({
        data: mockData,
        status: 200,
        message: "Success",
      });
      expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/test");
    });

    it("POST 요청 성공", async () => {
      // 실습 6-2 정답
      const requestData = { name: "New Item" };
      const responseData = { id: 1, name: "New Item" };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => responseData,
      } as Response);

      const result = await apiService.post("/items", requestData);

      expect(result).toEqual({
        data: responseData,
        status: 201,
        message: "Created",
      });
      expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
    });

    it("API 에러 처리", async () => {
      // 실습 6-3 정답
      mockFetch
        .mockRejectedValueOnce(new Error("Connection refused"))
        .mockRejectedValueOnce(new Error("Connection refused"));

      await expect(apiService.get("/test")).rejects.toThrow(ApiError);

      try {
        await apiService.get("/test2");
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toBe("Connection refused");
      }
    });
  });

  describe("7. 고급 시나리오 테스트", () => {
    it("특정 시간 대기 후 응답", async () => {
      // 실습 7-1 정답
      const delay = 100;
      const mockData = { delayed: true };

      mockFetch.mockImplementationOnce(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve({
                  ok: true,
                  json: async () => mockData,
                } as Response),
              delay
            )
          )
      );

      const startTime = Date.now();
      const result = await fetchWithTimeout("https://api.example.com/slow", 1000);
      const endTime = Date.now();

      expect(result).toEqual(mockData);
      expect(endTime - startTime).toBeGreaterThanOrEqual(delay - 10);
      expect(endTime - startTime).toBeLessThan(delay + 50);
    });

    it("여러 상태 코드 테스트", async () => {
      // 실습 7-2 정답
      const testCases = [
        { status: 200, shouldThrow: false },
        { status: 400, shouldThrow: true },
        { status: 404, shouldThrow: true },
        { status: 500, shouldThrow: true },
      ];

      for (const testCase of testCases) {
        mockFetch.mockResolvedValueOnce({
          ok: testCase.status >= 200 && testCase.status < 300,
          status: testCase.status,
          json: async () => ({ id: 1, name: "Test User", email: "test@example.com" }),
        } as Response);

        if (testCase.shouldThrow) {
          await expect(getUser(1)).rejects.toThrow();
        } else {
          const result = await getUser(1);
          expect(result).toBeDefined();
          expect(result.id).toBe(1);
        }
      }

      expect(fetch).toHaveBeenCalledTimes(testCases.length);
    });
  });

  describe("8. 추가 실무 패턴", () => {
    it("조건부 API 호출", async () => {
      // 조건에 따라 다른 API를 호출하는 패턴
      const shouldCallApi = true;

      if (shouldCallApi) {
        const mockData = { conditional: true };
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        } as Response);

        const result = await getUser(1);
        expect(result).toEqual(mockData);
      }

      expect(fetch).toHaveBeenCalledTimes(shouldCallApi ? 1 : 0);
    });

    it("API 호출 캐싱 시뮬레이션", async () => {
      // 캐시 동작을 시뮬레이션하는 테스트
      const cache = new Map();
      const userId = 1;
      const mockUser = { id: userId, name: "Cached User", email: "cached@example.com" };

      // 첫 번째 호출 - 캐시 없음
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      // 캐시에서 확인
      if (!cache.has(userId)) {
        const result = await getUser(userId);
        cache.set(userId, result);
      }

      // 두 번째 호출 - 캐시 사용 (API 호출 없음)
      const cachedResult = cache.get(userId);

      expect(cachedResult).toEqual(mockUser);
      expect(fetch).toHaveBeenCalledTimes(1); // 한 번만 호출
    });

    it("배치 처리 테스트", async () => {
      // 여러 작업을 배치로 처리하는 패턴
      const batchSize = 2;
      const userIds = [1, 2, 3, 4, 5];
      const mockUsers = userIds.map((id) => ({ id, name: `User ${id}`, email: `user${id}@example.com` }));

      // 배치별로 mock 설정
      for (let i = 0; i < Math.ceil(userIds.length / batchSize); i++) {
        const batch = userIds.slice(i * batchSize, (i + 1) * batchSize);
        batch.forEach((id, index) => {
          mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUsers[i * batchSize + index],
          } as Response);
        });
      }

      // 배치 처리 실행
      const results = [];
      for (let i = 0; i < userIds.length; i += batchSize) {
        const batch = userIds.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map((id) => getUser(id)));
        results.push(...batchResults);
      }

      expect(results).toHaveLength(userIds.length);
      expect(fetch).toHaveBeenCalledTimes(userIds.length);
    });
  });
});

/**
 * 정답 파일 학습 포인트:
 *
 * 1. Mock 활용법
 *    - mockResolvedValueOnce: 성공 응답
 *    - mockRejectedValueOnce: 실패 응답
 *    - mockImplementationOnce: 커스텀 구현
 *    - 연쇄 호출 패턴
 *
 * 2. 비동기 테스트 패턴
 *    - async/await 사용
 *    - Promise.all 테스트
 *    - 에러 처리 검증
 *    - 타이밍 테스트
 *
 * 3. HTTP 요청 테스트
 *    - 다양한 메서드 (GET, POST, PATCH, DELETE)
 *    - 요청 헤더 및 바디 검증
 *    - 상태 코드 처리
 *
 * 4. 실무 시나리오
 *    - 재시도 로직
 *    - 타임아웃 처리
 *    - 병렬/순차 처리
 *    - 캐싱 패턴
 *    - 배치 처리
 *
 * 5. 테스트 검증 방법
 *    - 결과 값 확인
 *    - 호출 횟수 확인
 *    - 호출 순서 확인
 *    - 매개변수 확인
 */
