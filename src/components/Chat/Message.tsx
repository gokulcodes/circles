import { DELETE_MESSAGE, SEND_REACTION_TO_MESSAGE } from "@/apollo/mutation";
import { Message, User } from "@/types";
import { getChatMessageTimeFormat } from "@/utils";
import { useMutation } from "@apollo/client";
import clsx from "clsx";
import { memo } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";

function Reaction(props: { messageInfo: Message; myInfo: User | null }) {
  const [deleteMessage, { loading }] = useMutation(DELETE_MESSAGE);
  const [sendReaction] = useMutation(SEND_REACTION_TO_MESSAGE);
  const reactions = ["😀", "😂", "❤️", "🔥", "🙏", "😭"];
  const messageInfo = props.messageInfo;
  const myInfo = props.myInfo;
  if (!myInfo || !messageInfo.sender) {
    return;
  }

  async function handleDeleteMessage() {
    await deleteMessage({
      variables: {
        messageId: messageInfo._id,
      },
    });
  }

  async function handleSendReaction(reaction: string) {
    await sendReaction({
      variables: {
        messageId: messageInfo._id,
        reaction: reaction,
      },
    });
  }

  const isMyMessage = messageInfo.sender === myInfo.email;
  const isMyReaction = messageInfo.reactions
    .filter((reaction) => reaction.senderEmail === myInfo.email)
    .map((reaction) => reaction.reactionString);

  return (
    <div
      id="reaction-card"
      className={`hidden animate-openup ${
        isMyMessage ? "right-12" : "left-12"
      }  px-4 py-2 z-10 absolute shadow-2xl -top-12 transition-all group-hover:flex items-center flex-row border border-secondary gap-2 bg-background/90 backdrop-blur-2xl rounded-full`}
    >
      {reactions.map((reaction) => (
        <button
          key={reaction}
          onClick={() => handleSendReaction(reaction)}
          className={`w-6 h-6 p-4 text-2xl ${
            isMyReaction?.[0] === reaction
              ? "bg-primary/40 border-primary/40"
              : "border-transparent"
          } origin-center border flex items-center justify-center rounded-full cursor-pointer hover:scale-150 transform `}
        >
          {reaction}
        </button>
      ))}
      {isMyMessage ? (
        <>
          <hr className="transform h-full w-1 rotate-90" />
          <button
            onClick={() => handleDeleteMessage()}
            title="Delete Message"
            className="p-2 text-white text-lg origin-center flex items-center justify-center cursor-pointer hover:scale-150 transform "
          >
            {loading ? (
              <img
                loading="lazy"
                className="w-7"
                src="/loader.svg"
                alt="loading"
              />
            ) : (
              <RiDeleteBin7Line />
            )}
          </button>
        </>
      ) : null}
    </div>
  );
}

function MessageReactions(props: {
  messageInfo: Message;
  isMyMessage: boolean;
}) {
  const { messageInfo, isMyMessage } = props;

  return (
    <div className="flex items-center gap-2 -bottom-2">
      {messageInfo.reactions.map((reaction) => (
        <span
          className={clsx(
            "w-6 h-6 flex items-center justify-center border text-base backdrop-blur-2xl rounded-2xl animate-pop",
            {
              "bg-primary/10 border-primary/40 cursor-pointer": isMyMessage,
              "border-white/20 bg-background": !isMyMessage,
            }
          )}
          key={reaction.senderEmail}
        >
          {reaction.reactionString}
        </span>
      ))}
    </div>
  );
}

const MessageView = memo(
  (props: { messageInfo: Message; myInfo: User | null }) => {
    const messageInfo = props.messageInfo;
    const myInfo = props.myInfo;

    if (!myInfo || !messageInfo.sender) {
      return;
    }

    const isMyMessage = messageInfo.sender === myInfo.email;
    return (
      <div
        className={clsx("flex animate-openup mx-4 gap-2", {
          "flex-row-reverse": isMyMessage,
          "flex-row": !isMyMessage,
        })}
      >
        <div
          className={clsx(
            "px-4 relative py-2 group max-w-10/12 lg:max-w-1/2 flex flex-col  border gap-1 backdrop-blur-2xl text-white rounded-b-2xl",
            {
              "rounded-l-2xl bg-secondary/40 border-transparent items-end ":
                isMyMessage,
              "rounded-r-2xl border-secondary items-start": !isMyMessage,
            }
          )}
          style={{ width: "fit-content" }}
        >
          <p
            className={clsx("font-extralight text-sm lg:text-lg break-all", {
              "text-right": isMyMessage,
              "text-left": !isMyMessage,
            })}
          >
            {messageInfo.content}
          </p>
          <span className="text-xs gap-4 w-full flex items-center justify-between ">
            <MessageReactions
              messageInfo={messageInfo}
              isMyMessage={isMyMessage}
            />
            <span className="opacity-60">
              {getChatMessageTimeFormat(messageInfo.createdAt)}
            </span>
          </span>
          <Reaction messageInfo={messageInfo} myInfo={myInfo} />
        </div>
      </div>
    );
  }
);

MessageView.displayName = "MessageView";

export default MessageView;
