import express from 'express'
import dotenv from 'dotenv'
import connect_DB from './src/lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'


// Routes import
import authRoutes from './src/routes/auth.route.js'
import messageRoutes from './src/routes/message.route.js'

dotenv.config()
const app = express()



// app use json
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
})
)

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);





const serverPort = process.env.SERVER_PORT
app.listen(serverPort, () => {
  console.log(`Server is running on port: http://localhost:${serverPort}`)
  connect_DB();
})