const jsonwebtoken = require("jsonwebtoken");
const userTable = require("../model/user");
const bcrypt = require("bcrypt");
const signupUser = async (req, res) => {
  try {
    console.log("SignUp Check");
    const { email, password,username } = req.body;
    const saltrounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltrounds);
    userTable
      .create({
        email: email,
        password: hashedpassword,
        username:username
      })
      .then((result) => {
        console.log(result);
        res.status(200).json({ message: "New User Created:User has Successfully signed up", status: true });
      }).catch((error) => {
        console.log("Error creating user:", error);
        res.status(400).json({ message: error.name, status: false });
      });
  } catch (error) {
    res.status(500).json({ message: error, status: true });
  }
};

module.exports = {
  signupUser,
};
