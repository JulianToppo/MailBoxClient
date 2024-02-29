const mail = require("../model/mails");
const user = require("../model/user");

const sendmail = async (req, res) => {
  try {
    const { subject, content, to } = req.body;
    console.log(subject, content, to);
    const userFound = await user.findOne({
      where: {
        email: to,
      },
    });

    if (!userFound) {
      res.status(500).json({ message: "Invalid email id", status: false });
    }
    const userCreate = await mail.create({
      to: userFound.id,
      content: content,
      subject: subject,
      userId: req.user.id,
      read: false,
    });

    if (userCreate) {
      console.log("After user createe")
      if(req.io){
           req.io.emit('message',{"juliandataaaaaaaaa":"check this out from socket"})
      }
   
      res
        .status(201)
        .json({ message: "Mail Sent successfully", status: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, status: false });
  }
};

const getAllMails = async (req, res) => {
  try {
    const allmail = await mail.findAll({
      where: {
        to: req.user.id,
      },
    });
    if (allmail) {
      res.status(200).json({ mailElements: allmail, status: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, status: false });
  }
};

const updateRead = async (req, res) => {
  try {
    const { id } = req.body;

    const mailItem = await mail.findOne({
      where: {
        id: id,
      },
    });

    console.log(mailItem);
    if (mailItem) {
      mailItem.read = true;
      mailItem.save();

      res
        .status(201)
        .json({ message: "Mail read updates successfully", status: true });
    } else {
      res.status(400).json({ message: "Mail id not found", status: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};

const deleteMail = (req, res) => {
  try {
    const id = req.params.id;

    mail
      .destroy({
        where: {
          id: id,
        },
      })
      .then((result) => {
        res
          .status(200)
          .json({ message: "Mail has been deleted", status: true });
      })
      .catch((err) => {
        res.status(400).json({ message: err, status: false });
      });
  } catch (error) {
    res.status(500).json({ message: error, status: false });
  }
};
const getAllSentMail = async (req, res) => {
  try {
    const allmail = await mail.findAll({
      where: {
        userId: req.user.id,
      },
    });
    if (allmail) {
      res.status(200).json({ mailElements: allmail, status: true });
    }
  } catch (error) {
    res.status(500).json({ error: error.message, status: false });
  }
};

const getUserDetails =async (req, res) => {
  try {
    let { id } = req.params;
   
    if (id == 'undefined' || id === null || id === '') {

      id = req.user.id;
    }
    console.log(id)
    const userFound =await user.findOne({
      where: {
        id: id,
      },
    });

    console.log("user Found",userFound)
    if (userFound) {
      res.status(200).json({
        message: "User has been logged in",
        status: true,
        email: userFound.email,
        username: userFound.username,
      });
    } else {
      res.status(401).json({ message: "Invalid User", status: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, status: false });
  }
};
module.exports = {
  sendmail,
  getAllMails,
  updateRead,
  deleteMail,
  getAllSentMail,
  getUserDetails,
};
