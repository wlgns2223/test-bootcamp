/**
 * 비동기 API 호출 테스트 - 설명용
 *
 * 이 파일은 비동기 함수와 API 호출을 테스트하는 방법을 설명합니다.
 *
 * 학습 목표:
 * 1. Promise와 async/await 함수 테스트
 * 2. API 호출 성공/실패 시나리오 테스트
 * 3. fetch API mocking
 * 4. 타임아웃과 재시도 로직 테스트
 * 5. 병렬/순차 API 호출 테스트
 * 6. 에러 처리 테스트
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

// Jest의 전역 fetch mock 설정
// Node.js 환경에서는 fetch가 기본으로 제공되지 않으므로 mock이 필요
global.fetch = jest.fn();

describe("비동기 API 호출 테스트", () => {
  // 각 테스트 전에 mock을 초기화
  beforeEach(() => {
    (fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  describe("1. 기본 비동기 함수 테스트", () => {
    it("성공적인 사용자 조회", async () => {
      // Arrange: Mock 데이터 준비
      const mockUser: User = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
      };

      // fetch mock 설정 - 성공 응답
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

      // Act: 함수 실행
      const result = await getUser(1);

      // Assert: 결과 검증
      expect(result).toEqual(mockUser);
      expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1");
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("사용자 조회 실패 - 404 오류", async () => {
      // Arrange: 실패 응답 mock 설정
      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: false,
        status: 404,
      } as Response);

      // Act & Assert: 에러가 발생하는지 확인
      await expect(getUser(999)).rejects.toThrow("사용자를 찾을 수 없습니다. ID: 999");
      expect(fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/999");
    });

    it("네트워크 오류 처리", async () => {
      // Arrange: 네트워크 오류 mock 설정
      (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error("Network Error"));

      // Act & Assert: 네트워크 오류 처리 확인
      await expect(getUser(1)).rejects.toThrow("Network Error");
    });
  });

  describe("2. 다양한 HTTP 메서드 테스트", () => {
    it("POST - 게시글 생성", async () => {
      // Arrange
      const newPost = {
        title: "새 게시글",
        body: "게시글 내용",
        userId: 1,
      };

      const mockCreatedPost: Post = {
        id: 101,
        ...newPost,
      };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockCreatedPost,
      } as Response);

      // Act
      const result = await createPost(newPost);

      // Assert
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
      // Arrange
      const postId = 1;
      const updateData = { title: "수정된 제목" };
      const mockUpdatedPost: Post = {
        id: postId,
        title: "수정된 제목",
        body: "기존 내용",
        userId: 1,
      };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUpdatedPost,
      } as Response);

      // Act
      const result = await updatePost(postId, updateData);

      // Assert
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
      // Arrange
      const postId = 1;

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
      } as Response);

      // Act
      await deletePost(postId);

      // Assert
      expect(fetch).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      });
    });
  });

  describe("3. 타임아웃 테스트", () => {
    it("정상적인 응답 시간 내에 성공", async () => {
      // Arrange
      const mockData = { message: "success" };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      // Act
      const result = await fetchWithTimeout("https://api.example.com/data", 1000);

      // Assert
      expect(result).toEqual(mockData);
    });

    it("타임아웃 발생", async () => {
      // Arrange: AbortError를 직접 발생시키는 mock
      (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
        Object.assign(new Error("The operation was aborted"), { name: "AbortError" })
      );

      // Act & Assert: 타임아웃 에러 확인
      await expect(fetchWithTimeout("https://api.example.com/slow", 100)).rejects.toThrow(
        "요청이 타임아웃되었습니다. (100ms)"
      );
    });
  });

  describe("4. 재시도 로직 테스트", () => {
    it("첫 번째 시도에서 성공", async () => {
      // Arrange
      const mockData = { success: true };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      } as Response);

      // Act
      const result = await fetchWithRetry("https://api.example.com/data");

      // Assert
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it("재시도 후 성공", async () => {
      // Arrange: 첫 번째는 실패, 두 번째는 성공
      const mockData = { success: true };

      (fetch as jest.MockedFunction<typeof fetch>)
        .mockRejectedValueOnce(new Error("Network Error"))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        } as Response);

      // Act
      const result = await fetchWithRetry("https://api.example.com/data", 3, 10);

      // Assert
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledTimes(2);
    });

    it("최대 재시도 횟수 초과 후 실패", async () => {
      // Arrange: 모든 시도가 실패
      (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(new Error("Persistent Error"));

      // Act & Assert
      await expect(fetchWithRetry("https://api.example.com/data", 2, 10)).rejects.toThrow(
        "2번 재시도 후 실패: Persistent Error"
      );

      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe("5. 병렬 처리 테스트", () => {
    it("여러 사용자를 병렬로 조회", async () => {
      // Arrange
      const mockUsers: User[] = [
        { id: 1, name: "User 1", email: "user1@example.com" },
        { id: 2, name: "User 2", email: "user2@example.com" },
        { id: 3, name: "User 3", email: "user3@example.com" },
      ];

      // 각 API 호출에 대한 mock 설정
      mockUsers.forEach((user, index) => {
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
          ok: true,
          json: async () => user,
        } as Response);
      });

      // Act
      const result = await fetchMultipleUsers([1, 2, 3]);

      // Assert
      expect(result).toHaveLength(3);
      expect(result).toEqual(mockUsers);
      expect(fetch).toHaveBeenCalledTimes(3);

      // 병렬 호출 확인 (URL 검증)
      expect(fetch).toHaveBeenNthCalledWith(1, "https://jsonplaceholder.typicode.com/users/1");
      expect(fetch).toHaveBeenNthCalledWith(2, "https://jsonplaceholder.typicode.com/users/2");
      expect(fetch).toHaveBeenNthCalledWith(3, "https://jsonplaceholder.typicode.com/users/3");
    });

    it("병렬 처리 중 일부 실패", async () => {
      // Arrange: 두 번째 호출만 실패
      (fetch as jest.MockedFunction<typeof fetch>)
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

      // Act & Assert: Promise.all에서 하나라도 실패하면 전체 실패
      await expect(fetchMultipleUsers([1, 2, 3])).rejects.toThrow();
    });
  });

  describe("6. API 서비스 클래스 테스트", () => {
    let apiService: ApiService;

    beforeEach(() => {
      apiService = new ApiService();
    });

    it("GET 요청 성공", async () => {
      // Arrange
      const mockData = { message: "Hello World" };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockData,
      } as Response);

      // Act
      const result = await apiService.get("/test");

      // Assert
      expect(result).toEqual({
        data: mockData,
        status: 200,
        message: "Success",
      });
    });

    it("POST 요청 성공", async () => {
      // Arrange
      const requestData = { name: "New Item" };
      const responseData = { id: 1, ...requestData };

      (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => responseData,
      } as Response);

      // Act
      const result = await apiService.post("/items", requestData);

      // Assert
      expect(result).toEqual({
        data: responseData,
        status: 201,
        message: "Created",
      });
    });

    it("API 에러 처리", async () => {
      // Arrange: 네트워크 오류 발생
      (fetch as jest.MockedFunction<typeof fetch>)
        .mockRejectedValueOnce(new Error("Connection refused"))
        .mockRejectedValueOnce(new Error("Connection refused"));

      // Act & Assert
      await expect(apiService.get("/test")).rejects.toThrow(ApiError);

      // 별도 호출로 에러 메시지 확인
      try {
        await apiService.get("/test2");
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).message).toBe("Connection refused");
      }
    });
  });

  describe("7. 테스트 헬퍼와 유틸리티", () => {
    it("특정 시간 대기 후 응답", async () => {
      // Arrange
      const delay = 100;
      const mockData = { delayed: true };

      (fetch as jest.MockedFunction<typeof fetch>).mockImplementationOnce(
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

      // Act
      const startTime = Date.now();
      const result = await fetchWithTimeout("https://api.example.com/slow", 1000);
      const endTime = Date.now();

      // Assert
      expect(result).toEqual(mockData);
      expect(endTime - startTime).toBeGreaterThanOrEqual(delay - 10); // 약간의 여유
    });

    it("여러 상태 코드 테스트", async () => {
      const testCases = [
        { status: 200, shouldThrow: false },
        { status: 400, shouldThrow: true },
        { status: 404, shouldThrow: true },
        { status: 500, shouldThrow: true },
      ];

      for (const testCase of testCases) {
        // Arrange
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
          ok: testCase.status >= 200 && testCase.status < 300,
          status: testCase.status,
          json: async () => ({ status: testCase.status }),
        } as Response);

        // Act & Assert
        if (testCase.shouldThrow) {
          await expect(getUser(1)).rejects.toThrow();
        } else {
          const result = await getUser(1);
          expect(result).toBeDefined();
        }
      }
    });
  });
});

/**
 * 핵심 학습 포인트:
 *
 * 1. 비동기 테스트 패턴
 *    - async/await 사용
 *    - Promise.resolves/rejects 매처
 *    - 에러 처리 테스트
 *
 * 2. Mock 전략
 *    - fetch API mocking
 *    - 다양한 응답 시나리오 모방
 *    - 네트워크 오류 시뮬레이션
 *
 * 3. 시간 관련 테스트
 *    - 타임아웃 테스트
 *    - 재시도 로직 검증
 *    - 지연 시간 측정
 *
 * 4. 병렬 처리 테스트
 *    - Promise.all 동작 확인
 *    - 부분 실패 시나리오
 *    - 호출 순서와 횟수 검증
 *
 * 5. 실무 패턴
 *    - API 클래스 테스트
 *    - 커스텀 에러 처리
 *    - 응답 데이터 구조 검증
 */
