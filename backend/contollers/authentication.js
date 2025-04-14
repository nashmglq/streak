const express = require("express");
const app = express();

const getGoogle = (req, res) => {
  const user = req.user;
  const token = jwt.sign(
    {
      id: user.id,
      name: user.displayname,
      email: user.emails[0].value,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
};

module.exports = { getGoogle };
