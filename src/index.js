import express from "express"
import dotenv from "dotenv"

const app = express()
const PORT = process.env.PORT || 8000
dotenv.config()
app.use(express.json())

app.get("/api/hello", (req, res) => {
  res.json("Hello World")
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})