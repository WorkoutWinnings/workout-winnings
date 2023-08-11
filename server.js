require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const authenticateJWT = require('./middlewares/authenticateJWT');
const protectedRoutes = require('./routes/protected');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://SimonDev:7LAjBql5ZhEQVr43@workoutwinnings.0dv0i22.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("WorkoutWinnings").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    app.use(express.json());
    app.use('/auth', authRoutes);
    app.use('/protected', authenticateJWT, protectedRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);
