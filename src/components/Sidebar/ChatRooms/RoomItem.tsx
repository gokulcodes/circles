import CircleContext from "@/controller/CircleController";
import { RoomActivityType, User } from "@/types";
import { getCharCode, getOtherUsersFromRoom } from "@/utils";
import { useContext } from "react";

export default function RoomItem(props: { room: RoomActivityType }) {
  const { state, dispatch } = useContext(CircleContext);

  function handleRoomUpdate(room: RoomActivityType) {
    if (!room || !room._id) {
      return;
    }
    const friendMetadata = getOtherUsersFromRoom(
      room.members,
      state.user?.email
    );
    if (!friendMetadata) {
      return;
    }
    // members will return all users from the room
    const formatedRoomData = {
      friend: {
        info: friendMetadata.user,
        isTyping: friendMetadata.isTyping,
      },
      chatRoomId: room._id,
      chatRoomName: room.name,
      chatRoomPicture: "/circles.svg",
    };
    dispatch({
      type: "SET_CURRENT_CHAT_ROOM",
      payload: { ...state, currentChatRoom: formatedRoomData },
    });
  }

  function getFriendsName(
    members: Array<{ user: User; isTyping: boolean }>
  ): string {
    let username = "";
    for (let i = 0; i < members.length; i++) {
      if (members[i].user.email !== state.user?.email) {
        username = members[i].user.username;
        break;
      }
    }
    return username;
  }

  const friendsName = getFriendsName(props.room?.members);

  return (
    <button
      onClick={() => handleRoomUpdate(props.room)}
      className="flex flex-row justify-between cursor-pointer hover:bg-white/5 w-full p-4 border-b border-white/10"
    >
      <div className="flex items-center gap-2">
        <div
          style={{ filter: `hue-rotate(${getCharCode(friendsName)}deg)` }}
          className={`bg-radial-[at_10%_25%] rounded-lg from-sky-200/80 via-blue-400/60 to-indigo-900 to-90% w-8 h-8`}
        />
        <p>{friendsName}</p>
      </div>
    </button>
  );
}
