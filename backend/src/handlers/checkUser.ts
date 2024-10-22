// backend/src/handlers/checkUser.ts
import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import * as Sentry from "@sentry/node";
import { User } from "../../../shared/models/user";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

const uri = process.env.MONGODB_URI || "";
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!clientPromise) {
  clientPromise = MongoClient.connect(uri, { useUnifiedTopology: true });
}

export const checkUserHandler = async (req: Request, res: Response) => {
  try {
    const telegramUserId = req.query.telegramUserId;

    if (!telegramUserId) {
      return res.status(400).json({ message: "telegramUserId is required" });
    }

    if (!client) {
      client = await clientPromise;
    }

    const database = client.db("cupidonchik");
    const users = database.collection<User>("users");

    const user = await users.findOne({
      telegramUserId: Number(telegramUserId),
    });

    if (user) {
      return res.status(200).json({ exists: true, user });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    Sentry.captureException(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
