import dbConnect from "@/utils/dbConnect";
import Post from "@/models/Post";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating item", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
