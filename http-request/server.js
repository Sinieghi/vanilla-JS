import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const router = express.Router();
const server = http.createServer(app);

let usersContent = [];
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:2000/");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
router
  .route("/content")
  .post((req, res) => {
    console.log(req.body);
    usersContent.push(req.body);
    res.status(201).json({ usersContent, msg: "success!" });
  })
  .get((req, res) => {
    console.log(usersContent);
    res.status(200).json({ usersContent });
  });
router.delete("/:id", (req, res) => {
  usersContent.filter((id, index) => {
    if (!id) return;
    if (id.userId.toString() === req.params.id) {
      usersContent[index] = null;
    }
    return id;
  });
});
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "client")));
app.use("/api/v1/users", router);

server.listen(2000, () => {
  console.log("We on port 2000");
});
