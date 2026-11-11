import {StyleSheet, TextInput, TextInputProps} from "react-native";

export function Input({...rest} : TextInputProps){
    return(
        <TextInput 
            style={styles.input}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    input:{
        width: 300,
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#30ed0a",
        fontSize: 16,
        paddingLeft: 12,
        color: "#000000",
        backgroundColor: "white"
    }
})