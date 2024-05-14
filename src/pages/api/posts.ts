// pages/api/posts.ts
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await MongoClient.connect(
    process.env.MONGODB_URI!
  );
  const db = client.db();

  switch (req.method) {
    case "GET":
      const posts = await db
        .collection("posts")
        .find()
        .toArray();
      res.status(200).json(posts);
      break;

    case "POST":
      const { title, main, category, image, content } =
        req.body;
      const result = await db
        .collection("posts")
        .insertOne({
          title,
          main,
          category,
          image,
          content,
        });
      res.status(201).json({
        message: "Post added successfully",
        postId: result.insertedId,
      });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res
        .status(405)
        .end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
