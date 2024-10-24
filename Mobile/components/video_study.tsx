
import { StyleSheet, View } from "react-native";
import { Video } from 'expo-av';

export default function VideoStudy (){
    return (
        <View style={styles.container}>
         <Video
            source={require("@/assets/video/videoStudy.mp4") } // URL video
            rate={1.0}
            volume={1.0}
            isMuted={false}
            shouldPlay
            isLooping
            style={styles.video}
        />
        </View>
    )
} 

const styles = StyleSheet.create(
    {
        container:{flex:1},
        video:{flex:1},
    }
)