const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postStreak = async (req, res) => {
  try {
    const { streakName, goal } = req.body;
    const id = req.user.id;

    const findUser = await prisma.streak.findFirst({
      where: { userId: id, streakName: streakName },
    });

    // Trigger 12 AM reset & next day 12 AM
    const todayMidnight = new Date().setHours(0, 0, 0, 0);
    const nextMidnightDate = new Date();
    nextMidnightDate.setDate(nextMidnightDate.getDate() + 1);
    const nextMidnight = nextMidnightDate.setHours(0, 0, 0, 0);

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
          //wrap to be considered time
          endOfTime: new Date(nextMidnight),
          coolDownTimer: new Date(todayMidnight),
          coolDown: false,
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
    const id = req.user.id;

    const findUserStreaks = await prisma.streak.findMany({
      where: { userId: id },
    });

    if (!id || !findUserStreaks)
      return res.status(400).json({ error: "No ID found." });

    // Trigger 12 AM reset & next day 12 AM
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0)
    const nextMidnight = new Date();
    nextMidnight.setDate(nextMidnight.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0); 

    const updateCooldDown = await prisma.streak.updateMany({
      where: { userId: id },
      data: {
        coolDownTimer: new Date(todayMidnight),
        coolDown: false,
        endOfTime: new Date(nextMidnight),
      },
    });

    return res.status(200).json({ success: findUserStreaks });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getDetailViewStreak = async (req, res) => {
  try {
    const { streakId } = req.params;

    const findUser = await prisma.streak.findUnique({
      where: { streakId: parseInt(streakId) },
    });

    if (!streakId || !findUser)
      return res.status(400).json({ error: "No ID found." });

    return res.status(200).json({ success: findUser });
  } catch (err) {
    return res.status(500).json({ success: err.message });
  }
};

const addStreakCount = async (req, res) => {
  try {
    const { streakId } = req.body;
    let highStreak = 0;

    const fetchStreak = await prisma.streak.findUnique({
      where: { streakId },
    });

    if (fetchStreak.currentStreak + 1 > fetchStreak.highestStreak) {
      highStreak = fetchStreak.currentStreak;
    } else {
      highStreak = fetchStreak.highestStreak;
    }

    const updateStreakCount = await prisma.streak.update({
      where: { streakId },
      data: {
        currentStreak: fetchStreak.currentStreak + 1,
        highestStreak: highStreak + 1,
        lastActionTime: new Date(),
        streakStarted: fetchStreak.streakStarted,
        //wrap to be considered time
        endOfTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        countDown: true,
        coolDownTimer: new Date(),
      },
    });
    return res.status(200).json({ success: updateStreakCount });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const countDownStreak = async (req, res) => {
  try {
    const { streakId } = req.params;
    const findCountDown = await prisma.streak.findUnique({
      where: { streakId: parseInt(streakId) },
    });

    if (!streakId || !findCountDown)
      return res.status(400).json({ error: "No ID found." });

    // const todayMidnight = new Date().setHours(0, 0, 0, 0);

    return res.status(200).json({success: "Success"})
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const coolDownStreak = async (req, res) => {
  try {
    const { streakId } = req.params;

    // const findCoolDown = await prisma.status.findUnique({
    //   where: { streakId: parseInt(streakId) },
    // });

    return res.status(200).json({success: "Success"})
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postStreak,
  getStreak,
  getDetailViewStreak,
  addStreakCount,
  countDownStreak,
  coolDownStreak,
};
