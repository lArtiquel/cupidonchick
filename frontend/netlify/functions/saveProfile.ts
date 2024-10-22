import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN, // Add Sentry DSN to your Netlify environment variables
});

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

interface UserProfile {
  telegramUserId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  bio?: string;
  // Add other fields as necessary
}

/**
 * @swagger
 * /saveProfile:
 *   post:
 *     summary: Save a user profile
 *     description: Saves or updates a user profile in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Profile saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Profile saved
 *                 profile:
 *                   $ref: '#/components/schemas/UserProfile'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       required:
 *         - telegramUserId
 *         - firstName
 *       properties:
 *         telegramUserId:
 *           type: integer
 *         first_name:
 *           type: string
 *         lastName:
 *           type: string
 *         username:
 *           type: string
 *         photoUrl:
 *           type: string
 *         bio:
 *           type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

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
    const database = client.db("cupidonchik");
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
