// API 호출 관련 유틸리티 함수들
// 실습 목적으로 간단한 API 호출 시뮬레이션

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  message: string;
  code: number;
  details?: string;
}

// 기본 fetch 래퍼 함수
export const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// 사용자 정보 조회
export const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!response.ok) {
    throw new Error(`사용자를 찾을 수 없습니다. ID: ${id}`);
  }

  return response.json();
};

// 모든 사용자 목록 조회
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error("사용자 목록을 가져올 수 없습니다.");
  }

  return response.json();
};

// 게시글 생성
export const createPost = async (post: Omit<Post, "id">): Promise<Post> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error("게시글 생성에 실패했습니다.");
  }

  return response.json();
};

// 게시글 수정
export const updatePost = async (id: number, post: Partial<Post>): Promise<Post> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(`게시글 수정에 실패했습니다. ID: ${id}`);
  }

  return response.json();
};

// 게시글 삭제
export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`게시글 삭제에 실패했습니다. ID: ${id}`);
  }
};

// 타임아웃이 있는 API 호출
export const fetchWithTimeout = async <T>(url: string, timeoutMs: number = 5000): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`요청이 타임아웃되었습니다. (${timeoutMs}ms)`);
    }
    throw error;
  }
};

// 재시도 로직이 있는 API 호출
export const fetchWithRetry = async <T>(url: string, maxRetries: number = 3, delay: number = 1000): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw new Error(`${maxRetries}번 재시도 후 실패: ${lastError!.message}`);
};

// 병렬 API 호출
export const fetchMultipleUsers = async (ids: number[]): Promise<User[]> => {
  const promises = ids.map((id) => getUser(id));
  return Promise.all(promises);
};

// 순차적 API 호출
export const fetchUsersSequentially = async (ids: number[]): Promise<User[]> => {
  const users: User[] = [];

  for (const id of ids) {
    const user = await getUser(id);
    users.push(user);
  }

  return users;
};

// 에러 처리가 포함된 API 서비스 클래스
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = "https://jsonplaceholder.typicode.com") {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      const data = await response.json();

      return {
        data,
        status: response.status,
        message: response.ok ? "Success" : "Error",
      };
    } catch (error) {
      throw new ApiError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.", 0);
    }
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      return {
        data,
        status: response.status,
        message: response.ok ? "Created" : "Error",
      };
    } catch (error) {
      throw new ApiError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.", 0);
    }
  }
}

// 커스텀 에러 클래스
export class ApiError extends Error {
  constructor(message: string, public code: number, public details?: string) {
    super(message);
    this.name = "ApiError";
  }
}
