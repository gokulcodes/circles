import CircleContext from "@/controller/CircleController";
import { getRelativeTime } from "@/utils";
import Image from "next/image";
import { useContext } from "react";
import { SlOptionsVertical } from "react-icons/sl";

function ChatHeader() {
  const { state } = useContext(CircleContext);

  const friend = state.currentChatRoom?.users?.[0]?.user;
  const isTyping = state.currentChatRoom?.users?.[0]?.isTyping;
  // console.log(state.currentChatRoom)

  if (!friend) {
    return;
  }

  return (
    <div className="flex z-50 items-center absolute top-0 left-0 lg:rounded-t-2xl w-full justify-between border-b border-white/10 p-2 bg-background/40 backdrop-blur-2xl">
      <div className="flex gap-3 w-full items-center">
        <div className="rounded-2xl border-4 border-secondary relative">
          <Image
            className="overflow-hidden object-cover lg:w-10 w-8"
            src="/circles.svg"
            alt="logo"
            width={100}
            height={100}
          />
          <div
            className={`lg:w-4 lg:h-4 w-2 text-xs lg:text-base h-2 rounded-lg absolute -right-1 -bottom-1 ${
              friend.isOnline ? "bg-green-400" : "bg-yellow-400"
            } `}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-base">{friend.username}</p>
          <p className="text-xs opacity-80 font-extralight">
            {isTyping
              ? "Typing..."
              : friend.isOnline
              ? "Online"
              : getRelativeTime(friend.lastSeen)}
          </p>
        </div>
        <button className="ml-auto hover:text-primary cursor-pointer mr-1 p-2">
          <SlOptionsVertical />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
