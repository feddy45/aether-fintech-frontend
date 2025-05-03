export interface LoginRequest {
  username: string | undefined | null;
  password: string | undefined | null;
}

export interface LoginResponse {
  token: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
