import { ACCEPT_FRIEND_REQUEST } from "@/apollo/mutation";
import type { User } from "@/controller/CircleController";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { BiCheck } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

export default function FriendRequest(props: { user: User }) {
  const [acceptRequest] = useMutation(ACCEPT_FRIEND_REQUEST);
  if (!props.user) {
    return;
  }

  async function handleAcceptRequest() {
    await acceptRequest({
      variables: {
        friendEmail: props.user?.email,
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
        <p>{props.user?.username}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleAcceptRequest}
          className="p-2 hover:bg-green-400/30 bg-green-400/10 text-green-400 cursor-pointer rounded-2xl"
        >
          <BiCheck />
        </button>
        <button className="p-2 hover:bg-red-400/30 bg-red-400/10 text-red-400 cursor-pointer rounded-2xl">
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
}
