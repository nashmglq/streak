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
      where: { streakId: parseInt(streakId) },
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
      where: { streakId: parseInt(streakId) },
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

const AIresponse = async (req, res) => {
  try {
    const { streakId } = req.params;

    const getData = await prisma.streak.findUnique({
      where: { streakId: parseInt(streakId) },
      include: {
        user: {
          select:{
            name: true
          }
        }
      }
    });

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
    - Name of the user: ${getData.user.name} (only use their first name, not surname)`;
    
    // if 0 provide
    // ngayon greater than 0 check nalng if disable or enable, para if disable dun nalang mag send bago
    if(getData.currentStreak == 0 || getData.coolDown){
      const result = await model.generateContent(prompt);
      const saveAIresponse = await prisma.aiResponse.create({data:{
        response: result.response.text(),
        streakId : getData.streakId
      }})

      return res.status(200).json({ success: result.response.text() });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postStreak,
  getStreak,
  getDetailViewStreak,
  addStreakCount,
  AIresponse
};
