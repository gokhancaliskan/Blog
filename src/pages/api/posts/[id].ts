// pages/api/posts/[id].ts
import { MongoClient, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const client = await MongoClient.connect(
    process.env.MONGODB_URI!
  );
  const db = client.db();

  if (req.method === "PUT") {
    const { title, main, category, image, content, price } =
      req.body;
    await db.collection("posts").updateOne(
      { _id: new ObjectId(id as string) },
      {
        $set: {
          title,
          main,
          category,
          image,
          content,
          price,
        },
      }
    );
    res
      .status(200)
      .json({ message: "Post updated successfully" });
  } else if (req.method === "DELETE") {
    await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(id as string) });
    res
      .status(200)
      .json({ message: "Post deleted successfully" });
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
