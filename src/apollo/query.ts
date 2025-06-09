import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail {
    getUserByEmail {
      username
      email
      about
      profilePicture
      isOnline
      lastSeen
      createdAt
      updatedAt
    }
  }
`;

export const GET_FRIEND_REQUEST = gql`
  query GetAllFriendRequest {
    getAllFriendRequest {
      sender
      receiver
      senderInfo {
        username
        email
        about
        profilePicture
        isOnline
        lastSeen
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_CHAT_ROOMS = gql`
  query GetAllChatRoomsByUser {
    getAllChatRoomsByUser {
      _id
      name
      members {
        user {
          username
          email
          about
          profilePicture
          isOnline
          lastSeen
          createdAt
          updatedAt
        }
        isTyping
      }
    }
  }
`;

export const GET_MESSAGE_BY_ROOM_ID = gql`
  query GetMessagesByRoom($roomId: String!) {
    getMessagesByRoom(roomId: $roomId) {
      _id
      content
      roomId
      sender
      createdAt
      updatedAt
      replyTo
      reactions {
        senderEmail
        reactionString
      }
    }
  }
`;
