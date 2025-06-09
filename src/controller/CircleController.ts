import { createContext } from "react";

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

export type User = {
  username: string;
  email: string;
  about: string;
  profilePicture: string;
  isOnline: boolean;
  isTyping: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
};

type ChatRoom = {
  isGroupChat: boolean;
  users: User[];
  chatRoomId: string;
  chatRoomName: string;
  chatRoomPicture: string;
};

export type Message = {
  _id: string;
  sender: string;
  content: string;
  chatRoomId: string;
  createdAt: string;
};

type CircleState = {
  user: User | null;
  sidebarExpanded: boolean;
  chatRooms: ChatRoom[];
  lastActivityTime: number;
  currentChatRoom: ChatRoom | null;
  messages: Message[];
  modalName: string;
  isTyping: boolean;
  isOnline: boolean;
  lastSeen: number;
};

type CircleAction = {
  type: string;
  payload: CircleState;
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
    default:
      return state;
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
