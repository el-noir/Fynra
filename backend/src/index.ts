import 'dotenv/config'
import app from "./app.ts"

async function startServer() {
  try {
    const PORT = Number(process.env.PORT) || 5000
    app.listen(PORT, () => {
      console.log(`Server on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()