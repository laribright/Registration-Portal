import { MongoClient } from "mongodb";

export default async function LoginHandler(req, res, next) {
  // isAdmin(req, res, next);
  if (req.method !== "POST") return;
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://bright:4XbXrKPOdcD0OSdd@portfolio.unwdz.mongodb.net/school?retryWrites=true&w=majority"
    );
    const db = await client.db();

    const user = await db.collection("user").findOne({ email: req.body.email });
    if (!user) {
      return; // Nothing much, we just return
    }

    client.close();

    res.status(200).json({
      user,
    });
  } catch (error) {
    client.close();
    console.log(error);
  }
}
