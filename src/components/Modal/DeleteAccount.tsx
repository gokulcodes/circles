import { DELETE_ACCOUNT } from "@/apollo/mutation";
import CircleContext from "@/controller/CircleController";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function DeleteAccount() {
  const router = useRouter();
  const [deleteAccount, { loading, data, error }] = useMutation(DELETE_ACCOUNT);
  const { state, dispatch } = useContext(CircleContext);
  function handleClose() {
    dispatch({
      type: "UPDATE_MODAL",
      payload: { ...state, modalName: "" },
    });
  }

  async function handleSubmit() {
    await deleteAccount();
    handleClose();
    router.push("/signup");
  }

  return (
    <div className="p-6 animate-openup flex flex-col gap-6 bg-background rounded-2xl border w-1/3 border-white/10">
      <div className="gap-4 flex flex-col">
        <h2 className="text-xl font-bold">Delete Account</h2>
        <p className="font-extralight">
          Are you show you want permanently delete your account and remove all
          your data from Circles?
        </p>
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
          className="px-10 py-3 cursor-pointer rounded-xl hover:brightness-110 bg-red-400"
        >
          {loading ? (
            <img
              loading="lazy"
              className="w-7"
              src="/loader.svg"
              alt="loading"
            />
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
}
