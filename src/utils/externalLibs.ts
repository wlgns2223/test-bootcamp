// 외부 모듈 시뮬레이션 - 실제 프로젝트에서 import하는 써드파티 라이브러리들

export const axios = {
  get: async (
    url: string,
    config?: any
  ): Promise<{ data: any; status: number }> => {
    // 실제 axios.get() 동작 시뮬레이션
    const response = await fetch(url, config);
    return {
      data: await response.json(),
      status: response.status,
    };
  },

  post: async (
    url: string,
    data: any,
    config?: any
  ): Promise<{ data: any; status: number }> => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      ...config,
    });
    return {
      data: await response.json(),
      status: response.status,
    };
  },
};

export const moment = {
  now: (): number => Date.now(),
  format: (date: Date, format: string = "YYYY-MM-DD"): string => {
    // 간단한 포맷팅 시뮬레이션
    if (format === "YYYY-MM-DD") {
      return date.toISOString().split("T")[0];
    }
    return date.toString();
  },
  add: (date: Date, amount: number, unit: string): Date => {
    const result = new Date(date);
    if (unit === "days") {
      result.setDate(result.getDate() + amount);
    }
    return result;
  },
};

export const uuid = {
  v4: (): string => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  },
};

export const crypto = {
  randomBytes: (size: number): Buffer => {
    // Node.js crypto.randomBytes 시뮬레이션
    const bytes = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return Buffer.from(bytes);
  },

  createHash: (algorithm: string) => ({
    update: (data: string) => ({
      digest: (encoding: string) => {
        // 간단한 해시 시뮬레이션
        let hash = 0;
        for (let i = 0; i < data.length; i++) {
          const char = data.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash; // 32bit 정수로 변환
        }
        return Math.abs(hash).toString(16);
      },
    }),
  }),
};
