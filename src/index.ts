import express from "express";
import router from "./routes/api";
import bodyParser from "body-parser";
import db from "./utils/database";
import docs from "./docs/route";
import cors from "cors";
import dotenv from "dotenv";

async function init() {
  try {
    const result = await db();
    console.log("database status:", result);

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use("/api", router);
    docs(app);

    app.listen(process.env.APP_PORT, () => {
      console.log(
        `Server is running on http://localhost:${process.env.APP_PORT}`
      );
    });
  } catch (error) {
    console.log("DB connection error:", error);
  }
}

init();
