const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const postStreak = async (req, res) => {
  try {
    const {streakName} = req.body
    const id = req.user.id

    // const findUser = await prisma.streak.findUnique({where: {id}})

    // if

  } catch (err) {}
};
