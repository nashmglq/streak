const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
          endOfTime: new Date(nextMidnightDate),
          coolDownTimer: new Date(today),
          coolDown: false,
          aiPrompt: true,
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

    const manilaNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
    const now = manilaNow.toISOString();

    if (!streakId) return res.status(400).json({ error: "No ID found." });

    const findStreakId = await prisma.streak.findUnique({
      where: { streakId: parseInt(streakId) },
    });

    if (!findStreakId) return res.status(400).json({ error: "No ID found." });

    const coolDownTimeISO = findStreakId.coolDownTimer.toISOString();
    const endOfStreakISO = findStreakId.endOfTime.toISOString();
    console.log(coolDownTimeISO, now);
    if (coolDownTimeISO <= now) {
      await prisma.streak.update({
        where: { streakId: parseInt(streakId) },
        data: {
          coolDown: false,
        },
      });
    }

    if (endOfStreakISO <= now) {
      await prisma.streak.update({
        where: { streakId: parseInt(streakId) },
        data: {
          currentStreak: 0,
          aiPrompt: true,
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

    const manilaNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
    const coolDownTimer = new Date(manilaNow.getTime() + 60000);
    const endOfTime = new Date(manilaNow.getTime() + 66000);

    const fetchStreak = await prisma.streak.findUnique({
      where: { streakId: parseInt(streakId) },
    });

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
      where: { streakId: parseInt(streakId) },
      data: {
        currentStreak: fetchStreak.currentStreak + 1,
        highestStreak: highStreak + 1,
        lastActionTime: new Date(),
        streakStarted: fetchStreak.streakStarted,
        endOfTime: endOfTime,
        coolDown: true,
        coolDownTimer: coolDownTimer,
        aiPrompt: true,
      },
    });

    return res.status(200).json({ success: updateStreakCount });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const AIresponse = async (req, res) => {
  try {
    const { streakId } = req.params;
    const timeNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
    const getData = await prisma.streak.findUnique({
      where: { streakId: parseInt(streakId) },
      include: {
        user: {
          select: {
            name: true,
          }
        }
      },
    });
    console.log("qwe", getData.aiResponse)

    const prompt = `You are a motivational coach and health progress indicator. Your task is to respond based on the user's goal, the title of their streak, and the number of streak days.

    Provide the following in your response:
    1. If the current streak is 0, encourage the user to start and take the first step.
    2. If the streak is ongoing, motivate based on their current streak.
    3. Mention possible improvements based on the streak duration.
    4. Encourage them to beat or maintain their highest streak.
    5. Keep it short, casual, and natural. Do not include section titles like "Motivation", "Insights", etc.
    
    User Data:
    - Goal: ${getData.goal}
    - Streak Title: ${getData.streakName}
    - Current Streak: ${getData.currentStreak} days
    - Highest Streak: ${getData.highestStreak} days
    - Name of the user: ${getData.user.name} (only use their first name, not surname)
    
    Additional instructions:
    - If the user has already have a streak base on the highest streak you should say something because they break their streak
    - Saying your back to zero but add some motivational text for the user
    `;


    if (
      (getData.currentStreak == 0 && getData.aiPrompt) ||
      (getData.coolDown && getData.aiPrompt) ||
      (getData.highestStreak > 0 &&
        getData.currentStreak == 0 &&
        getData.aiPrompt)
    ) {
      const result = await model.generateContent(prompt);
      await prisma.aiResponse.create({
        data: {
          response: result.response.text(),
          streakId: getData.streakId,
          dateReturn: timeNow
        },
      });

      await prisma.streak.update({
        where: { streakId: parseInt(streakId) },
        data: {
          aiPrompt: false,
        },
      });
    }
    const getAllAiResponse = await prisma.aiResponse.findMany({
      where: { streakId: parseInt(streakId) },
    });
    return res.status(200).json({ success: getAllAiResponse });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteStreak = async (req, res) => {
  try {
    const {streakId} = req.params;
    const userId = req.user.id;

    if (!streakId) return res.status(400).json({ error: "No ID found." });

    const findUser = await prisma.streak.findUnique({
      where: { streakId: parseInt(streakId) },
    });

    if (userId == findUser.userId) {
      const deleteStreak = await prisma.streak.delete({
        where: { streakId: parseInt(streakId) },
      });

      return res
        .status(200)
        .json({ success: `Successfully deleted id ${streakId}` });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateStreak = async (req, res) => {
  try {
    const { streakName, goal, streakId } = req.body;
    const userId = req.user.id;

    if (!streakName && !goal && !streakId) {
      return res.status(400).json({ error: "Please provide all fields." });
    }

    const findStreak = await prisma.streak.findUnique({
      where: { streakId: parseInt(streakId) },
    });

    if (!findStreak) return res.status(400).json({ error: "No ID found." });
    console.log(findStreak.userId, userId);
    if (findStreak.userId != userId)
      return res.status(200).json({ error: "You are not authenticated." });
    await prisma.streak.update({
      where: { streakId: parseInt(streakId) },
      data: {
        streakName,
        goal,
      },
    });

    return res
      .status(200)
      .json({ success: "Successfully Updated your streak." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postStreak,
  getStreak,
  getDetailViewStreak,
  addStreakCount,
  AIresponse,
  deleteStreak,
  updateStreak,
};
