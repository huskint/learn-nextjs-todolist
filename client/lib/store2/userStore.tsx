import { observable } from 'mobx';

import { UserParam, User, UserValidation } from '../interface/user.interface';
import { signInUserAPI } from '../api/user/signInUser';
import { signUpUserAPI } from '../api/user/signUpUser';

export interface Store {
  user?: User;
  signIn: UserParam;
  signUp: UserParam;
  validation: UserValidation;
  onChangeSignInUser: (key: keyof UserParam, value: string) => void;
  onChangeSignUpUser: (key: keyof UserParam, value: string) => void;
  onChangeValidationUser: (key: keyof UserValidation, value: boolean) => void;
  clearSignUser: () => void;
  clearSignUpUser: () => void;
  clearValidationUser: () => void;
  signinUser: () => Promise<boolean>;
  signupUser: () => Promise<boolean>;
}

const initialUserParam = {
  email: '',
  password: '',
  passwordCheck: '',
};

const initialUserValidation = {
  email: false,
  password: false,
  passwordCheck: false,
};

export const store: Store = {
  user: undefined,
  signIn: initialUserParam,
  signUp: initialUserParam,
  validation: initialUserValidation,
  onChangeSignInUser(key, value) {
    this.signIn[key] = value;
  },
  onChangeSignUpUser(key, value) {
    this.signUp[key] = value;
  },
  onChangeValidationUser(key, value) {
    this.validation[key] = value;
  },
  clearSignUser() {
    this.signIn = initialUserParam;
  },
  clearSignUpUser() {
    this.signUp = initialUserParam;
  },
  clearValidationUser() {
    this.validation = initialUserValidation;
  },
  async signinUser() {
    try {
      const param = {
        email: this.signIn.email,
        password: this.signIn.password,
      };
      const response = await signInUserAPI(param);
      const userData: User = response?.data.data;
      this.user = {
        email: userData.email,
      };
      localStorage.setItem('token', JSON.stringify(userData.token));
      return true;
    } catch (e) {
      console.log(e);
      alert('회원 정보가 올바르지 않아요.');
      return false;
    }
  },
  async signupUser() {
    try {
      const param = {
        email: this.signUp.email,
        password: this.signUp.password,
      };
      const response = await signUpUserAPI(param);
      const userData: User = response?.data.data;
      this.user = {
        email: userData.email,
      };
      localStorage.setItem('token', JSON.stringify(userData.token));
      return true;
    } catch (e) {
      console.log(e);
      alert('회원 정보가 올바르지 않아요.');
      return false;
    }
  },
};

export default observable.object(store);
