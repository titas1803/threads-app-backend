import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { userSchema } from "./schema/users.js";
import { userMutations, userQueries } from "./resolvers/users.js";
import "dotenv/config";

const app = express();
console.log("Environment variables loaded successfully:", {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL ? "Loaded" : "Not Loaded",
});
const port = Number(process.env.PORT) || 8080;

app.use(express.json());

// create graphql server
const server = new ApolloServer({
  typeDefs: [userSchema],
  resolvers: {
    Query: {
      ...userQueries.Query,
    },
    Mutation: {
      ...userMutations.Mutation,
    },
  },
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// start the gql server
await server.start();

app.use("/graphql", expressMiddleware(server));

app.listen(port, () => {
  console.log(
    `
    Server is running on port: ${port}
    Visit http://localhost:${port} to see the message.
    `,
  );
});
