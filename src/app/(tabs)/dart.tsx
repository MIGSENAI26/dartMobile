import { Header } from "@/components/Header";
import { View, StyleSheet } from "react-native";

export default function Dart(){
    return(
        <View style={styles.container}>
            <Header 
                name="DART"
            />
        </View>
           
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    }
})