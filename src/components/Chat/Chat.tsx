import { useContext, useEffect, useRef } from "react";
import CircleContext from "@/controller/CircleController";
import { useSubscription } from "@apollo/client";
import { ROOM_ACTIVITY } from "@/apollo/subscription";
import Message from "./Message";
import { RoomActivityType } from "@/types";
import { getOtherUsersFromRoom } from "@/utils";
import Image from "next/image";

function Chat() {
  const { state, dispatch } = useContext(CircleContext);
  const chatRenderRef = useRef<HTMLDivElement>(null);
  const { currentChatRoom } = state;

  const onRoomActivity = useSubscription(ROOM_ACTIVITY, {
    variables: { roomId: currentChatRoom?.chatRoomId },
  });

  useEffect(() => {
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
    if (!onRoomActivity.loading && onRoomActivity.data) {
      console.log("onRoomActivity");
      handleRoomUpdate(onRoomActivity.data?.roomActivity);
    }
  }, [onRoomActivity, dispatch]);

  useEffect(() => {
    if (!chatRenderRef.current) {
      return;
    }
    chatRenderRef.current.scrollTop = chatRenderRef.current?.scrollHeight + 10;
  }, [state.messages, state.currentChatRoom]);

  if (!currentChatRoom) {
    return;
  }

  const isTyping = currentChatRoom.friend.isTyping;

  if (!state.messages.length) {
    return (
      <div
        ref={chatRenderRef}
        id="chatRender"
        className="flex flex-col h-full overflow-scroll py-20 lg:pb-20 pb-34 gap-2"
      >
        <div className="flex w-full gap-2 items-center justify-center h-full flex-col">
          <Image
            src="/message-empty.gif"
            alt="Circles Logo"
            width={100}
            unoptimized
            height={100}
            className="opacity-80 w-24"
          />
          <p className="-mt-2 font-extralight opacity-60 lg:w-4/12 w-11/12 flex flex-col items-center justify-center text-center">
            <span>{`Time to say hello to ${currentChatRoom.friend.info.username}!`}</span>
            <span>{`Send over a "Hi" to kick things off.`}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={chatRenderRef}
      id="chatRender"
      className="flex flex-col h-full overflow-scroll py-20 lg:pb-20 pb-34 gap-2"
    >
      {state.messages.map((message) => (
        <Message key={message._id} messageInfo={message} myInfo={state.user} />
      ))}
      <div>
        {isTyping && (
          <div
            style={{ width: "fit-content" }}
            className="px-6 animate-openup ml-4 relative py-2 group max-w-10/12 lg:max-w-1/2 flex flex-col  border gap-1 backdrop-blur-2xl text-white rounded-b-2xl rounded-r-2xl border-secondary items-start"
          >
            <Image
              className="w-7"
              src="/typing.svg"
              alt="loading"
              width={28}
              height={28}
              priority={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
