import { MongoClient } from "mongodb";

export default async function getMatchesHandler(req, res, next) {
  if (req.method !== "GET") return;

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://bright:4XbXrKPOdcD0OSdd@portfolio.unwdz.mongodb.net/school?retryWrites=true&w=majority"
    );
    const db = await client.db();

    const matches = await db.collection("match").find().toArray();

    res.status(200).json(matches);
  } catch (error) {
    console.log(error);
  }
}
