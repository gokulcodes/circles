import { gql } from "@apollo/client";

export const LISTEN_CHAT_ROOM = gql`
  subscription Broadcast($roomId: String!) {
    broadcast(roomId: $roomId) {
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

export const USER_ACTIVITY = gql`
  subscription UserActivityStatus($email: String!) {
    userActivityStatus(email: $email) {
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

export const ROOM_ACTIVITY = gql`
  subscription RoomActivity($roomId: String!) {
    roomActivity(roomId: $roomId) {
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
      # isGroupChat
    }
  }
`;

export const FRIEND_REQUEST_ACTIVITES = gql`
  subscription FriendRequestActivities($email: String!) {
    friendRequestActivities(email: $email) {
      sender
      receiver
      receiverInfo {
        username
        email
        about
        profilePicture
        isOnline
        lastSeen
        createdAt
        updatedAt
      }
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
