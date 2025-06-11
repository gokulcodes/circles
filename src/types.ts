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

export type ChatRoom = {
  friend: {
    info: User;
    isTyping: boolean;
  };
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
  reactions: Array<{ senderEmail: string; reactionString: string }>;
};

export type CircleState = {
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

export type CircleAction = {
  type: string;
  payload: CircleState;
};

export type RoomActivityType = {
  _id: string;
  name: string;
  members: [
    {
      user: User;
      isTyping: boolean;
    }
  ];
};

export type FriendRequestType = {
  sender: string;
  receiver: string;
  receiverInfo: User;
  senderInfo: User;
};
