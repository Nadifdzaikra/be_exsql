import express from "express"
import dotenv from "dotenv"
import locationRoutes from "./routes/locationRoutes.js"
import floorRoutes from "./routes/floorRoutes.js"
import cameraRoutes from "./routes/cameraRoutes.js"
import authRoutes from "./routes/authRoutes.js"
dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

//routes
app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRoutes)
app.use("/api/floors", floorRoutes)
app.use("/api/cameras", cameraRoutes)

app.get("/api/hello", (req, res) => {
  res.json("Hello World")
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})