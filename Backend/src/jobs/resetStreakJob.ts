import User from "../models/user";

export const resetStreak = async () => {
    console.log("Running Streak reset job on server startup...");
  
    try {
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
  
      const users = await User.find(); 
  
      for (const user of users) {
        const lastActiveDate = new Date(user.lastActiveDate || 0);
        lastActiveDate.setUTCHours(0, 0, 0, 0);
  
        if (today.getTime() - lastActiveDate.getTime() > 86400000) {
          user.streak = 0;
          await user.save();
        }
      }
  
      console.log("Streak reset job completed successfully.");
    } catch (error) {
      console.error("Error running Streak reset job:", error);
    }
  };

//import cron from "node-cron";

//cron.schedule("0 0 * * *", resetStreak);
