import React, { useState } from "react";
import Button from "../atom/Button";
import axios from "axios";

import {
  validateName,
  validateId,
  validatePwd,
  validateConfirmPwd,
  validateEmail,
  validatePhoneNumber,
} from "./SignUpCheck";
import FormField from "./FormField";

const SignUpForm: React.FC = () => {
  // 각 입력 필드에 대한 상태 관리
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // 각 필드의 에러 메시지를 관리하는 상태
  const [errors, setErrors] = useState({
    name: "",
    id: "",
    pwd: "",
    confirmPwd: "",
    email: "",
    phoneNumber: "",
  });

  // 이름 입력 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setErrors((prev) => ({ ...prev, name: validateName(value) }));
  };

  // 아이디 입력 핸들러
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    setErrors((prev) => ({ ...prev, id: validateId(value) }));
  };

  // 비밀번호 입력 핸들러
  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPwd(value);
    setErrors((prev) => ({
      ...prev,
      pwd: validatePwd(value),
      // 비밀번호가 변경되면 비밀번호 확인도 다시 검증
      confirmPwd: validateConfirmPwd(value, confirmPwd),
    }));
  };

  // 비밀번호 확인 입력 핸들러
  const handleConfirmPwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPwd(value);
    setErrors((prev) => ({
      ...prev,
      confirmPwd: validateConfirmPwd(pwd, value),
    }));
  };

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  // 전화번호 입력 핸들러
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setErrors((prev) => ({ ...prev, phoneNumber: validatePhoneNumber(value) }));
  };

  // 회원가입 제출 핸들러
  const handleSignUp = async () => {
    // 모든 필드의 에러 검사
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors) {
      try {
        // 서버에 회원가입 요청
        const response = await axios.post("http://localhost:3001/api/signup", {
          name,
          id,
          pwd,
          email,
          phoneNumber,
        });
        console.log("서버 응답:", response.data);
        alert("가입 성공!");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Sign-up error", error.response?.data);
          alert(
            `가입 중 오류가 발생했습니다: ${
              error.response?.data?.error || error.message
            }`
          );
        } else {
          console.error("Sign-up error", error);
          alert("가입 중 알 수 없는 오류가 발생했습니다.");
        }
      }
    } else {
      alert("입력 정보를 다시 확인해주세요.");
    }
  };

  return (
    <div className="bg-pink-100 p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 className="text-center pb-5 text-2xl font-bold mb-6">SIGN UP</h1>
      {/* 각 입력 필드에 대한 FormField 컴포넌트 */}
      <FormField
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="이름"
        error={errors.name}
      />
      <FormField
        type="text"
        value={id}
        onChange={handleIdChange}
        placeholder="아이디"
        error={errors.id}
      />
      <FormField
        type="password"
        value={pwd}
        onChange={handlePwdChange}
        placeholder="비밀번호"
        error={errors.pwd}
      />
      <FormField
        type="password"
        value={confirmPwd}
        onChange={handleConfirmPwdChange}
        placeholder="비밀번호 확인"
        error={errors.confirmPwd}
      />
      <FormField
        type="text"
        value={email}
        onChange={handleEmailChange}
        placeholder="이메일"
        error={errors.email}
      />
      <FormField
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="전화번호"
        error={errors.phoneNumber}
      />
      <Button text="SIGN UP" onClick={handleSignUp} />
    </div>
  );
};

export default SignUpForm;
