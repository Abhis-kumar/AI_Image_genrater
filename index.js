import express from "express";
import cors from "cors"
import { data } from "./data.js";
import "dotenv/config";
import { connectDB } from "./config/db.js";
import { ImageRouter } from "./routes/imageRoute.js";
import { userRouter } from "./routes/userRoute.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dapper-axolotl-0beed0.netlify.app",
    ],
    credentials: true, // agar cookies / auth tokens bhejna ho
  })
);


connectDB()

app.get("/api", (req, res) => {
  return res.json({
    name: "Arvind",
    message: "Hello"
  });
});



app.post("/api/set-data", (req, res) => {
  console.log(req.body);


  for (let key in req.body) {
    if (key !== 'name' && key !== 'description') {
      return res.json({
        message: "send only name and description"
      });
    }
  }

  for (let key in req.body) {
    console.log(key);
    if (req.body[key] == "" || req.body[key] == null || !req.body[key]) {
      return res.json({
        message: "body is not empty"
      });
    }
  }

  if (!req.body.name || !req.body.description) {
    return res.json({
      message: " name and description  is must"
    });
  }


  data.push(req.body);
  return res.json({
    message: "data saved successfully",
    data
  });
});


const arr = [1, 2, 3, 4, 5, 6, 78,]
app.get("/get-saved-data", (req, res) => {
  return res.json({
    message: "data fetched successfully",
    data,
    arr
  });
});


app.put("/api/update-data", (req, res) => {
  const { name, description } = req.body;
  const user = data.filter((user) => user.name === name);
  console.log(user);
  user.name = name;
  user.description = description;
  const newData = [{ ...data }, { name, description }]
  return res.json({
    message: "updated successfully",
    newData,
    data
  });
});

// real routes 
app.use("/api/image", ImageRouter);
app.use("/api/user", userRouter);


app.listen(3000, () => {
  console.log("server is running on port " + 3000);
})