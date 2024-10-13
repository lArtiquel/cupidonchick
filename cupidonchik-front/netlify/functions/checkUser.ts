import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN, // Add Sentry DSN to your Netlify environment variables
});

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

interface User {
  telegramUserId: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  // Add other fields as necessary
}

const handler: Handler = async (event) => {
  try {
    const telegramUserId = event.queryStringParameters?.telegramUserId;

    if (!telegramUserId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "telegramUserId is required" }),
      };
    }

    await client.connect();
    const database = client.db("Cluster");
    const users = database.collection<User>("users");

    const user = await users.findOne({
      telegramUserId: Number(telegramUserId),
    });

    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify({ exists: true, user }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ exists: false }),
      };
    }
  } catch (error) {
    console.error("Error checking user:", error);
    Sentry.captureException(error); // Send error to Sentry
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  } finally {
    await client.close();
  }
};

export { handler };
