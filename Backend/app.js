const express = require("express");
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const db = require("./util/database");

const userModel = require("./model/user");

const port = 3000;
app.use(bodyparser.json({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: [],
  })
);
app.use(signupRoutes);
app.use(loginRoutes);

app.get("/", (req, res) => {
  console.log("hello world");
});

db.sync({ force: false })
  .then(() => {
    app.listen(port, () => {
      console.log("app is listening...");
    });
  })
  .catch((err) => console.log(err));
