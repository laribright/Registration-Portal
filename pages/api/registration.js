import { MongoClient } from "mongodb";

export default async function registrationHandler(req, res) {
  if (req.method !== "POST") return; // Just returning, Nothing serious lol :)

  const {
    schoolName,
    state,
    yearFounded,
    gameMaster,
    gameMasterEmail,
    gameMasterPhoneNumber,
  } = req.body;

  if (
    !schoolName ||
    !state ||
    !yearFounded ||
    !gameMaster ||
    !gameMasterEmail ||
    !gameMasterPhoneNumber
  )
    return; // Just returning again, Nothing serious lol :)

  // So this is where the magic happens
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://bright:4XbXrKPOdcD0OSdd@portfolio.unwdz.mongodb.net/school?retryWrites=true&w=majority"
    );
    const db = client.db();

    const schoolCollection = db.collection("schools");

    const result = await schoolCollection.insertOne({
      schoolName,
      state,
      yearFounded,
      gameMaster,
      gameMasterEmail,
      gameMasterPhoneNumber,
      isApproved: false, //By default schools isn't approved
    });

    if (!result) throw new Error("School not registered");

    res.status(201).json({
      school: result,
      message: "School registered",
    });

    client.close();
  } catch (error) {
    console.log(error);
  }
}
