import express from 'express'
import dotenv from 'dotenv'
import connect_DB from './src/lib/db.js'
import cookieParser from 'cookie-parser'


// Routes import
import authRoutes from './src/routes/auth.route.js'

dotenv.config()
const app = express()



// app use json
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);





const serverPort = process.env.SERVER_PORT
app.listen(serverPort, () => {
  console.log(`Server is running on port: http://localhost:${serverPort}`)
  connect_DB();
})