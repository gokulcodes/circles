import { memo, Ref, useContext, useEffect, useMemo, useState } from "react";
import AddFriend from "./AddFriend";
import { useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import { GET_ALL_CHAT_ROOMS, GET_FRIEND_REQUEST } from "@/apollo/query";
import RoomItem from "./RoomItem";
import { FRIEND_REQUEST_ACTIVITES } from "@/apollo/subscription";
import CircleContext from "@/controller/CircleController";
import { FriendRequestType, RoomActivityType } from "@/types";
import clsx from "clsx";
import FriendRequest from "./FriendRequest";

const ChatRooms = memo(() => {
  const { data, loading } = useQuery(GET_ALL_CHAT_ROOMS);

  if (loading || !data?.getAllChatRoomsByUser) {
    return;
  }

  const { getAllChatRoomsByUser } = data;
  return getAllChatRoomsByUser.map((room: RoomActivityType) => {
    return <RoomItem key={room._id} room={room} />;
  });
});

ChatRooms.displayName = "ChatRooms";

function Invites() {
  const { state } = useContext(CircleContext);
  const [allInvites, setInvites] = useState([]);
  const [getAllFriendRequest] = useLazyQuery(GET_FRIEND_REQUEST);
  const friendRequestActivities = useSubscription(FRIEND_REQUEST_ACTIVITES, {
    variables: {
      email: state.user?.email,
    },
  });

  useEffect(() => {
    getAllFriendRequest().then((res) => {
      setInvites(res.data.getAllFriendRequest);
    });
  }, [getAllFriendRequest]);

  useEffect(() => {
    if (
      friendRequestActivities.data &&
      friendRequestActivities.data.friendRequestActivities
    ) {
      setInvites(friendRequestActivities.data.friendRequestActivities);
    }
  }, [friendRequestActivities, getAllFriendRequest]);
  console.log("[RE_RENDER]Invites Rendered");

  return (
    <div className="flex flex-col mt-2 mx-2 gap-4">
      <AddFriend />
      <div className="flex flex-col gap-3">
        {allInvites.map((invite: FriendRequestType) => (
          <FriendRequest
            key={invite.receiver}
            senderInfo={invite.senderInfo}
            receiverInfo={invite.receiverInfo}
          />
        ))}
      </div>
    </div>
  );
}

const RoomList = memo((props: { ref: Ref<HTMLDivElement> }) => {
  const [activeTab, setActiveTab] = useState(0);
  const ChatRoomsMemo = useMemo(() => <ChatRooms />, []);
  const InvitesMemo = useMemo(() => <Invites />, []);

  return (
    <div
      ref={props.ref}
      className="h-full w-10/12 lg:w-full bg-background border-l lg:border border-white/20 lg:mt-2 lg:mr-2 lg:rounded-2xl"
    >
      <div className="flex w-full border-b border-white/10 ">
        <button
          onClick={() => setActiveTab(0)}
          className={clsx(
            "p-3 text-center w-full rounded-xl m-1 cursor-pointer",
            {
              "bg-primary/10 text-primary": activeTab === 0,
              "border-transparent": activeTab !== 0,
            }
          )}
        >
          Chats
        </button>
        <button
          onClick={() => setActiveTab(1)}
          className={clsx(
            "p-3 text-center w-full rounded-xl m-1 cursor-pointer",
            {
              "bg-primary/10 text-primary": activeTab === 1,
              "border-transparent": activeTab !== 1,
            }
          )}
        >
          Invites
        </button>
      </div>

      {activeTab === 0 ? ChatRoomsMemo : InvitesMemo}
    </div>
  );
});
RoomList.displayName = "RoomList";

export default RoomList;
