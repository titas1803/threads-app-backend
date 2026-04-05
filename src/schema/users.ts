export const userSchema = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profileImageUrl: String
  }
  type Query {
    users: [User!]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!, profileImageUrl: String): Boolean!
  }
`;
