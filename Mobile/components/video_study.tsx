
import { StyleSheet, View } from "react-native";
import Video from 'react-native-video';


export default function VideoStudy (){
    return (
        <View style={styles.container}>
             <Video
                source={{ uri: require("@/asset/video/videoStudy") }} 
                style={styles.video}
                controls={false}
                resizeMode="cover"
                onBuffer={() => console.log('Buffering...')}
                onError={(error) => console.log('Error:', error)}
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