const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postStreak = async (req, res) => {
  try {
    const { streakName, goal } = req.body;
    const id = req.user.id;

    const findUser = await prisma.streak.findFirst({
      where: { userId: id, streakName: streakName },
    });

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const nextMidnightDate = new Date();
    nextMidnightDate.setDate(nextMidnightDate.getUTCDate() + 1);
    nextMidnightDate.setUTCHours(0, 0, 0, 0);
    console.log(new Date(today), new Date(nextMidnightDate));

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
          endOfTime: new Date(today),
          coolDownTimer: new Date(nextMidnightDate),
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

    return res.status(200).json({ success: findUserStreaks });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getDetailViewStreak = async (req, res) => {
  try {
    const { streakId } = req.params;
    const today = new Date();
    today.setDate(today.getUTCDate());
    today.setUTCHours(0, 0, 0, 0);

    if (!streakId) return res.status(400).json({ error: "No ID found." });

    const findStreakId = await prisma.streak.findUnique({
      where: { streakId: parseInt(streakId) },
    });

    if (!findStreakId) return res.status(400).json({ error: "No ID found." });

    if (findStreakId.coolDownTimer == today) {
      await prisma.streak.update({
        where: { streakId: parseInt(streakId) },
        data: {
          coolDown: false,
        },
      });
    }

    return res.status(200).json({ success: findStreakId });
  } catch (err) {
    return res.status(500).json({ success: err.message });
  }
};

const addStreakCount = async (req, res) => {
  try {
    const { streakId } = req.body;
    let highStreak = 0;
    const today = new Date();
    today.setDate(today.getUTCDate() + 1);
    today.setUTCHours(0, 0, 0, 0);
    const nextMidnightDate = new Date();
    nextMidnightDate.setDate(nextMidnightDate.getUTCDate() + 2);
    nextMidnightDate.setUTCHours(0, 0, 0, 0);

    const fetchStreak = await prisma.streak.findUnique({
      where: { streakId },
    });

    // Error date because of template literals
    if (fetchStreak.coolDown)
      return res
        .status(400)
        .json({ error: `${fetchStreak.coolDownTimer.toUTCString()}` });

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
        endOfTime: new Date(nextMidnightDate),
        coolDown: true,
        coolDownTimer: new Date(today),
      },
    });
    return res.status(200).json({ success: updateStreakCount });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


module.exports = {
  postStreak,
  getStreak,
  getDetailViewStreak,
  addStreakCount,
};
