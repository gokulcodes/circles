"use client";
import { LOGIN } from "@/apollo/mutation";
import CircleContext from "@/controller/CircleController";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const { state, dispatch } = useContext(CircleContext);
  const router = useRouter();
  const [inputError, setInputError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [login, { data, loading, error }] = useMutation(LOGIN);

  const emailValidation = (email: string | undefined) => {
    if (!email) {
      return false;
    }
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|protonmail\.com)$/
    );
    if (!emailRegex.test(email)) {
      setInputError("Please enter a valid Email Address");
      return false;
    }
    setInputError(null);
    return true;
  };

  const passwordValidation = (password: string | undefined) => {
    if (!password) {
      return false;
    }
    const passwordRegex = new RegExp(
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#\$%^&])[\w\d!@#\$%^&]{8,}$/
    );
    if (!(password.length >= 8 && password.length <= 24)) {
      setInputError("Password should be within 8 to 24 characters");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setInputError(
        "Password should contain atleast One Special Character, One Uppercase Character, One Numeric value"
      );
      return false;
    }
    setInputError(null);
    return true;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formInput = e.target as HTMLFormElement;
    const formData = new FormData(formInput);
    const emailAddress = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    // console.log(username, emailAddress, password);
    if (!(emailValidation(emailAddress) && passwordValidation(password))) {
      setInputError("Validation failed. Please enter valid details");
      return;
    }
    // Handle login up logic here
    try {
      const response = await login({
        variables: {
          email: emailAddress,
          password,
        },
      });
      const loginInfo = response.data.userLogin;
      localStorage.setItem("accessToken", loginInfo.accessToken);
      localStorage.setItem("refreshToken", loginInfo.refreshToken);
      dispatch({
        type: "SET_USER",
        payload: { ...state, user: loginInfo.user },
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("login", state);
  return (
    <div
      id="login"
      className="w-full h-[100vh] bg-blend-multiply flex items-center justify-center"
    >
      <div className="lg:w-1/2 2xl:w-1/4 animate-openup shadow-2xl md:w-1/2 w-11/12 bg-background/80 backdrop-blur-lg border border-white/10 rounded-2xl">
        <div className="p-8">
          <div className="flex flex-col items-center justify-center w-full">
            <Image
              src="/circles.svg"
              alt="Circles Logo"
              width={100}
              height={100}
              className="mx-auto scale-90 lg:scale-100 transition-all hover:scale-90 transform cursor-pointer drop-shadow-[0_25px_45px_rgba(88,124,255,0.25)] drop-shadow-primary mb-6"
            />
            <div className="flex flex-col items-center justify-center gap-2 mb-6">
              <h1 className="text-2xl text-center font-bold text-white">
                Welcome Back!
              </h1>
              <p className="text-white/60 font-extralight text-center text-base lg:text-xl">
                Log in to Circles and reconnect with the people who matter most.
              </p>
            </div>
          </div>
          <form onSubmit={handleLogin}>
            <label className="flex items-center gap-2 ml-1" htmlFor="email">
              Email Address
              <p
                role="tooltip"
                title="Only Gmail, Outlook, Yahoo, Protonmail domains are acceptable for now"
                className="border rounded-full items-center flex px-1 w-4 h-4 opacity-50 text-xs cursor-pointer"
              >
                ?
              </p>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="off"
              name="email"
              aria-label="email"
              onChange={(event) => emailValidation(event.target.value)}
              placeholder="Email Address"
              className="w-full bg-background mt-2 outline-none focus-within:border-primary p-4 mb-4 border border-white/20 rounded-lg text-white"
            />
            <div className="relative ">
              <label
                className="flex items-center gap-2 ml-1"
                htmlFor="password"
              >
                Password
                <p
                  role="tooltip"
                  title="Password should contain atleast One Special Character, One Uppercase Character, One Numeric value."
                  className="border rounded-full items-center flex px-1 w-4 h-4 opacity-50 text-xs cursor-pointer"
                >
                  ?
                </p>
              </label>
              <input
                minLength={8}
                maxLength={12}
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                onChange={(event) => passwordValidation(event.target.value)}
                aria-label="password"
                placeholder="Password"
                className="w-full bg-background mt-2 outline-none focus-within:border-primary p-4 mb-4 border border-white/20 rounded-lg text-white"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-4 rounded-full cursor-pointer p-2 hover:bg-primary/10 hover:text-primary top-11"
              >
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            {inputError && <p className="text-red-400 mb-2">{inputError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full outline-none flex justify-center items-center mt-4 p-4 bg-primary hover:brightness-110 cursor-pointer rounded-lg text-white font-semibold"
            >
              {loading ? (
                <img
                  loading="lazy"
                  className="w-7"
                  src="/loader.svg"
                  alt="loading"
                />
              ) : (
                "Login"
              )}
            </button>
          </form>
          {/* {loading && <p className="text-white">Signing up...</p>} */}
          {error && <p className="text-red-400 mt-6">{error.message}</p>}
          {data && <p className="text-green-400 mt-6">Login successful!</p>}
        </div>
        <div className="pb-8 px-8">
          <p className="text-white">
            New to Circles?{" "}
            <a href="/signup" className="text-primary hover:underline">
              Create new account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
