import express from "express";
import cors from "cors";
import toolsOperationRouter from "./routes/toolsOperations.route.js";
import dotenv from "dotenv";
import compression from "compression";
import helmet from "helmet";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// specifying client origins
const allowedOrigins = [
  "https://quickbgremove.netlify.app",
  "http://localhost:5173",
];

// built in middlewares
app.use(compression()); // Gzip compression
app.use(helmet()); // Secure HTTP headers
app.use(express.json());
app.use(cors());

// api checker
app.get("/", (req, res) => {
  res.json("QuickBgRemove Api is working");
});

// all routes
app.use("/api/tools", toolsOperationRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port} port `);
});
