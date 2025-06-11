import { UPDATE_ABOUT } from "@/apollo/mutation";
import CircleContext from "@/controller/CircleController";
import { useMutation } from "@apollo/client";
import { useContext, useRef } from "react";
import Image from "next/image";

export default function UpdateAbout() {
  const [updateAbout, { loading, data, error }] = useMutation(UPDATE_ABOUT);
  const aboutTextRef = useRef<HTMLTextAreaElement>(null);
  const { state, dispatch } = useContext(CircleContext);
  function handleClose() {
    dispatch({
      type: "UPDATE_MODAL",
      payload: { ...state, modalName: "" },
    });
  }

  async function handleSubmit() {
    if (!aboutTextRef.current) {
      return;
    }
    const textContent = aboutTextRef.current.value;
    const response = await updateAbout({
      variables: {
        about: textContent,
      },
    });
    const updateUserInfo = response.data.updateAbout;
    dispatch({
      type: "SET_USER",
      payload: { ...state, user: updateUserInfo },
    });
    handleClose();
  }

  return (
    <div className="p-6 animate-openup flex flex-col gap-6 bg-background rounded-2xl border w-11/12 lg:w-1/3 border-white/10">
      <div className="gap-4 flex flex-col">
        <h2 className="text-xl">Update About</h2>
        <textarea
          rows={4}
          ref={aboutTextRef}
          className="w-full outline-none focus-within:border-primary rounded-2xl p-4 border border-white/10"
          placeholder="Say anything..."
        ></textarea>
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
            <Image
              className="w-7"
              src="/loader.svg"
              alt="loading"
              width={28}
              height={28}
              priority={false}
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
