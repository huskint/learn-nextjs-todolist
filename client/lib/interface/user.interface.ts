export interface User {
  id?: number;
  email: string;
  token?: string;
}

export interface UserParam {
  email: string;
  password: string;
  passwordCheck?: string;
}

export interface UserValidation {
  email: boolean;
  password: boolean;
  passwordCheck?: boolean;
}
