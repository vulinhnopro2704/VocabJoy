import { StackScreenProps } from "@react-navigation/stack";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	"(tabs)/profile-screen": undefined;
	"(tabs)/home-screen": undefined;
	"(tabs)/lesson-screen": undefined;
	"login-screen": undefined;
	"test-screen": undefined;
};

export type ProfileScreenProps = StackScreenProps<
	RootStackParamList,
	"(tabs)/profile-screen"
>;

export type HomeScreenProps = StackScreenProps<
	RootStackParamList,
	"(tabs)/home-screen"
>;

export type LessonScreenProps = StackScreenProps<
	RootStackParamList,
	"(tabs)/lesson-screen"
>;

export type LoginScreenProps = StackScreenProps<
	RootStackParamList,
	"login-screen"
>;

export type TestScreenProps = StackScreenProps<
	RootStackParamList,
	"test-screen"
>;
