// backend/src/handlers/saveProfile.ts
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

export const saveProfileHandler = async (req: Request, res: Response) => {
  try {
    const profile: User = req.body;

    if (!profile.telegramUserId) {
      return res.status(400).json({ message: "telegramUserId is required" });
    }

    if (!client) {
      client = await clientPromise;
    }

    const database = client.db("cupidonchik");
    const users = database.collection<User>("users");

    await users.updateOne(
      { telegramUserId: profile.telegramUserId },
      { $set: profile },
      { upsert: true }
    );

    return res.status(200).json({ message: "Profile saved", profile });
  } catch (error) {
    console.error("Error saving profile:", error);
    Sentry.captureException(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
