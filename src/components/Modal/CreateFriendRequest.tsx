import { MAKE_FRIEND_REQUEST } from "@/apollo/mutation";
import CircleContext from "@/controller/CircleController";
import { useMutation } from "@apollo/client";
import { useContext, useRef, useState } from "react";

export default function CreateFriendRequest() {
  const [makeFriendRequest, { loading, data, error }] =
    useMutation(MAKE_FRIEND_REQUEST);
  const friendsEmailInputRef = useRef<HTMLInputElement>(null);
  const [inputError, setInputError] = useState<string | null>(null);

  const { state, dispatch } = useContext(CircleContext);
  function handleClose() {
    dispatch({
      type: "UPDATE_MODAL",
      payload: { ...state, modalName: "" },
    });
  }

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

  async function handleSubmit() {
    if (!friendsEmailInputRef.current) {
      return;
    }

    const friendEmail = friendsEmailInputRef.current.value;
    if (!emailValidation(friendEmail)) {
      setInputError("Please enter a valid email address");
      return;
    }
    // console.log(friendEmail);
    await makeFriendRequest({
      variables: {
        friendEmail: friendEmail,
      },
    });
    handleClose();
  }

  return (
    <div className="p-6 animate-openup flex flex-col gap-6 bg-background rounded-2xl border w-11/12 lg:w-1/3 border-white/10">
      <div className="gap-4 flex flex-col">
        <h2 className="text-xl">Add a new friend</h2>
        <div className="flex mt-2 flex-col gap-2 w-full">
          <label className="text-sm" htmlFor="friendsEmail">
            Friends Email Address
          </label>
          <input
            ref={friendsEmailInputRef}
            type="email"
            onChange={(e) => emailValidation(e.target.value)}
            className="w-full p-4 border border-white/10 rounded-2xl outline-none focus-within:border-primary"
            id="friendsEmail"
            placeholder="Enter friends email"
          />
        </div>
        {inputError && <p className="text-red-400 mb-2">{inputError}</p>}
      </div>
      {error && <p className="text-red-400">{error.message}</p>}
      {data && <p className="text-green-400">Friend request successful!</p>}
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
