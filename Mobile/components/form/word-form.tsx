import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Audio } from "expo-av";
import {
	useGetUserIdQuery,
	useGetVocabularyQuery,
	useSaveVocabForUserMutation,
	useSaveVocabularyMutation,
} from "@/lib/features/api/api-slice";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import LoadingIcon from "../loadingicon";
import { Vocab } from "@/data-types/vocabulary";
import { playSound } from "@/utils/play-sound";

export const Word: React.FC<{ vocab: Vocab }> = ({ vocab }) => {
	var Sound: Audio.Sound;
	const [saveVocabulary, { error: errorSave, isLoading: loadingSave }] =
		useSaveVocabularyMutation();
	const {
		data: vocabFind,
		error: errorGet,
		isLoading: loadingGet,
		refetch,
	} = useGetVocabularyQuery(vocab.name);
	const {
		data: userId,
		error: errorGetUserId,
		isLoading: loadingGetUserId,
	} = useGetUserIdQuery("");
	const [
		saveVocabForUser,
		{ error: errorSaveVocabUser, isLoading: loadingSaveVocabUser },
	] = useSaveVocabForUserMutation();

	const handlePlaySound = async () => {
		Sound = await playSound(vocab.audio!);
	};

	const saveVocab = async () => {
		try {
			refetch();
			var vocabId;
			if (!vocabFind) {
				const newVocab = await saveVocabulary(vocab).unwrap();

				vocabId = newVocab.data._id;
			} else vocabId = vocabFind.data._id;

			const result = await saveVocabForUser({
				vocabId,
				userId: userId.data._id,
			}).unwrap();

			if (result)
				Toast.show({
					text1: "Lưu Từ Thành Công",
					position: "top",
				});
		} catch (error: any) {
			if (error.data.message == "Tu da ton tai")
				Toast.show({
					text1: "Lưu Từ Thành Công",
					position: "top",
				});
			else
				Toast.show({
					text1: "Không thể lưu từ",
					position: "top",
				});
		}
	};

	return (
		<View style={styles.container}>
			<Text style={{ fontSize: 30, fontWeight: "600" }}>
				{vocab.name}
			</Text>
			<View style={styles.voice}>
				<Text style={{ color: "red", fontSize: 16 }}>US</Text>
				<TouchableOpacity
					onPress={() => {
						if (vocab.audio) handlePlaySound();
					}}
				>
					<View style={styles.button}>
						<AntDesign name="sound" size={18} color="#12C2E9" />
					</View>
				</TouchableOpacity>
				<Text style={{ fontSize: 16 }}>{vocab.pronunciation}</Text>
			</View>
			<View style={styles.container_mean}>
				<View style={styles.mean}>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>
						{vocab.meaning}
					</Text>
					<Text style={{ fontSize: 16 }}>( {vocab.type} )</Text>
				</View>
				{loadingSave && loadingGet && loadingSaveVocabUser ? (
					<LoadingIcon></LoadingIcon>
				) : (
					<TouchableOpacity onPress={saveVocab}>
						<View style={styles.button_save}>
							<MaterialIcons
								name="data-saver-on"
								size={14}
								color="white"
							/>
							<Text
								style={{
									fontSize: 14,
									color: "white",
									fontWeight: "600",
								}}
							>
								Save
							</Text>
						</View>
					</TouchableOpacity>
				)}
			</View>
			<Text>{vocab.description}</Text>
			<Text>{vocab.example}</Text>
			<View style={styles.container_img}>
				<Image
					style={styles.img}
					source={require("../../assets/images/mochi.png")}
				></Image>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "90%",
		marginTop: 20,
		gap: 15,
	},
	button_save: {
		width: 58,
		height: 30,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 2,
		backgroundColor: "#2da23f",
		borderRadius: 20,
		shadowColor: "#145a1d",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 4,
	},
	container_mean: {
		width: "95%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	voice: {
		flexDirection: "row",
		gap: 20,
		alignItems: "center",
	},
	button: {
		width: 30,
		height: 30,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000", // Màu bóng
		shadowOffset: { width: 0, height: 3 }, // Độ lệch bóng
		shadowOpacity: 0.3, // Độ trong suốt của bóng
		shadowRadius: 4, // Độ nhòe của bóng
	},
	mean: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	container_img: {
		width: "100%",
		alignItems: "center",
		marginTop: 30,
	},
	img: {
		width: 70,
		height: 80,
	},
});
