const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { secureHeapUsed } = require("crypto");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ error: "Credentials are not provided" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture: profilePic } = payload;

    if (!email) return res.status(400).json({ error: "Email is not provided" });

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { name, email, googleId, profilePic },
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });


    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, 
        sameSite: "lax",
      })
      .status(200)
      .json({ success: true });
      
  } catch (err) {
    // console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await prisma.user.findUnique({ where: { id } });

    return res.status(200).json({
      success: [
        {
          email: user.email,
          id: user.id,
          name: user.name,
          picture: user.profilePic,
        },
      ],
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const authCookie = (req, res) => {
  try {
    // return true, we already have our middleware
    return res.json({ success: true });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const logout = (req, res) => {
  try {
    return res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

module.exports = { verifyGoogleToken, getProfile, authCookie, logout };
