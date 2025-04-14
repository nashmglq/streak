const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken")

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

module.exports = { googleAuth };
