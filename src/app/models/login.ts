export interface LoginRequest {
  username: string | undefined | null;
  password: string | undefined | null;
}

export interface LoginResponse {
  token: {
    token: string;
  };
}
