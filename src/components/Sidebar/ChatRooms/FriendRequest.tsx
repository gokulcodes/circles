import {
  ACCEPT_FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST,
  DECLINE_FRIEND_REQUEST,
} from "@/apollo/mutation";
import type { User } from "@/types";
import CircleContext from "@/controller/CircleController";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useContext } from "react";
import { BiCheck } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

export default function FriendRequest(props: {
  senderInfo: User;
  receiverInfo: User;
}) {
  const { state } = useContext(CircleContext);
  let { senderInfo, receiverInfo } = props;
  const isMyRequest = senderInfo.email === state.user?.email;

  const [acceptRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
  const [cancelRequest] = useMutation(CANCEL_FRIEND_REQUEST);
  const [declineRequest] = useMutation(DECLINE_FRIEND_REQUEST);

  if (!senderInfo || !receiverInfo) {
    return;
  }

  function getInfo(identity: string) {
    if (identity === "sender") {
      if (senderInfo.email === state.user?.email) {
        return receiverInfo;
      }
      return senderInfo;
    }
    if (receiverInfo.email === state.user?.email) {
      return senderInfo;
    }
    return receiverInfo;
  }
  senderInfo = getInfo("sender");
  receiverInfo = getInfo("receiver");

  async function handleAcceptRequest() {
    await acceptRequest({
      variables: {
        friendEmail: isMyRequest ? receiverInfo.email : senderInfo.email,
      },
    });
  }

  async function handleCancelRequest() {
    await cancelRequest({
      variables: {
        friendEmail: isMyRequest ? receiverInfo.email : senderInfo.email,
      },
    });
  }

  async function handleDeclineRequest() {
    await declineRequest({
      variables: {
        friendEmail: isMyRequest ? senderInfo.email : receiverInfo.email,
      },
    });
  }

  return (
    <div className="flex flex-row justify-between w-full p-2 rounded-xl border border-white/10">
      <div className="flex items-center gap-2">
        <Image
          className="overflow-hidden object-cover w-8"
          src="/circles.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <p>{receiverInfo.username}</p>
      </div>
      <div className="flex gap-2">
        {!isMyRequest && ( // don't show accept for invite created by me
          <button
            onClick={handleAcceptRequest}
            className="p-2 hover:bg-green-400/30 bg-green-400/10 text-green-400 cursor-pointer rounded-2xl"
          >
            <BiCheck />
          </button>
        )}
        <button
          onClick={isMyRequest ? handleDeclineRequest : handleCancelRequest}
          className="p-2 hover:bg-red-400/30 bg-red-400/10 text-red-400 cursor-pointer rounded-2xl"
        >
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
}
