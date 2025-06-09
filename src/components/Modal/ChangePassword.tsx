import { CHANGE_PASSWORD } from "@/apollo/mutation";
import CircleContext from "@/controller/CircleController";
import { useMutation } from "@apollo/client";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
export default function ChangePassword() {
  const router = useRouter();
  const [changePassword, { loading, data, error }] =
    useMutation(CHANGE_PASSWORD);
  const oldPassRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const { state, dispatch } = useContext(CircleContext);
  function handleClose() {
    dispatch({
      type: "UPDATE_MODAL",
      payload: { ...state, modalName: "" },
    });
  }

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

  async function handleSubmit() {
    if (!oldPassRef.current || !newPassRef.current) {
      return;
    }

    const oldPass = oldPassRef.current.value;
    const newPass = newPassRef.current.value;
    if (!passwordValidation(oldPass) || !passwordValidation(newPass)) {
      setInputError(
        "Password should contain atleast One Special Character, One Uppercase Character, One Numeric value"
      );
      return;
    }
    await changePassword({
      variables: {
        oldPassword: oldPass,
        newPassword: newPass,
      },
    });
    // const updateUserInfo = response.data.updateAbout;
    // dispatch({
    //   type: "SET_USER",
    //   payload: { ...state, user: updateUserInfo },
    // });
    handleClose();
    router.push("/login");
  }

  return (
    <div className="p-6 animate-openup flex flex-col gap-6 bg-background rounded-2xl border w-11/12 lg:w-1/3 border-white/10">
      <div className="gap-4 flex flex-col">
        <h2 className="text-xl">Change Password</h2>
        <div className="flex mt-2 flex-col gap-2 w-full">
          <label className="text-sm" htmlFor="oldPass">
            Old Password
          </label>
          <input
            ref={oldPassRef}
            className="w-full p-4 border border-white/10 rounded-2xl outline-none focus-within:border-primary"
            id="oldPass"
            placeholder="Old Password"
          />
          <label className="text-sm mt-4" htmlFor="newPass">
            New Password
          </label>
          <input
            ref={newPassRef}
            className="w-full p-4 border border-white/10 rounded-2xl outline-none focus-within:border-primary"
            id="newPass"
            placeholder="New Password"
          />
        </div>
        {inputError && <p className="text-red-400 mb-2">{inputError}</p>}
      </div>
      {error && <p className="text-red-400">{error.message}</p>}
      {data && <p className="text-green-400">About update successful!</p>}
      <div className="flex gap-4 w-full justify-end">
        <button
          onClick={handleClose}
          className="px-10 py-3 cursor-pointer rounded-xl border border-white/20 hover:bg-white/5 "
        >
          Close
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-10 py-3 cursor-pointer rounded-xl hover:brightness-110 bg-primary"
        >
          {loading ? (
            <img
              loading="lazy"
              className="w-7"
              src="/loader.svg"
              alt="loading"
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
