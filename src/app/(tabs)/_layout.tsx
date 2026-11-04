import {Tabs} from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function LayoutTabs(){
    return(
        <Tabs screenOptions={{
            headerShown: false,
            tabBarLabelPosition: "beside-icon",
            tabBarStyle: {
                flexDirection: "row"
            }
        }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    tabBarLabel: "Missão",
                    tabBarIcon: ({size})=> <MaterialIcons name="book" size={size}/>,
                    tabBarItemStyle: {flex: 1}
                }}
            />

            <Tabs.Screen 
                name="dart"
                options={{
                    tabBarLabel: "DART",
                    tabBarIcon: ({size})=> <MaterialIcons name="audiotrack" size={size}/>,
                    tabBarItemStyle: {flex: 1}
                }}
            />

            <Tabs.Screen 
                name="buy"
                options={{
                    tabBarLabel: "Comprar",
                    tabBarIcon: ({size})=> <MaterialIcons name="audiotrack" size={size}/>,
                    tabBarItemStyle: {flex: 1}
                }}
            />
        </Tabs>
    )
}