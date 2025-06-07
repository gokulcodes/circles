import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation UserSignup($email: String!, $password: String!, $username: String!) {
    userSignup(email: $email, password: $password, username: $username) {
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

export const LOGIN = gql`
  mutation UserLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      user {
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
      accessToken
      refreshToken
    }
  }
`;
