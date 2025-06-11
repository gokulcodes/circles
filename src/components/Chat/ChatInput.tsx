import { SEND_MESSAGE, UPDATE_TYPING } from "@/apollo/mutation";
import CircleContext from "@/controller/CircleController";
import { debounce } from "@/utils";
import { useMutation } from "@apollo/client";
import { useContext, useRef } from "react";
import { BiSend } from "react-icons/bi";

export default function ChatInput() {
  const { state } = useContext(CircleContext);
  const isTypingRef = useRef(false);
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [updateTyping] = useMutation(UPDATE_TYPING);

  async function handleUpdateTyping() {
    if (isTypingRef.current) {
      return;
    }
    isTypingRef.current = true;
    await updateTyping({
      variables: {
        roomId: state.currentChatRoom?.chatRoomId,
        isTyping: true,
      },
    });
  }

  const handleKeyUp = debounce(async () => {
    if (!isTypingRef.current) {
      return;
    }
    isTypingRef.current = false;
    await updateTyping({
      variables: {
        roomId: state.currentChatRoom?.chatRoomId,
        isTyping: false,
      },
    });
  });

  async function handleMessageSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formInput = event.target as HTMLFormElement;
    const formData = new FormData(formInput);
    const content = formData.get("message");
    formInput.reset();
    await sendMessage({
      variables: {
        roomId: state.currentChatRoom?.chatRoomId,
        content: content,
      },
    });
  }

  return (
    <form
      className="absolute z-50 bottom-0 lg:bottom-0 p-4 w-full bg-background/40 backdrop-blur-2xl rounded-b-2xl border-t border-white/10 right-0 flex gap-4"
      onSubmit={handleMessageSend}
    >
      <div className=" w-full flex gap-4">
        <input
          autoComplete="off"
          className="p-3 rounded-xl bg-white/5 border border-white/10 w-full outline-none focus-within:border-primary"
          name="message"
          onKeyDown={() => handleUpdateTyping()}
          onKeyUp={() => handleKeyUp()}
          type="text"
          placeholder="Type anything..."
        />
        <button className="flex bg-primary hover:brightness-110 px-4 lg:px-8 cursor-pointer text-center items-center gap-2 rounded-xl">
          <BiSend className="text-2xl lg:text-lg" />
          <p className="hidden lg:flex">Send</p>
        </button>
      </div>
    </form>
  );
}
