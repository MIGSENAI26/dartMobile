import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useFonts } from 'expo-font';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

interface NameProps {
    name: string;
}

export function Header({ name }: NameProps) {
    const [fontsLoaded] = useFonts({
        'OpenSans': require("../assets/fonts/OpenSans.ttf")
    });

    if (!fontsLoaded) {
        return null; 
    }

    const MaskedViewTSFix = MaskedView as any;

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/OfficialLogo.png")}
                style={styles.image}
            />
            
            <MaskedViewTSFix
                style={styles.maskedView} 
                maskElement={
                    <View style={styles.maskContainer}>
                        <Text style={styles.text}>{name}</Text>
                    </View>
                }
            >
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <LinearGradient
                        colors={['#30ed0a', '#fff', '#fff']} 
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    />
                </View>
            </MaskedViewTSFix>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 170,
        backgroundColor: "black",
        flexDirection: "row", 
        alignItems: "center", 
        paddingHorizontal: 20,
    },
    image: {
        marginTop: 10,
        width: 100,
        height: 100,
        marginRight: 15,
    },
    maskedView: {
        flex: 1,       
        height: 60,    
    },
    maskContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        flex: 1,
    },
    text: {
        fontFamily: "OpenSans",
        fontSize: 50, 
        fontWeight: "bold",
        color: 'black',
    }
});
