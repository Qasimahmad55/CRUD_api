import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import dotenv from 'dotenv'
import { User } from "./models/users.models.js"

dotenv.config(
    {
        path: './.env'
    }
)
const app = express()
app.use(cors(
    {
        origin: "*"
    }
))
app.use(express.json())

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected succcessfully ");

    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1)
    }
}
connectMongo()
app.get("/", (req, res) => {
    User.find({})
        .then(user => res.json(user))
        .catch(err => res.json(err))
})
app.post("/createuser", (req, res) => {
    User.create(req.body)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.get("/getUser/:id", (req, res) => {
    const id = req.params.id
    User.findById(id)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.patch("/updateUser/:id", (req, res) => {
    const id = req.params.id
    User.findByIdAndUpdate(id,
        { name: req.body.name, email: req.body.email, age: req.body.age })
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.delete("/deleteUser/:id", (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})
app.listen(8000, () => {
    console.log("Server is running at 8000");
})
