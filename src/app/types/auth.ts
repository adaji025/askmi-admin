export interface RegisterRequest {
  email: string;
  phoneNumber: string;
  countryCode: string;
  company: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  role: "brand" | "influencer";
}

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  company: string;
  fullName: string;
  role: "brand" | "influencer";
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterSuccessResponse {
  success: true;
  message: string;
  user: User;
}

export interface RegisterErrorResponse {
  success: false;
  message: string;
  errors: Array<Record<string, unknown>>;
}

export type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  success: true;
  message: string;
  user: User;
  token: string;
}

export interface LoginErrorResponse {
  success: false;
  message: string;
  errors: Array<Record<string, unknown>>;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
