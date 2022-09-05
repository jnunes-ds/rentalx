import express from "express";
import { router } from "./routes";

const app = express();

const PORT = 3333;

app.use(express.json());

app.use(router);

app.get("/", (request, response) => {
  return response.json({ message: "Hello World!" });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`));
