import CircleContext from "@/controller/CircleController";
import Image from "next/image";
import { useContext } from "react";

export default function RoomItem(props: { room: object }) {
  const { state, dispatch } = useContext(CircleContext);

  function handleRoomUpdate() {
    const Room = {
      isGroupChat: false,
      users: props.room?.members.filter(
        (user) => user.user.email !== state.user?.email
      ),
      chatRoomId: props.room?._id,
      chatRoomName: props.room?.name,
      chatRoomPicture: "/circles.svg",
    };
    dispatch({
      type: "SET_CURRENT_CHAT_ROOM",
      payload: { ...state, currentChatRoom: Room },
    });
  }

  function getFriendsName(members) {
    let username = "";
    for (let i = 0; i < members.length; i++) {
      if (members[i].user.email !== state.user?.email) {
        username = members[i].user.username;
        break;
      }
    }
    return username;
  }

  return (
    <button
      onClick={handleRoomUpdate}
      className="flex flex-row justify-between cursor-pointer hover:bg-white/5 w-full p-4 border-b border-white/10"
    >
      <div className="flex items-center gap-2">
        <Image
          className="overflow-hidden object-cover w-8"
          src="/circles.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <p>{getFriendsName(props.room?.members)}</p>
      </div>
    </button>
  );
}
