const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { secureHeapUsed } = require("crypto");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ error: "Credentails are not provided" });

    const ticket = await client.verifyIdToken({
      // renaming
      idToken : credential,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    const payload = ticket.getPayload()
    const {sub: googleId, email, name} = payload

    if(!email) return res.status(400).json({ error: "Email is not provided" });

    let user = await prisma.user.findUnique({where: {email}})

    if(!user){
      // update the user variable
      user = await prisma.user.create({
        data: {
          name, 
          email,
          googleId // Or pede din si sub
        }
      })
    }

  const token = jwt.sign({
    id: user.id
  })

  return res.status(200).json({success: token})



  } catch (err) {
    return res.status(500).json({error: err.message})
  }
};

module.exports = { verifyGoogleToken };
