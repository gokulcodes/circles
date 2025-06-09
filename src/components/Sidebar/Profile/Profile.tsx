import CircleContext from "@/controller/CircleController";
import Image from "next/image";
import { RefObject, useCallback, useContext, useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import {
  debounce,
  getFormatedTime,
  getRelativeTime,
  scheduleUserStatusUpdate,
} from "../../../utils";
import { BiEdit } from "react-icons/bi";

import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_BY_EMAIL } from "@/apollo/query";
import { useRouter } from "next/navigation";
import { UPDATE_USER_STATUS } from "@/apollo/mutation";

export default function Profile(props: { ref: RefObject<HTMLDivElement> }) {
  const { state, dispatch } = useContext(CircleContext);
  const router = useRouter();
  const userInfo = useQuery(GET_USER_BY_EMAIL);
  const [updateUserStatus] = useMutation(UPDATE_USER_STATUS);
  const [showFullDetails, setShowFullDetails] = useState(false);
  const { user } = state;

  useEffect(() => {
    if (userInfo.loading) {
      return;
    }
    if (userInfo.error) {
      router.push("/login");
      return;
    }

    dispatch({
      type: "SET_USER",
      payload: { ...state, user: userInfo.data.getUserByEmail },
    });
  }, [userInfo]);

  const handleLastActivityUpdate = useCallback(async () => {
    // console.log(user, user?.isOnline, user?.lastSeen);
    // if (!user?.isOnline && user?.lastSeen) {
    //   await updateUserStatus({
    //     variables: {
    //       isOnline: true, // if last activity is less than 1mins, make online to true
    //       lastSeen: Date.now().toString(),
    //     },
    //   });
    // }
    dispatch({
      type: "UPDATE_LAST_ACTIVITY_TIME",
      payload: { ...state, lastActivityTime: Date.now() },
    });
  }, [state, user]);

  useEffect(() => {
    const inactivityScheduler = scheduleUserStatusUpdate(
      state.lastActivityTime,
      updateUserStatus
    );
    inactivityScheduler();
  }, []);

  useEffect(() => {
    document.body.addEventListener(
      "scroll",
      debounce(handleLastActivityUpdate)
    );
    document.body.addEventListener(
      "mousemove",
      debounce(handleLastActivityUpdate)
    );
    return () => {
      document.body.removeEventListener(
        "scroll",
        debounce(handleLastActivityUpdate)
      );
      document.body.removeEventListener(
        "mousemove",
        debounce(handleLastActivityUpdate)
      );
    };
  }, [state]);

  function handleShowDetails() {
    if (showFullDetails) {
      const profileRef = props.ref.current as HTMLDivElement;
      profileRef.style.height = `${window.innerHeight / 4}px`;
      props.ref.current.style.height = `${window.innerHeight / 8}px`;
    } else {
      props.ref.current.style.height = `${window.innerHeight}px`;
    }
    setShowFullDetails(!showFullDetails);
  }

  function handleUpdateAbout() {
    dispatch({
      type: "UPDATE_MODAL",
      payload: { ...state, modalName: "UPDATE_ABOUT" },
    });
  }

  function handleChangePassword() {
    dispatch({
      type: "UPDATE_MODAL",
      payload: { ...state, modalName: "CHANGE_PASSWORD" },
    });
  }

  function handleDeleteAccount() {
    dispatch({
      type: "UPDATE_MODAL",
      payload: { ...state, modalName: "DELETE_ACCOUNT" },
    });
  }

  function handleLogout() {
    dispatch({
      type: "SET_USER",
      payload: { ...state, user: null },
    });
    localStorage.clear();
    router.push("/login");
  }

  if (!user) {
    return;
  }
  // console.log(user);
  return (
    <div
      ref={props.ref}
      className="flex w-10/12 lg:w-full overflow-hidden flex-col gap-6 items-center justify-end h-1/6 bg-background border-l border-t lg:border p-4 lg:rounded-2xl border-white/20 lg:mb-2 lg:mr-2"
    >
      {showFullDetails ? (
        <div className="flex h-full w-full flex-col">
          <div className=" flex flex-row w-full items-center">
            <div className="flex flex-col p-4 items-start gap-2 ">
              <p className="uppercase opacity-60 text-sm tracking-widest">
                About
              </p>
              <p className="text-base font-semibold">
                {user.about ? user.about : "Share your thoughts here"}
              </p>
            </div>
            <button
              style={{ height: "fit-content" }}
              onClick={handleUpdateAbout}
              className="p-4 cursor-pointer text-xl hover:text-primary ml-auto"
            >
              <BiEdit />
            </button>
          </div>
          <div className="flex flex-col p-4 items-start gap-2 border-y border-white/10">
            <p className="uppercase opacity-60 text-xs tracking-widest">
              Email Address
            </p>
            <p className="text-base font-semibold">{user.email}</p>
          </div>
          <div className="flex flex-col p-4 items-start gap-2 border-y border-white/10">
            <p className="uppercase opacity-60 text-xs tracking-widest">
              Member since
            </p>
            <p className="text-base font-semibold">
              {getFormatedTime(user.createdAt)}
            </p>
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full border mt-auto border-white/10 p-2 text-sm rounded-lg hover:text-primary cursor-pointer"
          >
            Change Password
          </button>
          <div className="mt-4 gap-4 flex ">
            <button
              onClick={handleLogout}
              className="w-full border border-white/10 p-2 text-sm rounded-lg hover:text-red-500 cursor-pointer"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="w-full border border-white/10 p-2 text-sm rounded-lg hover:text-red-500 cursor-pointer"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : null}
      <div className="flex relative flex-row w-full items-center gap-4">
        <div className="rounded-2xl border-4 border-secondary relative">
          <Image
            className="overflow-hidden object-cover w-10 lg:w-14"
            src="/circles.svg"
            alt="logo"
            width={100}
            height={100}
          />
          <div
            className={`w-2 h-2 lg:w-4 lg:h-4 rounded-lg absolute -right-1 -bottom-1 ${
              user.isOnline ? "bg-green-400" : "bg-yellow-400"
            } `}
          />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="font-bold text-lg lg:text-xl">{user.username}</h2>
          <p className="opacity-50 text-sm lg:text-base font-extralight">
            {
              user.isOnline
                ? "Online"
                : new Date(parseInt(user.lastSeen)).toTimeString().slice(0, 8)
              // getRelativeTime(user.lastSeen)
            }
          </p>
        </div>
        <button
          onClick={handleShowDetails}
          className="bg-white/10 cursor-pointer text-lg lg:text-xl ml-auto hover:text-primary p-3 lg:p-4 rounded-xl lg:rounded-2xl text-center"
        >
          <IoSettingsOutline />
        </button>
      </div>
    </div>
  );
}
