import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import { UserSigninInformation, validateSignin } from "../utils/validate";

const LoginPage = () => {
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = () => {
    console.log(values);
  };

  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">

      <div className="flex flex-col items-center justify-center flex-1">
        <div className="w-[300px] flex flex-col gap-4">
          
        <div className="flex items-center justify-center mb-2">
            <button
              onClick={() => navigate(-1)}
              className="text-white text-xl hover:text-gray-400"
            >
              &lt;
            </button>
            <h2 className="ml-3 text-xl font-semibold">로그인</h2>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
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
            {...getInputProps("email")}
            name="email"
            className={`bg-black border w-full p-2 rounded text-white placeholder-gray-400 
              ${errors?.email && touched?.email ? "border-red-500 bg-red-200 text-black" : "border-gray-400"}`}
            type={"email"}
            placeholder={"이메일을 입력해주세요!"}
          />
          {errors?.email && touched?.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <input
            {...getInputProps("password")}
            className={`bg-black border w-full p-2 rounded text-white placeholder-gray-400 
              ${errors?.password && touched?.password ? "border-red-500 bg-red-200 text-black" : "border-gray-400"}`}
            type={"password"}
            placeholder={"비밀번호를 입력해주세요!"}
          />
          {errors?.password && touched?.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isDisabled}
            className="w-full bg-white text-black py-2 rounded-md text-lg font-medium hover:bg-gray-300 transition-colors disabled:bg-gray-500"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
