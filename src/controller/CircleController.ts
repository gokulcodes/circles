import { createContext } from "react";

export const initialState: CircleState = {
  user: null,
  chatRooms: [],
  currentChatRoom: null,
  messages: [],
  isTyping: false,
  isOnline: false,
  lastSeen: new Date(),
};

type User = {
  username: string;
  email: string;
  about: string;
  profilePicture: string;
  isOnline: boolean;
  isTyping: boolean;
  lastSeen: Date;
  createdAt: Date;
  updatedAt: Date;
};

type ChatRoom = {
  isGroupChat: boolean;
  users: User[];
  chatRoomId: string;
  chatRoomName: string;
  chatRoomPicture: string;
};

type Message = {
  messageId: string;
  sender: User;
  content: string;
  chatRoomId: string;
  timestamp: Date;
};

type CircleState = {
  user: User | null;
  chatRooms: ChatRoom[];
  currentChatRoom: ChatRoom | null;
  messages: Message[];
  isTyping: boolean;
  isOnline: boolean;
  lastSeen: Date;
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
