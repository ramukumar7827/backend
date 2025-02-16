const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://kramu22004:ramukumar22004@cluster0.hnhzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Atlas");
    const flights_data = mongoose.connection.db.collection("flights");

    const data = await flights_data.find({}).toArray();
    global.flights_data = data;

    console.log(global.flights_data);
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
