import { MongoClient } from "mongodb";

// Our middle-ware function to check ADMIN
const isAdmin = (req, res, next) => {
  const adminData = JSON.parse(req.headers.authorization);

  if (!!adminData.isAdmin !== true) {
    // Just returning
    return;
  }
};

export default async function matchHandler(req, res, next) {
  if (req.method !== "POST") return;

  isAdmin(req, res, next); // Checking if user is an ADMIN

  try {
    const client = await MongoClient.connect(
      "mongodb+srv://bright:4XbXrKPOdcD0OSdd@portfolio.unwdz.mongodb.net/school?retryWrites=true&w=majority"
    );
    const db = await client.db();

    // ?? Not checking if a match is fixed aleady. Surely and improvemnt (#keeping stuffs simple)
    const result = await db.collection("match").insertOne(req.body);

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
}
