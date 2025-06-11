import { createContext } from "react";
import type { CircleAction, CircleState } from "../types";

export const initialState: CircleState = {
  user: null,
  sidebarExpanded: true,
  chatRooms: [],
  lastActivityTime: Date.now(),
  currentChatRoom: null,
  messages: [],
  isTyping: false,
  isOnline: false,
  lastSeen: Date.now(),
  modalName: "",
};

export const reducer = (state: CircleState, action: CircleAction) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload.user };
    case "SET_CHAT_ROOMS":
      return { ...state, chatRooms: action.payload.chatRooms };
    case "SET_CURRENT_CHAT_ROOM":
      return { ...state, currentChatRoom: action.payload.currentChatRoom };
    case "SET_MESSAGES":
      return { ...state, messages: action.payload.messages };
    case "UPDATE_MODAL":
      return { ...state, modalName: action.payload.modalName };
    case "UPDATE_LAST_ACTIVITY_TIME":
      return { ...state, lastActivityTime: action.payload.lastActivityTime };
    case "SIDE_BAR_EXPAND":
      return { ...state, sidebarExpanded: action.payload.sidebarExpanded };
    case "RESET_STATE":
      return initialState;
    default:
      return initialState;
  }
};

const CircleContext = createContext<{
  state: CircleState;
  dispatch: React.Dispatch<CircleAction>;
}>({
  state: initialState,
  dispatch: () => null,
});
export default CircleContext;
