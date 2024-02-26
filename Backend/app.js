const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

//Routes
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const mailRoutes = require("./routes/mail")


//DB
const db = require("./util/database");
const mailModel= require("./model/mails")
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
app.use(mailRoutes);

userModel.hasMany(mailModel),
mailModel.belongsTo(userModel)

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
