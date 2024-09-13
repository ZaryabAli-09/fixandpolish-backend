import express from "express";
import cors from "cors";
import toolsOperationRouter from "./routes/toolsOperations.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

dotenv.config();
const app = express();

// specifying client origins
const allowedOrigins = [
  "https://quickbgremove.netlify.app",
  "http://localhost:5173",
];

// built in middlewares
app.use(compression()); // Gzip compression
app.use(helmet()); // Secure HTTP headers
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(cookieParser());

// api checker
app.get("/", (req, res) => {
  res.json("QuickBgRemove Api is working");
});

// all routes
app.use("/api/tools", toolsOperationRouter);

app.listen(3000, () => {
  console.log(`Server is running on 3000 port `);
});
