import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiGetUserInfoResponse, VocabularyUser } from "../api/api-user-slice";
import { User } from "lucide-react-native";
import { isSuccessfullStatus } from "@/utils/utils";

type User = {
	_id: null | String;
	name: null | String;
	email: null | String;
	phone: null | String;
	date: null | String;
	vocabulary: VocabularyUser[];
};

// Create the user slice
const userSlice = createSlice({
	name: "user",
	initialState: {
		_id: "",
		name: "",
		email: "",
		phone: "",
		date: "",
		vocabulary: [],
	},
	reducers: {
		// Action to set the user information
		setUser: (
			state: User,
			action: PayloadAction<ApiGetUserInfoResponse>
		) => {
			if (isSuccessfullStatus(action.payload.statusCode)) {
				state._id = action.payload.data._id;
				state.name = action.payload.data.name;
				state.email = action.payload.data.email;
				state.phone = action.payload.data.phone;
				state.date = action.payload.data.date;
				state.vocabulary = action.payload.data.vocabulary;
			}
		},
		// Action to clear the user information
		clearUser: (state) => {
			state._id = "";
			state.name = "";
			state.email = "";
			state.phone = "";
			state.date = "";
			state.vocabulary = [];
		},
	},
});

// Export the actions
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
