import { APIRequestContext, request, APIResponse } from "@playwright/test";
export class ApiClient {
  readonly apiContext: APIRequestContext;
  readonly baseURL: string;

  constructor(baseUrl: string, context: APIRequestContext) {
    this.baseURL = baseUrl;
    this.apiContext = context;
  }

  async getAll(endpoint: string): Promise<APIResponse> {
    try {
      const response = await this.apiContext.get(`${this.baseURL}${endpoint}`);
      if (!response.ok()) {
        throw new Error(
          `Failed to fetch characters: ${response.status()} ${response.statusText()}`
        );
      }
      return response;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  }

  async GetById(endpoint: string, id: number): Promise<APIResponse> {
    try {
      const response = await this.apiContext.get(
        `${this.baseURL}${endpoint}/${id}`
      );
      if (!response.ok()) {
        throw new Error(
          `Failed to fetch character by ID: ${response.status()} ${response.statusText()}`
        );
      }
      return response;
    } catch (error) {
      console.error("Error fetching character by ID:", error);
      throw error;
    }
  }

  async getByParams(
    endpoint: string,
    params: Record<string, string>
  ): Promise<APIResponse> {
    try {
      const response = await this.apiContext.get(`${this.baseURL}${endpoint}`, {
        params,
      });

      if (!response.ok()) {
        throw new Error(
          `Failed to fetch with params ${JSON.stringify(
            params
          )}: ${response.status()} ${response.statusText()}`
        );
      }
      return response;
    } catch (error) {
      console.error("Error fetching with params:", error);
      throw error;
    }
  }

  // async getAll_locations(endpoint: string): Promise<APIResponse> {
  //   try {
  //     const response = await this.apiContext.get(`${this.baseURL}${endpoint}`);
  //     if (!response.ok()) {
  //       throw new Error(
  //         `Failed to fetch characters: ${response.status()} ${response.statusText()}`
  //       );
  //     }
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching characters:", error);
  //     throw error;
  //   }
  // }

  // async getLocationById(endpoint: string, id: number): Promise<APIResponse> {
  //   try {
  //     const response = await this.apiContext.get(
  //       `${this.baseURL}${endpoint}/${id}`
  //     );
  //     if (!response.ok()) {
  //       throw new Error(
  //         `Failed to fetch character by ID: ${response.status()} ${response.statusText()}`
  //       );
  //     }
  //     return response;
  //   } catch (error) {
  //     console.error("Error fetching character by ID:", error);
  //     throw error;
  //   }
  // }
}
