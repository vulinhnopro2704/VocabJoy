import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TextInput,
	Image,
	TouchableOpacity,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Word } from "@/components/form/word-form";
import { useWordQuery } from "@/lib/features/api/api-search_word";
import Toast from "react-native-toast-message";
import LoadingIcon from "@/components/loadingicon";
import { useTranslateToVieQuery } from "@/lib/features/api/api-slice";
import { Vocab } from "@/data-types/vocabulary";

const Search = () => {
	const [vocab, setVocab] = useState<Vocab>({
		name: "chill",
		pronunciation: "",
		type: "",
		image_link: "",
		meaning: "ok",
		description: "",
		audio: "",
		example: "",
	});

	const [onSubmit, setOnSubmit] = useState<boolean>(false);
	const [input, setInput] = useState<string>("");
	const [word, setWord] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const {
		data,
		error: errorGet,
		isLoading: isLoadingGet,
	} = useWordQuery(word);
	const {
		data: meanRes,
		error: errorMean,
		isLoading: isLoadingMean,
	} = useTranslateToVieQuery(word);

	useEffect(() => {
		if (word && !isLoadingGet && !isLoadingMean) {
			getWord();
		}
	}, [data, meanRes]);

	useEffect(() => {
		if (errorGet && input) {
			Toast.show({
				text1: "Từ không tồn tại, vui lòng kiểm tra lại từ khóa.",
				position: "top",
			});
			setOnSubmit(false);
			setIsLoading(false);
		}
	}, [errorGet]);

	async function getWord() {
		try {
			const wordData = data && data[0];
			let example = "";

			// Loop through meanings and definitions to find the first example
			for (const meaning of wordData?.meanings || []) {
				for (const definition of meaning.definitions || []) {
					if (definition.example) {
						example = definition.example;
						break;
					}
				}
				if (example !== "") break; // Exit once an example is found
			}

			const dataWord: Vocab = {
				name: wordData!.word || "",
				pronunciation: wordData!.phonetics[1]?.text || "",
				type: wordData!.meanings[0]?.partOfSpeech.toUpperCase() || "",
				audio: wordData!.phonetics[0]?.audio || "",
				description:
					wordData!.meanings[0]?.definitions[0]?.definition || "",
				meaning: meanRes.data.mean || "",
				image_link: "",
				example: example || "",
			};
			setVocab(dataWord);
			setOnSubmit(true);
			setIsLoading(false);
		} catch (error) {
			Toast.show({
				text1: "Có lỗi trong khi tìm từ, vui lòng thử lại sau.",
				position: "top",
			});
			setIsLoading(false);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.header_item}>
					<TextInput
						underlineColorAndroid="transparent"
						placeholder="Gõ vào đây từ bạn muốn tìm"
						style={styles.header_item_input}
						value={input}
						onChangeText={(data) => setInput(data)}
					/>
					<TouchableOpacity
						onPress={() => {
							setWord(input);
							setIsLoading(true);
						}}
					>
						<FontAwesome6
							name="searchengin"
							size={24}
							color="#12C2E9"
						/>
					</TouchableOpacity>
				</View>
				<Text style={styles.header_text}>Từ điển Anh-Việt</Text>
			</View>
			<View style={styles.body}>
				{(isLoading || isLoadingMean) && <LoadingIcon />}
				{!isLoading && !onSubmit && (
					<Image
						style={styles.body_img}
						source={require("../../assets/images/search.jpg")}
					/>
				)}
				{!isLoading && onSubmit && <Word vocab={vocab} />}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	header: {
		flex: 2,
		width: "100%",
		backgroundColor: "#063970",
		alignItems: "center",
		justifyContent: "center",
	},
	header_item: {
		width: "80%",
		height: 50,
		backgroundColor: "white",
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	header_item_input: {
		width: "75%",
		height: 30,
		color: "black",
		fontWeight: "400",
		borderRightWidth: 2,
		borderColor: "gray",
		marginRight: 20,
	},
	header_text: {
		fontSize: 14,
		color: "white",
		fontWeight: "600",
		marginTop: 20,
	},
	body: {
		flex: 8,
		alignItems: "center",
		width: "100%",
	},
	body_img: {
		width: "90%",
		height: "75%",
	},
});

export default Search;
