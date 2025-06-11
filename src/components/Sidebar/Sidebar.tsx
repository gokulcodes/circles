import { memo, Ref, useContext, useRef } from "react";
import RoomList from "./ChatRooms/RoomList";
import Profile from "./Profile/Profile";
import CircleContext from "@/controller/CircleController";
import { FiSidebar } from "react-icons/fi";

const Sidebar = memo((props: { sideBarRef: Ref<HTMLDivElement> }) => {
  const { state, dispatch } = useContext(CircleContext);
  const mouseDown = useRef<boolean>(false);
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  function handleResize(event: React.MouseEvent) {
    if (!mouseDown.current || !chatRoomRef.current || !profileRef.current) {
      return;
    }
    chatRoomRef.current.style.height = `${event.clientY}px`;
    profileRef.current.style.height = `${window.innerHeight - event.clientY}px`;
  }
  function handleMouseDown() {
    mouseDown.current = true;
    document.body.style.cursor = "ns-resize";
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

  if (!state.sidebarExpanded) {
    return null;
  }

  return (
    <div
      id="sidebar"
      onMouseMove={handleResize}
      onMouseUp={handleMouseUp}
      ref={props.sideBarRef}
      className="flex animate-sidebarOpen absolute items-end bg-background/60 backdrop-blur-2xl z-50 lg:static lg:ml-2 ml-0 flex-col w-full right-0 h-full lg:w-1/3 "
    >
      <button
        onClick={handleSidebar}
        className="p-3 absolute bottom-5 left-5 offset border rounded-lg border-white/20 bg-background block lg:hidden hover:bg-primary/10 hover:text-primary"
      >
        <FiSidebar className="text-xl" />
      </button>
      <RoomList ref={chatRoomRef} />
      <button
        onMouseDown={handleMouseDown}
        className="h-2 hidden lg:block group cursor-ns-resize w-full self-center"
      >
        <div className="h-[1px] w-full group-hover:flex hidden bg-primary" />
      </button>
      <Profile ref={profileRef} />
    </div>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
