import { MongoClient } from "mongodb";

export default connectDB = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://bright:4XbXrKPOdcD0OSdd@portfolio.unwdz.mongodb.net/school?retryWrites=true&w=majority"
  ); // PROCESS.ENV

  return client;
};
