const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Google credential is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    if (!email) {
      return res.status(400).json({ error: "Email not provided by Google" });
    }

    try {
      let user = await prisma.user.findUnique({ 
        where: { email },
        include: { streak: true }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name,
            email,
            googleId,
          },
        });
        console.log("New user created:", user.id);
      } else if (user.googleId !== googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { googleId },
        });
        console.log("Updated user googleId:", user.id);
      }


      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1hr" }
      );

      return res.status(200).json({ 
        success: { 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          }
        } 
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({ error: "Database operation failed", details: dbError.message });
    }
  } catch (err) {
    console.error("Google verification error:", err);
    // More detailed error response
    return res.status(500).json({ 
      error: "Authentication failed", 
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

module.exports = { verifyGoogleToken };