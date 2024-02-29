const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const socket= require('socket.io')
const http= require('http')


//Routes
const signupRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const mailRoutes = require("./routes/mail")


//DB
const db = require("./util/database");
const mailModel= require("./model/mails")
const userModel = require("./model/user");

const port = 3000;

const server= http.createServer(app)
const io= socket(server)

io.on('connection', (socket) => {
  console.log('A user connected');


  socket.on('exampleEvent', (data) => {
 
    req.io.emit('exampleEvent', data);
  });


  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use(bodyparser.json({ extended: false }));
app.use(
  cors({
    origin: "*",
    methods: ['GET','POST','DELETE','PUT'],
  })
);

app.use((req, res, next) => {
  req.io = io;
  next();
});
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
    server.listen(port, () => {
      console.log("app is listening...");
    });
  })
  .catch((err) => console.log(err));
