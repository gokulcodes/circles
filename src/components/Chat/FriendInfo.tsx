import { User } from "@/types";
import { getFormatedTime } from "@/utils";

export default function FriendInfo(props: { friend: User }) {
  const { friend } = props;
  return (
    <div className="flex animate-openup flex-wrap">
      <div className="flex lg:w-1/2 w-full flex-col p-4 items-start gap-2 ">
        <p className="uppercase opacity-60 text-sm tracking-widest">About</p>
        <p className="text-base font-semibold">
          {friend.about ? friend.about : "-"}
        </p>
      </div>
      <div className="flex lg:w-1/2 w-full flex-col p-4 items-start gap-2 ">
        <p className="uppercase opacity-60 text-sm tracking-widest">
          Email Address
        </p>
        <p className="text-base font-semibold">{friend.email}</p>
      </div>
      <div className="flex lg:w-1/2 w-full flex-col p-4 items-start gap-2 ">
        <p className="uppercase opacity-60 text-xs tracking-widest">
          Member since
        </p>
        <p className="text-base font-semibold">
          {getFormatedTime(friend.createdAt)}
        </p>
      </div>
    </div>
  );
}
