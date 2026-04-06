import express from "express";
import { expressMiddleware } from "@as-integrations/express5";
import "dotenv/config";
import { createGqlServer } from "./graphQL/server.js";

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
app.use("/graphql", expressMiddleware(gqlServer));

app.listen(port, () => {
  console.log(
    `
    Server is running on port: ${port}
    Visit http://localhost:${port} to see the message.
    `,
  );
});
