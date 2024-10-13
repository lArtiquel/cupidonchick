import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

interface UserProfile {
  telegramUserId: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  bio?: string;
  // Add other fields as necessary
}

const handler: Handler = async (event) => {
  try {
    const profile: UserProfile = JSON.parse(event.body || "{}");

    if (!profile.telegramUserId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "telegramUserId is required" }),
      };
    }

    await client.connect();
    const database = client.db("your_database_name");
    const users = database.collection<UserProfile>("users");

    await users.updateOne(
      { telegramUserId: profile.telegramUserId },
      { $set: profile },
      { upsert: true }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Profile saved", profile }),
    };
  } catch (error) {
    console.error("Error saving profile:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  } finally {
    await client.close();
  }
};

export { handler };
