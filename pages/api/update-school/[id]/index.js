// import connectDB from "../../helpers/connectDB";
import { MongoClient, ObjectId } from "mongodb";

export default async function upDateSchool(req, res) {
  if (req.method !== "PATCH") return;

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://bright:4XbXrKPOdcD0OSdd@portfolio.unwdz.mongodb.net/school?retryWrites=true&w=majority"
    ); //DB connection

    const db = await client.db();

    await db.collection("schools").updateOne(
      { _id: ObjectId(req.query.id) }, // Basically setting ID it back to and objectID (was changed in the frontend when fetching all schools)
      { $set: { isApproved: true } } // $set is an atomic operator...
    );

    await client.close();

    res.status(200).json({
      message: "Successful",
    });
  } catch (error) {
    console.log(error);
  }
}
