"use client";
import { SIGNUP } from "@/apollo/mutation";
// import CircleContext from "@/controller/CircleController";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// import { useContext } from "react";

export default function Signup() {
  // const { state, dispatch } = useContext(CircleContext);
  const router = useRouter();
  const [inputError, setInputError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [signUp, { data, loading, error }] = useMutation(SIGNUP);

  const usernameValidation = (username: string | undefined) => {
    if (!username) {
      return false;
    }
    if (!(username.length >= 6 && username.length <= 24)) {
      setInputError("Username should be within 6 to 24 characters");
      return false;
    }
    const specialCharacters = new RegExp("[^A-Za-z0-9]");
    if (specialCharacters.test(username)) {
      setInputError("Username should not contain special characters");
      return false;
    }
    const startsWithNumber = new RegExp("^\\d");
    if (startsWithNumber.test(username)) {
      setInputError("Username should not start with numbers");
      return false;
    }
    setInputError(null);
    return true;
  };

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

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formInput = e.target as HTMLFormElement;
    const formData = new FormData(formInput);
    const username = formData.get("username")?.toString();
    const emailAddress = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    // console.log(username, emailAddress, password);
    if (
      !(
        usernameValidation(username) &&
        emailValidation(emailAddress) &&
        passwordValidation(password)
      )
    ) {
      setInputError("Validation failed. Please enter valid details");
      return;
    }
    // Handle sign up logic here
    try {
      await signUp({
        variables: {
          username,
          email: emailAddress,
          password,
        },
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="signup"
      className="w-full h-[100vh] flex items-center justify-center"
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
                Welcome to Circles
              </h1>
              <p className="text-white/60 font-extralight text-center text-base lg:text-xl">
                Create your account to join Circles and connect with your closes
                ones.
              </p>
            </div>
          </div>
          <form onSubmit={handleSignup}>
            <label className="flex items-center gap-2 ml-1" htmlFor="username">
              Username
              <p
                role="tooltip"
                title="Username should be within 6 to 24 characters. Username should not contain special characters. Username should not start with numbers"
                className="border rounded-full items-center flex px-1 w-4 h-4 opacity-50 text-xs cursor-pointer"
              >
                ?
              </p>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              minLength={6}
              autoComplete="off"
              maxLength={12}
              onChange={(event) => usernameValidation(event.target.value)}
              aria-label="username"
              placeholder="Username"
              className="w-full mt-2 outline-none focus-within:border-primary p-4 mb-4 bg-transparent border border-white/20 rounded-lg text-white"
            />
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
              name="email"
              autoComplete="off"
              aria-label="email"
              onChange={(event) => emailValidation(event.target.value)}
              placeholder="Email Address"
              className="w-full mt-2 outline-none focus-within:border-primary p-4 mb-4 bg-transparent border border-white/20 rounded-lg text-white"
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
                autoComplete="off"
                type={isPasswordVisible ? "text" : "password"}
                onChange={(event) => passwordValidation(event.target.value)}
                aria-label="password"
                placeholder="Password"
                className="w-full mt-2 outline-none focus-within:border-primary p-4 mb-4 bg-transparent border border-white/20 rounded-lg text-white"
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
                "Sign Up"
              )}
            </button>
          </form>
          {/* {loading && <p className="text-white">Signing up...</p>} */}
          {error && <p className="text-red-400 mt-6">{error.message}</p>}
          {data && <p className="text-green-400 mt-6">Sign up successful!</p>}
        </div>
        <div className="pb-8 px-8">
          <p className="text-white">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
