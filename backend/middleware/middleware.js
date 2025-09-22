const jwt  = require("jsonwebtoken");

const authCheck = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(`User token: ${token}`)
    if (!token) return res.status(400).json({ error: "No token found" });

    const compareJwtSecret = jwt.verify(token, process.env.JWT_SECRET);

    if (compareJwtSecret) {
      req.user = compareJwtSecret;
    }
    next();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { authCheck };
