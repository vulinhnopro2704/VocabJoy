import { Audio } from "expo-av";

export const playSound = async (audio: string) => {
	const { sound } = await Audio.Sound.createAsync({ uri: audio });
	return { sound };
};

export const playLocalSound = async (audioFile: any) => {
	const { sound } = await Audio.Sound.createAsync(audioFile);
	return sound;
};
