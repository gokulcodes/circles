import { memo, useContext, useEffect, useRef } from "react";
import CircleContext from "@/controller/CircleController";
import type { Message, User } from "@/controller/CircleController";
import { useLazyQuery, useSubscription } from "@apollo/client";
import { LISTEN_CHAT_ROOM, ROOM_ACTIVITY } from "@/apollo/subscription";
import { GET_MESSAGE_BY_ROOM_ID } from "@/apollo/query";
import { getChatMessageTimeFormat } from "@/utils";

const Message = memo((props: { messageInfo: Message; myInfo: User | null }) => {
  const messageInfo = props.messageInfo;
  const myInfo = props.myInfo;
  if (!myInfo) {
    return;
  }

  const isMyMessage = messageInfo.sender === myInfo.email;
  return (
    <div
      className={`flex ${
        isMyMessage ? "flex-row-reverse" : "flex-row"
      } mx-4 gap-2`}
    >
      <div
        className={`px-4 py-2  flex border gap-2 backdrop-blur-2xl text-white items-end ${
          isMyMessage
            ? "rounded-l-2xl bg-secondary/40 border-transparent"
            : "rounded-r-2xl border-secondary"
        }   rounded-b-2xl`}
      >
        <p className="font-extralight text-sm lg:text-lg break-all">
          {messageInfo.content}
        </p>
        <span className="text-xs opacity-60">
          {getChatMessageTimeFormat(messageInfo.createdAt)}
        </span>
      </div>
    </div>
  );
});
Message.displayName = "Message";

function Chat() {
  const { state, dispatch } = useContext(CircleContext);
  const chatRenderRef = useRef<HTMLDivElement>(null);

  const onUpdate = useSubscription(LISTEN_CHAT_ROOM, {
    variables: { roomId: state.currentChatRoom?.chatRoomId },
  });

  const onRoomActivity = useSubscription(ROOM_ACTIVITY, {
    variables: { roomId: state.currentChatRoom?.chatRoomId },
  });

  const [getMessagesByRoom, { data }] = useLazyQuery(GET_MESSAGE_BY_ROOM_ID, {
    variables: { roomId: state.currentChatRoom?.chatRoomId },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    getMessagesByRoom();
    if (!data?.getMessagesByRoom?.length) {
      return;
    }
    dispatch({
      type: "SET_MESSAGES",
      payload: { ...state, messages: data.getMessagesByRoom },
    });
  }, [onUpdate.data?.broadcast, data]);

  function handleRoomUpdate(room) {
    if (!room?._id) {
      return;
    }
    const Room = {
      isGroupChat: false,
      users: room?.members.filter(
        (user) => user.user.email !== state.user?.email
      ),
      chatRoomId: room?._id,
      chatRoomName: room?.name,
      chatRoomPicture: "/circles.svg",
    };
    dispatch({
      type: "SET_CURRENT_CHAT_ROOM",
      payload: { ...state, currentChatRoom: Room },
    });
  }

  useEffect(() => {
    if (!onRoomActivity.loading && onRoomActivity.data) {
      handleRoomUpdate(onRoomActivity.data?.roomActivity);
    }
  }, [onRoomActivity.data]);

  useEffect(() => {
    if (!chatRenderRef.current) {
      return;
    }
    chatRenderRef.current.scrollTop = chatRenderRef.current?.scrollHeight;
  }, [state.messages]);

  return (
    <div
      ref={chatRenderRef}
      id="chatRender"
      className="flex flex-col h-full overflow-scroll py-20 lg:pb-20 pb-34 gap-2"
    >
      {state.messages.map((message) => (
        <Message key={message._id} messageInfo={message} myInfo={state.user} />
      ))}
    </div>
  );
}

export default Chat;
