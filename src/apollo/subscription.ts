import { gql } from "@apollo/client";

export const onMessage = gql`
  subscription Broadcast($roomId: String!) {
    broadcast(roomId: $roomId) {
      message
      roomId
      username
    }
  }
`;
