const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleAuth = async (req, res) => {
 try{
  const { id, displayName, emails } = req.user;
  // emails return an array, then pick the value(the actual email)
  const primaryEmail = emails[0].value
  const userCheck = await prisma.user.findUnique({ where: { email: primaryEmail } });

  if (!userCheck) {
    user = await prisma.user.create({
      data: {
        name: displayName,
        email: primaryEmail,
        googleId: id,
      },
    });
  }
  const token = jwt.sign(
    {
      id: id,
      email: emails,
      name: displayName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1hr" }
  );

  return res.status(200).json({ success: { token: token } });
 }catch(err){
    return res.status(500).json({error: err.message})
 }
};

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
        include: { streak: true } // Include streak data if you need it in the response
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

module.exports = { googleAuth, verifyGoogleToken };