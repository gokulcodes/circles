import { Ref, useState } from "react";
import AddFriend from "./AddFriend";
import FriendRequest from "./FriendRequest";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHAT_ROOMS, GET_FRIEND_REQUEST } from "@/apollo/query";
import RoomItem from "./RoomItem";

export default function RoomList(props: { ref: Ref<HTMLDivElement> }) {
  const [activeTab, setActiveTab] = useState(0);
  const friendRequest = useQuery(GET_FRIEND_REQUEST);
  const allRooms = useQuery(GET_ALL_CHAT_ROOMS);

  return (
    <div
      ref={props.ref}
      className="h-full w-10/12 lg:w-full bg-background border-l lg:border lg:p-1 border-white/20 lg:mt-2 lg:mr-2 lg:rounded-2xl"
    >
      <div className="flex w-full border-b border-white/10 ">
        <button
          onClick={() => setActiveTab(0)}
          className={`${
            activeTab === 0
              ? "bg-primary/10 text-primary"
              : "border-transparent"
          } p-2 text-center w-full rounded-lg m-1 cursor-pointer`}
        >
          Chats
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={`${
            activeTab === 1
              ? "bg-primary/10 text-primary"
              : "border-transparent"
          } p-2 text-center w-full rounded-lg m-1 cursor-pointer`}
        >
          Invites
        </button>
      </div>

      {activeTab === 0 ? (
        <div>
          {allRooms?.data?.getAllChatRoomsByUser?.map((room) => {
            return <RoomItem key={room._id} room={room} />;
          })}
        </div>
      ) : (
        <div className="flex flex-col mt-2 mx-2 gap-4">
          <AddFriend />
          <div className="flex flex-col gap-3">
            {friendRequest?.data?.getAllFriendRequest?.map((request) => (
              <FriendRequest key={request.receiver} user={request.senderInfo} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
