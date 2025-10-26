import "dotenv/config"
import cors from "cors"
import type { CorsOptions } from "cors"
import cookieParser from "cookie-parser"
import express, { type Request, type Response } from "express"
import {auth} from 'express-openid-connect'

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET as string,
  baseURL: process.env.AUTH0_BASE_URL as string,
  clientID: process.env.AUTH0_CLIENT_ID as string,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL as string
}

const app = express()

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true)

    const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000", process.env.CORS_ORIGIN].filter(
      (o): o is string => Boolean(o),
    )

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Origin", "Content-Type", "Authorization"],
}

app.use(cors(corsOptions))
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())


app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
    timestamp: new Date().toISOString(),
  })
})

export default app
