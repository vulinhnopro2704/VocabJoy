// navigation.d.ts
import { StackScreenProps } from "@react-navigation/stack";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	"profile-screen": undefined;
	"(tabs)": undefined;
	"+not-found": undefined;
	"(tabs)/login.tsx": undefined;
};

export type ProfileScreenProps = StackScreenProps<
	RootStackParamList,
	"profile-screen"
>;
