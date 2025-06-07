import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail {
    getUserByEmail {
      username
      email
      about
      profilePicture
      isOnline
      isTyping
      lastSeen
      createdAt
      updatedAt
    }
  }
`;
