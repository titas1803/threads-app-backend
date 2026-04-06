import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import "dotenv/config";
import { createGqlServer } from "./graphQL/server.js";
import { UserService } from "./services/user.js";
import Jwt from "jsonwebtoken";
const app = express();
console.log("Environment variables loaded successfully:", {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL ? "Loaded" : "Not Loaded",
});
const port = Number(process.env.PORT) || 8080;

app.use(express.json());

app.get("/", (_, res) => {
  res.json({ message: "Hello World!" });
});

const gqlServer = await createGqlServer();
app.use(
  "/graphql",
  expressMiddleware(gqlServer, {
    context: async ({ req }) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return {};
      return await UserService.getUserFromToken(token);
    },
  }),
);

app.listen(port, () => {
  console.log(
    `
    Server is running on port: ${port}
    Visit http://localhost:${port} to see the message.
    `,
  );
});
