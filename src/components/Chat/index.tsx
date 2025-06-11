import { Ref, useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Chat from "./Chat";
import CircleContext from "@/controller/CircleController";
import Image from "next/image";

function ChatWindow(props: { ref: Ref<HTMLDivElement> }) {
  const { state } = useContext(CircleContext);

  if (!state.currentChatRoom) {
    return (
      <div
        ref={props.ref}
        className="lg:border py-4 rounded-2xl h-full lg:h-[98.5vh] lg:border-white/20 lg:ml-2 lg:my-2 mb-10 w-full relative"
      >
        <div className="flex w-full gap-4 items-center justify-center h-full flex-col">
          <Image
            src="/logo_name.png"
            alt="Circles Logo"
            width={100}
            height={100}
            className="opacity-80 w-48"
          />
          <p className="font-extralight opacity-60 lg:w-4/12 w-11/12 text-center">
            A text based distraction-free personal space for connecting with
            your closed circles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={props.ref}
      className="lg:border py-4 rounded-2xl h-full lg:h-[98.5vh] lg:border-white/20 lg:ml-2 lg:my-2 mb-10 w-full relative"
    >
      <ChatHeader />
      <Chat />
      <ChatInput />
    </div>
  );
}

export default ChatWindow;
