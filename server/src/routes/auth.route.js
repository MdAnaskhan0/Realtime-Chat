import express from 'express'
import { checkAuth, login, logout, signup, uploadProfile } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'
const router = express.Router()

router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

router.put("/upload-profile", protectRoute, uploadProfile)

router.get("/check", protectRoute, checkAuth)

export default router;