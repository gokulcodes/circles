import { CLEAR_HISTORY } from "@/apollo/mutation";
import { GET_MESSAGE_BY_ROOM_ID } from "@/apollo/query";
import { LISTEN_CHAT_ROOM } from "@/apollo/subscription";
import CircleContext from "@/controller/CircleController";
import { getCharCode, getRelativeTime } from "@/utils";
import { useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import FriendInfo from "./FriendInfo";

function ChatHeader() {
  const { state, dispatch } = useContext(CircleContext);
  const { currentChatRoom } = state;
  const [clearHistory, { loading }] = useMutation(CLEAR_HISTORY);
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreAction, setShowMoreAction] = useState(false);

  const onUpdate = useSubscription(LISTEN_CHAT_ROOM, {
    variables: { roomId: currentChatRoom?.chatRoomId },
  });

  const [getMessagesByRoom, { data }] = useLazyQuery(GET_MESSAGE_BY_ROOM_ID, {
    variables: { roomId: currentChatRoom?.chatRoomId },
    fetchPolicy: "network-only",
  });

  async function handleClearHistory() {
    // console.log(currentChatRoom?.chatRoomId);
    await clearHistory({
      variables: {
        roomId: currentChatRoom?.chatRoomId,
      },
    });
  }

  useEffect(() => {
    getMessagesByRoom();
    if (!data?.getMessagesByRoom) {
      return;
    }
    dispatch({
      type: "SET_MESSAGES",
      payload: { ...state, messages: data.getMessagesByRoom },
    });
    setShowDetails(false);
  }, [onUpdate.data?.broadcast, dispatch, getMessagesByRoom, data]);

  const friend = currentChatRoom?.friend.info;

  if (!friend) {
    return;
  }

  return (
    <div
      id="chatHeader"
      className="flex shadow-2xl flex-col gap-4 transition-all items-start z-50 absolute top-0 left-0 lg:rounded-t-2xl w-full justify-between border-b border-white/10 p-2 bg-background/40 backdrop-blur-2xl"
    >
      <div className="flex gap-3 w-full px-2 items-center">
        <div className="rounded-2xl relative">
          <div
            style={{ filter: `hue-rotate(${getCharCode(friend.username)}deg)` }}
            className="bg-radial-[at_10%_25%] rounded-lg from-sky-200/80 via-blue-400/60 to-indigo-900 to-90% w-8 h-8"
          />
          <div
            className={clsx(
              "w-3 h-3 text-xs lg:text-base rounded-lg absolute -right-1 -bottom-1",
              {
                "bg-green-400": friend.isOnline,
                "bg-yellow-400": !friend.isOnline,
              }
            )}
          />
        </div>
        <div
          onClick={() => setShowDetails(!showDetails)}
          className="flex flex-col cursor-pointer "
        >
          <p className="text-base select-none hover:text-primary">
            {friend.username}
          </p>
          <p className="text-xs opacity-80 font-extralight">
            {friend.isOnline ? "Online" : getRelativeTime(friend.lastSeen)}
          </p>
        </div>
        <div className="flex ml-auto mr-1 items-center gap-2">
          {showMoreAction && (
            <button
              onClick={handleClearHistory}
              className="border cursor-pointer hover:text-primary hover:bg-primary/20 hover:border-transparent animate-openRight border-white/20 px-4 py-2 rounded-full"
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
                "Clear History"
              )}
            </button>
          )}
          <button
            onClick={() => setShowMoreAction(!showMoreAction)}
            className="hover:text-primary cursor-pointer mr-1 text-3xl"
          >
            {showMoreAction ? <IoClose /> : <IoIosMore />}
          </button>
        </div>
      </div>
      {showDetails && <FriendInfo friend={currentChatRoom.friend.info} />}
    </div>
  );
}

export default ChatHeader;
