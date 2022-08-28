import express from "express";

const app = express();

const PORT = 3333;

app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Hello World!" });
});

app.post("/courses", (request, response) => {
  const { name } = request.body;
  return response.json({ name });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`));
