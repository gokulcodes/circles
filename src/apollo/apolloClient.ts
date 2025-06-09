import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

const authLink = setContext((_, { headers }) => {
  // Runs on the client at request time
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: process.env.HTTP_SERVER || "http://localhost:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.WS_SERVER || "ws://localhost:4000/graphql",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const apolloClient = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
