import { 
    TouchableOpacity, 
    Text, 
    StyleSheet,
    TouchableOpacityProps 
} from "react-native"

import {useFonts} from 'expo-font';

type ButtonProps = TouchableOpacityProps & {
    label: string
}

export function Button({label, ...rest} : ButtonProps){
    const [fontsLoaded] = useFonts({
        'OpenSans': require("../assets/fonts/OpenSans.ttf")
    })
    return(
        <TouchableOpacity 
            style={styles.container}
            activeOpacity={0.5} {...rest}
        >
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 200,
        height: 48,
        marginTop: 20,
        backgroundColor: "##30ed0a",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    },
    label:{
        color: "#fff",
        fontFamily: "OpenSans",
        fontSize: 23
    }
})