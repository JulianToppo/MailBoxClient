const bcrypt = require("bcrypt");
const user = require("../model/user");
const jsonwebtoken = require("jsonwebtoken");

const comparePassword = async (res, password) => {
  try {
    const response = await bcrypt.compare(password, res);
    console.log("response", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const generateToken = (id) => {
  const token= jsonwebtoken.sign({ userId: id }, "secretkey");
  console.log(token)
  return token
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const userFound = await user.findOne({
      where: {
        email: email,
      },
    });

  
    if (userFound) {
      const passwordCheck = await comparePassword(userFound.password, password);
      if (passwordCheck) {
        console.log("check1")
        res
          .status(200)
          .json({
            message: "User has been logged in",
            status: true,
            token: generateToken(userFound.id)
          });
      } else {
        
        res.status(401).json({ message: "Wrong Password", status: false });
      }
    } else {
      res.status(401).json({ message: "Invalid Email", status: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

module.exports = {
  loginUser,
};
