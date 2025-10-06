const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token || token === null) {

      return res.json({ message: "User Not Authorized", success: false });
    }
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const id = decodedValue.id;
    const user = await userModel.findById(id);
    // console.log("user in verify user is", user)

    if (!user) {
      res.json({ message: "User Not Authorized", success: false });
    }
    // req.body.userId = user._id;
    req.user= user
    next();
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error", success: false });
  }
};

module.exports = verifyUser;
