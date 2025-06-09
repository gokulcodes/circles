import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation UserSignup($email: String!, $password: String!, $username: String!) {
    userSignup(email: $email, password: $password, username: $username) {
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

export const LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
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
      accessToken
      refreshToken
    }
  }
`;

export const UPDATE_ABOUT = gql`
  mutation UpdateAbout($about: String!) {
    updateAbout(about: $about) {
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
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      username
    }
  }
`;
export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount {
    deleteAccount
  }
`;
export const MAKE_FRIEND_REQUEST = gql`
  mutation MakeFriendRequest($friendEmail: String!) {
    makeFriendRequest(friendEmail: $friendEmail)
  }
`;
export const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptFriendRequest($friendEmail: String!) {
    acceptFriendRequest(friendEmail: $friendEmail)
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($content: String!, $roomId: String!) {
    sendMessage(content: $content, roomId: $roomId) {
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

export const UPDATE_LAST_SEEN = gql`
  mutation UpdateLastSeen($lastSeen: String!) {
    updateLastSeen(lastSeen: $lastSeen) {
      lastSeen
    }
  }
`;

export const UPDATE_USER_STATUS = gql`
  mutation UpdateUserStatus($isOnline: Boolean!, $lastSeen: String!) {
    updateUserStatus(isOnline: $isOnline, lastSeen: $lastSeen) {
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

export const UPDATE_TYPING = gql`
  mutation UpdateIsTyping($roomId: String!, $isTyping: Boolean!) {
    updateIsTyping(roomId: $roomId, isTyping: $isTyping) {
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
