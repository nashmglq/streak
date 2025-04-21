const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postStreak = async (req, res) => {
  try {
    const { streakName, goal } = req.body;
    const id = req.user.id;

    const findUser = await prisma.streak.findFirst({
      where: { userId: id, streakName: streakName },
    });

    if (!findUser) {
      await prisma.streak.create({
        data: {
          streakName: streakName,
          goal: goal,
          userId: id,
          currentStreak: 0,
          highestStreak: 0,
          lastActionTime: new Date(),
          streakStarted: new Date(),
        },
      });
      return res
        .status(200)
        .json({ success: `Successfully created "${streakName}"` });
    }

    return res.status(400).json({ error: `"${streakName}" already exist` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getStreak = async (req, res) => {
  try {
    const id = req.user.id
    
    const findUserStreaks = await prisma.streak.findMany({
      where: { userId: id }
    })
    
    return res.status(200).json({ success: findUserStreaks })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
};

const getDetailViewStreak = async(req,res) =>{
  try{
    // error becuase this is not an integer
    const {streakId} = req.params


    if(!streakId) return res.status(400).json({error: "No ID found."})

    const findUser = await prisma.streak.findUnique({where : {streakId: parseInt(streakId)}})

    return res.status(200).json({success: findUser})

  }catch(err){
    return res.status(500).json({success: err.message})

  }
}

const postStreakCount = async(req,res) => {
  try{

  }catch(err){
    
  }
}

module.exports = { postStreak, getStreak, getDetailViewStreak };
