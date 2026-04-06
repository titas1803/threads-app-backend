export const userSchema = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    profileImageUrl: String
  }
  type CreateUserResponse {
    success: Boolean!
    message: String!
    userid: ID
    error: String
  }
  type LoginResponse {
    success: Boolean!
    message: String!
    token: String
  }
  type Query {
    users: [User!]
    loginUser(email: String!, password: String!): LoginResponse
  }
  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!, profileImageUrl: String): CreateUserResponse!
  }
`;
