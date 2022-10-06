import React, {
  ChangeEvent, memo, useCallback, useEffect, useMemo,
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import AuthContainer from '../../ui/components/auth/AuthContainer';
import getValidationUser from '../../lib/utils/getValidationUser';
import { UserParam, UserValidation } from '../../lib/interface/user.interface';
import { useTodoStores } from '../../lib/store2/stores';

const Index = () => {
  const router = useRouter();
  const { userStore } = useTodoStores();

  const isUserValidation = useMemo(
    () => !(
      userStore.validation.email
    && userStore.validation.password
    && userStore.validation.passwordCheck
    ),
    [
      userStore.validation.email,
      userStore.validation.password,
      userStore.validation.passwordCheck,
    ],
  );

  const handleClickPrev = useCallback(() => {
    router.back();
  }, []);

  const onChangeUser = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    let test = false;
    const regexpCheckList = ['email', 'password'];

    if (regexpCheckList.includes(name)) {
      test = getValidationUser(name as keyof Omit<UserParam, 'passwordCheck'>, value);
    }

    if (name === 'passwordCheck') {
      test = userStore.signUp.password === value;
    }

    userStore.onChangeSignUpUser(name as keyof UserParam, value);
    userStore.onChangeValidationUser(name as keyof UserValidation, test);
  }, [userStore.signUp, userStore.validation]);

  const onClickSignUp = useCallback(async () => {
    const isSignUp = await userStore.signupUser();
    if (isSignUp) {
      router.push('/todolist5');
    }
  }, [userStore.signIn.email, userStore.signIn.password]);

  useEffect(() => {
    userStore.clearSignUser();
    userStore.clearValidationUser();
  }, []);

  return (
    <>

      <Header>
        <Prev onClick={handleClickPrev}>
          &lt;
        </Prev>
      </Header>
      <Heading>회원가입</Heading>
      <FormContainer>
        <AuthContainer
          label="이메일"
          id="email"
          type="email"
          value={userStore.signUp.email}
          validation={userStore.validation.email}
          onChange={onChangeUser}
          error={{
            isError: userStore.signUp.email.length > 0 && !userStore.validation.email,
            message: '이메일 형식이 올바르지 않습니다.',
          }}
        />
        <AuthContainer
          label="비밀번호"
          id="password"
          type="password"
          value={userStore.signUp.password}
          validation={userStore.validation.password}
          onChange={onChangeUser}
          error={{
            isError: userStore.signUp.password.length > 0 && !userStore.validation.password,
            message: '8글자 이상 입력해 주세요.',
          }}
        />
        <AuthContainer
          label="비밀번호 확인"
          id="passwordCheck"
          type="password"
          value={userStore.signUp.passwordCheck as string}
          validation={userStore.validation.passwordCheck}
          onChange={onChangeUser}
          error={{
            isError: (userStore.signUp.passwordCheck as string).length > 0 && !userStore.validation.passwordCheck,
            message: '비밀번호가 동일하지 않습니다.',
          }}
        />
        <SignUpCheckContainer>
          <Check>
            <CheckBoxLabel>
              <InputBox type="checkbox" />
            </CheckBoxLabel>
            <span>[필수] 개인정보 수집 및 이용 동의</span>
          </Check>
        </SignUpCheckContainer>

        <ButtonContainer>
          <SignUpButton
            disabled={isUserValidation}
            onClick={onClickSignUp}
          >
            회원가입
          </SignUpButton>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default memo(observer(Index));

const Header = styled.header`
  width: 100%;
  height: 60px;
`;

const Prev = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > img {
    width: 30px;
    height: 30px;
  }
`;

const Heading = styled.div`
  font-size: 24px;
  color: rgb(78, 89, 104);
  margin: 30px 0px 0px;
  text-align: center;
`;

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: auto;
  margin-top: 50px;
  padding-right: 24px;
  padding-left: 24px;
  padding-bottom: 40px;
`;

const InputContainer = styled.article`
  display: flex;
  flex-direction: column;
  height: 96px;

  & + & {
    margin-top: 25px;
  }
`;

const InputLabel = styled.label`
  width: 100%;
  color: rgb(78, 89, 104);
  font-size: 17px;
  display: block;
  margin-bottom: 4px;
`;

const Input = styled.input<{ isError?: boolean }>`
  width: 100%;
  height: 50px;
  border: 1px solid #e5e8eaff;
  border-radius: 8px;
  padding: 0 20px;
  outline: ${(props) => (props.isError && '0.5px solid #d21111')};
  background-color: ${(props) => (props.isError && '#fff2f5')};

  &:focus-visible {
    outline: ${(props) => (props.isError ? '0.5px solid #d21111' : '0.5px solid #a2cbfdba')};
  }
`;

const ErrorMsg = styled.span`
  margin-top: 7px;
  padding-left: 4px;
  font-size: 12px;
  color: #d21111;
`;

const SignUpCheckContainer = styled.article`
  width: 100%;
  margin-top: 15px;
  display: flex;
  color: rgb(78, 89, 104);
  font-size: 14px;
`;

const Check = styled.span`
  height: 20px;
  flex-direction: row;
  margin-top: 20px;
  display: flex;
  align-items: stretch;
`;

const CheckBoxLabel = styled.label`
  width: 20px;
  height: 17px;
  margin: 0 5px 0 0;
`;

const InputBox = styled.input`
  width: 20px;
  height: 16px;
  margin: 0px;
  border: none;
  background: wheat;
`;

const ButtonContainer = styled.article`
  margin-top: 25px;
`;

const SignUpButton = styled.button`
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
