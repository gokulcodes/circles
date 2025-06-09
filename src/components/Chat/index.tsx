import { Ref, useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Chat from "./Chat";
import CircleContext from "@/controller/CircleController";
import Image from "next/image";
// import { useSubscription } from "@apollo/client";
// import { USER_ACTIVITY } from "@/apollo/subscription";

function ChatWindow(props: { ref: Ref<HTMLDivElement> }) {
  const { state } = useContext(CircleContext);
  // const onActive = useSubscription(USER_ACTIVITY);
  // if (!state.currentChatRoom) {
  //   return;
  // }

  return (
    <div
      ref={props.ref}
      className="lg:border py-4 rounded-2xl h-full lg:h-[99.2vh] lg:border-white/20 lg:ml-2 lg:my-2 mb-10 w-full relative"
    >
      {state.currentChatRoom ? (
        <>
          <ChatHeader />
          <Chat />
          <ChatInput />
        </>
      ) : (
        <div className="flex w-full gap-2 items-center justify-center h-full flex-col">
          <Image
            src="/logo_flat.png"
            alt="Circles Logo"
            width={100}
            height={100}
            className="opacity-80"
          />
          <p className="font-extralight opacity-60 w-8/12 text-center">
            Open the sidebar to add and chat with your closest people.
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
