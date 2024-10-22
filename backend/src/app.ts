// backend/src/app.ts
import express from "express";
import { json } from "body-parser";
import { checkUserHandler } from "./handlers/checkUser";
import { saveProfileHandler } from "./handlers/saveProfile";

const app = express();
app.use(json());

app.get("/checkUser", checkUserHandler);
app.post("/saveProfile", saveProfileHandler);

if (process.env.NODE_ENV !== "lambda") {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Backend is running on http://localhost:${port}`);
  });
}

export default app;
