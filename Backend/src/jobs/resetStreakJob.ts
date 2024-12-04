import cron from "node-cron";
import User from "../models/user";

cron.schedule("0 0 * *", async () => {
    console.log("Running Streak reset job at 00:00");

    try {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const users = await User.find();

        for(const user of users) {
            const lastActiveDate = new Date(user.lastActiveDate || 0);
            lastActiveDate.setHours(0, 0, 0, 0);

            if (today.getTime() - lastActiveDate.getTime() > 86400000) //86400000 = 1 date
            {
                user.streak = 0;
                await user.save()
            }
        }
        console.log("Streak reset job completed");
    } catch (error) {
        console.error("Error resetting streaks:", error);
    }
})