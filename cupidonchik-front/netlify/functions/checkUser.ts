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
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  bio?: string;
  // Add other fields as necessary
}

/**
 * @swagger
 * /checkUser:
 *   get:
 *     summary: Check if a user exists
 *     description: Checks MongoDB to see if a user with the given Telegram User ID exists.
 *     parameters:
 *       - in: query
 *         name: telegramUserId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Telegram User ID
 *     responses:
 *       200:
 *         description: User existence status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         telegramUserId:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         username:
 *           type: string
 *         photoUrl:
 *           type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 */

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
    const database = client.db("cupidonchik");
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
