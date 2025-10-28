import "dotenv/config"
import cors from "cors"
import type { CorsOptions } from "cors"
import cookieParser from "cookie-parser"
import express, { type Request, type Response } from "express"
import userRoutes from "./routes/user.routes"
import { clerkMiddleware } from "@clerk/express"

const app = express()

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow same-origin or non-CORS requests (e.g., direct browser navigations)
    if (!origin) return callback(null, true)

    const allowedOrigins = [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      process.env.CORS_ORIGIN,
      // Allow Auth0 domain for the auth POST /callback navigation that may include Origin
      process.env.AUTH0_ISSUER_BASE_URL?.startsWith("http")
        ? process.env.AUTH0_ISSUER_BASE_URL
        : undefined,
    ].filter((o): o is string => Boolean(o))

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
app.use(clerkMiddleware())

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())

app.use("/api/v1", userRoutes)


export default app
