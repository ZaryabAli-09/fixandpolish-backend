import express from "express";
import cors from "cors";
import toolsOperationRouter from "./routes/toolsOperations.route.js";
const app = express();

// for accepting json format data
app.use(express.json());
app.use(cors());

// api checker
app.get("/", (req, res) => {
  res.json("api is working");
});

// all routes
app.use("/api/tools", toolsOperationRouter);

app.listen(3000, () => {
  console.log("app is listening");
});
