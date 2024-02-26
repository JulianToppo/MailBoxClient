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
    });

    if (userCreate) {
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
module.exports = {
  sendmail,
  getAllMails,
};
