import { Colors } from "@/constants/colors";
import { Vocab } from "@/data-types/vocabulary";
import { Search } from "lucide-react-native";
import { useState } from "react";
import {
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";

export default function HandBook() {
	const [level, setLevel] = useState(0);
	const [data, setData] = useState<Vocab[] | null>(null);
	const [search, setSearch] = useState("");

	return (
		<View style={styles.container}>
			<View style={styles.levelWrap}>
				{Array.from({ length: 4 }).map((_, index) => (
					<Pressable
						key={index}
						style={[
							styles.levelBox,
							level === index + 1
								? styles.levelBoxSelected
								: styles.levelBoxNotSelected,
						]}
						onPress={() => {
							setLevel(index + 1);
						}}
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
				))}
			</View>
			<View style={styles.searchContainer}>
				<TextInput
					value={search}
					onChangeText={(text) => setSearch(text)}
					placeholder="Gõ vào đây từ muốn tìm"
					style={styles.searchInput}
				/>
				<Search />
			</View>
			{data && data.length > 0 && (
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<View style={styles.itemContainer}>
							<Text style={styles.itemText}>{item.name}</Text>
							<Text style={styles.itemText}>{item.type}</Text>
							<Text style={styles.itemText}>
								{item.pronunciation}
							</Text>
							<Text style={styles.itemText}>{item.meaning}</Text>
						</View>
					)}
					keyExtractor={(item) => item._id!}
					ItemSeparatorComponent={() => (
						<View style={styles.separator} />
					)}
				/>
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
		fontSize: 20,
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
