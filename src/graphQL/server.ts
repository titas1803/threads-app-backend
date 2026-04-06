import { ApolloServer } from "@apollo/server";
import { userSchema } from "#/graphQL/schemas/users.js";
import { userMutations, userQueries } from "#/graphQL/resolvers/users.js";

export const createGqlServer = async () => {
  // create graphql server
  const gqlServer = new ApolloServer({
    typeDefs: [userSchema],
    resolvers: {
      Query: {
        ...userQueries.Query,
      },
      Mutation: {
        ...userMutations().Mutation,
      },
    },
  });

  // start the gql server
  await gqlServer.start();
  return gqlServer;
};
