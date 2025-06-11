"use client";
import { USER_ACTIVITY } from "@/apollo/subscription";
import Chat from "@/components/Chat";
import Sidebar from "@/components/Sidebar/Sidebar";
import CircleContext from "@/controller/CircleController";
import { useSubscription } from "@apollo/client";
import Image from "next/image";
import { useContext, useEffect, useMemo, useRef } from "react";
import { FiSidebar } from "react-icons/fi";

export default function Home() {
  const mouseDown = useRef<boolean>(false);
  const { state, dispatch } = useContext(CircleContext);
  const onUserActivityChange = useSubscription(USER_ACTIVITY, {
    variables: {
      email: state.user?.email,
    },
  });
  const chatRef = useRef<HTMLDivElement>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onUserActivityChange.data) {
      const updatedUserInfo = onUserActivityChange.data.userActivityStatus;
      if (!updatedUserInfo) {
        return;
      }
      console.log("updatedUserInfo update", updatedUserInfo);

      dispatch({
        type: "SET_USER",
        payload: { ...state, user: updatedUserInfo },
      });
    }
  }, [onUserActivityChange.data?.userActivityStatus]);

  function handleChatResize(event: React.MouseEvent) {
    if (!mouseDown.current || !chatRef.current || !sideBarRef.current) {
      return;
    }
    chatRef.current.style.width = `${event.clientX}px`;
    sideBarRef.current.style.width = `${window.innerWidth - event.clientX}px`;
    // console.log(event.clientX);
  }
  function handleMouseDown() {
    mouseDown.current = true;
    document.body.style.cursor = "ew-resize";
  }
  function handleMouseUp() {
    mouseDown.current = false;
    document.body.style.cursor = "default";
  }

  function handleSidebar() {
    dispatch({
      type: "SIDE_BAR_EXPAND",
      payload: { ...state, sidebarExpanded: !state.sidebarExpanded },
    });
  }
  const SideBarMemo = useMemo(
    () => <Sidebar sideBarRef={sideBarRef} />,
    [sideBarRef]
  );
  return (
    <div
      onMouseMove={handleChatResize}
      onMouseUp={handleMouseUp}
      className="flex flex-col h-[100vh] items-start justify-between lg:flex-row w-full overflow-hidden"
    >
      <header className="flex lg:hidden w-full items-center p-2 border-b border-white/10 justify-between flex-row">
        <Image
          src="/logo_name.png"
          alt="Circles Logo"
          width={100}
          height={100}
          className=" "
        />
        <button
          onClick={handleSidebar}
          className="p-2 hover:bg-primary/10 rounded-2xl hover:text-primary"
        >
          <FiSidebar className="text-2xl" />
        </button>
      </header>
      <Chat ref={chatRef} />
      <button
        onMouseDown={handleMouseDown}
        className="lg:flex w-2 hidden group items-center justify-center cursor-ew-resize h-[100vh]"
      >
        <div className="w-[1px] group-hover:flex hidden h-[100vh] bg-primary" />
      </button>
      {SideBarMemo}
    </div>
  );
}
