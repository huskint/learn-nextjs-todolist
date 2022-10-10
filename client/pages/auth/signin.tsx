import React, {
  ChangeEvent,
  memo,
  useMemo,
  KeyboardEvent,
  useCallback, useEffect,
} from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react';

import getValidationUser from '../../lib/utils/getValidationUser';
import AuthContainer from '../../ui/components/auth/AuthContainer';
import { useTodoStores } from '../../lib/store2/stores';
import {
  UserParam,
  UserValidation,
} from '../../lib/interface/user.interface';

const Index = () => {
  const router = useRouter();
  const { userStore } = useTodoStores();

  const isUserValidation = useMemo(() => !(userStore.validation.email && userStore.validation.password), [userStore.validation.email, userStore.validation.password]);

  const onChangeUser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regexp = getValidationUser(name as keyof Omit<UserParam, 'passwordCheck'>, value);

    userStore.onChangeSignInUser(name as keyof UserParam, value);
    userStore.onChangeValidationUser(name as keyof UserValidation, regexp);
  }, [userStore.signIn, userStore.validation]);

  const onClickSignIn = useCallback(async () => {
    const isSignIn = await userStore.signinUser();
    if (isSignIn) {
      router.push('/todolist5');
    }
  }, [userStore.signIn.email, userStore.signIn.password]);

  const handleClickSignUp = useCallback(() => {
    router.push('/auth/signup');
  }, []);

  const onPressEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isUserValidation) {
      onClickSignIn();
    }
  }, [isUserValidation, onClickSignIn]);

  useEffect(() => {
    userStore.clearSignUser();
    userStore.clearSignUpUser();
    userStore.clearValidationUser();
  }, []);

  return (
    <>
      <Heading>로그인</Heading>
      <FormContainer>
        <AuthContainer
          label="이메일"
          id="email"
          type="email"
          value={userStore.signIn.email}
          onChange={onChangeUser}
        />
        <AuthContainer
          label="비밀번호"
          id="password"
          type="password"
          value={userStore.signIn.password}
          onChange={onChangeUser}
          onKeyPress={onPressEnter}
        />
        <ButtonContainer>
          <SignInButton
            disabled={isUserValidation}
            onClick={onClickSignIn}
          >
            로그인
          </SignInButton>
        </ButtonContainer>
        <SignUpContainer>회원이 아니신가요?
          <SignUpButton onClick={handleClickSignUp}>회원가입</SignUpButton>
        </SignUpContainer>
      </FormContainer>
    </>
  );
};

export default memo(observer(Index));

const Heading = styled.div`
  font-size: 24px;
  color: rgb(78, 89, 104);
  margin: 60px 0px 0px;
  text-align: center;
`;

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  margin-top: 80px;
  padding-right: 24px;
  padding-left: 24px;
`;

const ButtonContainer = styled.article`
  margin-top: 32px;
`;

const SignInButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  width: 100%;
  height: 54px;
  color: white;
  border-radius: 8px;
  border: none;
  background-color: #a2cbfd;
  transition: all 300ms;

  &:hover {
    cursor: pointer;
    background-color: #8ebef7;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #b2b2b280;
  }
`;

const SignUpContainer = styled.article`
  text-align: center;
  color: black;
  font-size: 14px;
`;

const SignUpButton = styled.button`
  border: none;
  background-color: #fff;
  margin-top: 60px;
  color: #4e61ff !important;
  cursor: pointer !important;
  text-decoration: underline;
  text-underline-position: under;
`;
