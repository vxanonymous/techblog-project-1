import express from "express";
const router = express.Router();
import User from '../models/User.js';
const app = express();
// import mongodb_client from "../config/mongodb.js";

app.get('/', async (req, res) => {
    // const instance = new User();
    console.log('GET');
    const users = await User.find({});

    try {
        res.send(users);
      } catch (error) {
        res.status(500).send(error);
      }
    // res.send("OK!")
})

export default app;