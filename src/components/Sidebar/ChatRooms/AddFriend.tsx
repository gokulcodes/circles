import CircleContext from "@/controller/CircleController";
import { useContext } from "react";
import { IoPersonAdd } from "react-icons/io5";

export default function AddFriend() {
  const { state, dispatch } = useContext(CircleContext);

  function handleCreateFriendRequest() {
    dispatch({
      type: "UPDATE_MODAL",
      payload: { ...state, modalName: "ADD_FRIEND" },
    });
  }

  return (
    <button
      onClick={handleCreateFriendRequest}
      className="p-3 border flex items-center justify-center gap-2 cursor-pointer hover:text-primary border-white/10 text-center rounded-xl"
    >
      <IoPersonAdd />
      Invite Friend
    </button>
  );
}
