import dotenv from "dotenv";
import app from "./app";
import { initDb } from "./infrastructure/database/initDb";

dotenv.config({ path: "src/config/.env" })

const PORT = process.env.PORT || 4000

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port 4000")
    })
  })
  .catch(err => {
    console.error("DB init failed", err);
  })
