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
  type CurrentUserResponse {
    success: Boolean!
    user: User
    error: String
  }
  type Query {
    loginUser(email: String!, password: String!): LoginResponse
    getCurrentUser: CurrentUserResponse
  }
  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!, profileImageUrl: String): CreateUserResponse!
  }
`;
