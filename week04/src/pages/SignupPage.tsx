import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    passwordCheck: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const email = watch("email");
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    const response = await postSignup(rest);
    console.log(response);
  };

  return (
    <div className="bg-black text-white flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-center mb-2">
            <button
              onClick={() => navigate(-1)}
              className="text-white text-xl hover:text-gray-400"
            >
              &lt;
            </button>
            <h2 className="ml-3 text-xl font-semibold">회원가입</h2>
          </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[300px]"
      >
        {/* 이메일 */}
        {step === 1 && (
          <>
            <button
              type="button"
              className="w-full border border-white py-2 rounded-md hover:bg-white hover:text-black transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <img className="w-[20px] h-[20px]" src={"images/google.png"} alt="Google Logo" />
                <span>구글 로그인</span>
              </div>
            </button>
            <div className="flex items-center gap-4 text-gray-400">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span>OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
            </div>
            <input
              {...register("email")}
              placeholder="이메일"
              className={`p-3 rounded-md border focus:outline-none ${
                errors.email
                  ? "border-red-500 bg-red-100"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!email || !!errors.email}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            >
              다음
            </button>
          </>
        )}

        {/* 비밀번호 */}
        {step === 2 && (
          <>
            <div className="text-lg font-medium text-gray-700 mb-3">
              {email && <p>✉️ {email}</p>}
            </div>

            {/* 비밀번호 입력 */}
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호"
                className={`p-3 rounded-md border w-full pr-10 ${
                  errors.password
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300 focus:border-blue-500"
                }`}
              />
              <div
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  // eye icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  // eye off icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.098-3.592m3.75-2.3A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.958 9.958 0 01-4.293 5.148M3 3l18 18"
                    />
                  </svg>
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
{/* 비밀번호 확인 */}
<div className="relative">
  <input
    {...register("passwordCheck")}
    type={showPasswordCheck ? "text" : "password"}
    placeholder="비밀번호 확인"
    className={`p-3 rounded-md border w-full pr-10 ${
      errors.passwordCheck
        ? "border-red-500 bg-red-100"
        : "border-gray-300 focus:border-blue-500"
    }`}
  />
  {/* 아이콘은 여기 딱 한 번만 렌더링 */}
  <div
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
    onClick={() => setShowPasswordCheck((prev) => !prev)}
  >
    {showPasswordCheck ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.098-3.592m3.75-2.3A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.958 9.958 0 01-4.293 5.148M3 3l18 18"
        />
      </svg>
    )}
  </div>
</div>

            {errors.passwordCheck && (
              <p className="text-red-500 text-sm">
                {errors.passwordCheck.message}
              </p>
            )}

            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={
                !password ||
                !passwordCheck ||
                !!errors.password ||
                !!errors.passwordCheck
              }
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            >
              다음
            </button>
          </>
        )}

        {/* 이름 */}
        {step === 3 && (
          <>
            <div className="flex justify-center mb-4">
              <img
                src="https://avatars.githubusercontent.com/u/90364739?v=4"
                className="w-24 h-24 rounded-full border-4 border-gray-300"
              />
            </div>
            <input
              {...register("name")}
              placeholder="이름"
              className={`p-3 rounded-md border ${
                errors.name
                  ? "border-red-500 bg-red-100"
                  : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            <button
              type="submit"
              disabled={!name || !!errors.name || isSubmitting}
              className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300"
            >
              회원가입
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
