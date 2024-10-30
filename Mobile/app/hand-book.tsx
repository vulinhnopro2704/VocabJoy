import VocabListItem from "@/components/vocab-list-item";
import { Colors } from "@/constants/colors";
import { Vocab } from "@/data-types/vocabulary";
import { useGetVocabByLevelMutation } from "@/lib/features/api/api-user-slice";
import { useAppSelector } from "@/lib/hook";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

export default function HandBook() {
	const [level, setLevel] = useState(1);
	const [search, setSearch] = useState("");
	const [offset, setOffset] = useState(0);
	const [size, setSize] = useState(30);
	const [vocabList, setVocabList] = useState<Vocab[]>([]);
	const userId = useAppSelector((state) => state.user._id);
	const [isReacheEnd, setIsReacheEnd] = useState(false);

	const [getVocabByLevel, { data, isLoading, isSuccess }] =
		useGetVocabByLevelMutation();

	useEffect(() => {
		fetchVocab();
	}, [level, offset]);

	const fetchVocab = async () => {
		if (isReacheEnd) return;
		const response = await getVocabByLevel({
			userId,
			level,
			offset,
			size,
		});

		if (
			response.data &&
			response.data.success == true &&
			response.data.data.vocabulary.length > 0
		) {
			setVocabList((prevList) => [
				...prevList,
				...response.data.data.vocabulary,
			]);
		} else {
			setIsReacheEnd(true);
		}
	};

	const handleLevelChange = (newLevel: number) => {
		if (newLevel === level) {
			return;
		}
		setIsReacheEnd(false);
		setLevel(newLevel);
		setOffset(0);
		setVocabList([]);
	};

	const handleSearch = (text: string) => {
		setSearch(text);
	};

	const handleLoadMore = () => {
		if (!isLoading) {
			setOffset((prevOffset) => prevOffset + size);
		}
	};

	if (isLoading && offset === 0) {
		return (
			<View style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.levelWrap}>
				<FlatList
					data={Array.from({ length: 5 })}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ index }) => (
						<Pressable
							style={[
								styles.levelBox,
								level === index + 1
									? styles.levelBoxSelected
									: styles.levelBoxNotSelected,
							]}
							onPress={() => handleLevelChange(index + 1)}
						>
							<Text
								style={[
									level === index + 1
										? styles.levelTextSelected
										: styles.levelTextNotSelected,
									styles.levelText,
								]}
							>
								Level {index + 1}
							</Text>
						</Pressable>
					)}
					contentContainerStyle={styles.levelWrap}
				/>
			</View>
			<View style={styles.searchContainer}>
				<TextInput
					value={search}
					onChangeText={handleSearch}
					placeholder="Gõ vào đây từ muốn tìm"
					style={styles.searchInput}
				/>
				<Search />
			</View>
			{vocabList.length > 0 && (
				<FlatList
					data={vocabList}
					renderItem={({ item }) => (
						<VocabListItem key={item._id} vocabulary={item} />
					)}
					keyExtractor={(item) => item._id!}
					ItemSeparatorComponent={() => (
						<View style={styles.separator} />
					)}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.5}
				/>
			)}
			{vocabList.length === 0 && (
				<View>
					<Text>Không có từ nào</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
	},
	levelWrap: {
		flexDirection: "row",
		marginBottom: 20,
	},
	levelBox: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 10,
		marginHorizontal: 5,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		elevation: 5,
		marginHorizontal: 5,
		borderRadius: 10,
	},
	levelBoxSelected: {
		backgroundColor: Colors.primary,
		shadowColor: Colors.primary,
	},
	levelBoxNotSelected: {
		backgroundColor: "#fff",
		shadowColor: "#000",
	},
	levelText: {
		fontSize: 16,
	},
	levelTextSelected: {
		color: "#fff",
	},
	levelTextNotSelected: {
		color: "#000",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	searchInput: {
		flex: 1,
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 10,
		marginRight: 10,
	},
	searchIcon: {
		color: Colors.primary,
	},
	itemContainer: {
		padding: 10,
		backgroundColor: "#f9f9f9",
		borderRadius: 10,
	},
	itemText: {
		fontSize: 16,
		color: "#333",
	},
	separator: {
		height: 10,
	},
});
