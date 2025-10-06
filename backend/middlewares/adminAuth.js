const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];

    if (!token) {
      return res.json({ message: "UnAuthorized user", success: false });
    }
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedValue.email !== process.env.adminEmail)
      return res.json({ message: "UnAuthorized user", success: false });
    next();
  } catch (error) {
    console.log(error)
    return res.json({message:"Internal server error", success:false,error:error})
  }
};

module.exports= verifyAdmin
