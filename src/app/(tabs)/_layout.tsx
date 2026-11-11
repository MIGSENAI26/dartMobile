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
                name="missao"
                options={{
                    tabBarLabel: "Missão",
                    tabBarIcon: ({size})=> <MaterialIcons name="flag" size={size}/>,
                    tabBarItemStyle: {flex: 1}
                }}
            />

            <Tabs.Screen 
                name="index"
                options={{
                    tabBarLabel: "DART",
                    tabBarIcon: ({size})=> <MaterialIcons name="gps-fixed" size={size}/>,
                    tabBarItemStyle: {flex: 1}
                }}
            />

            <Tabs.Screen 
                name="buy"
                options={{
                    tabBarLabel: "Comprar",
                    tabBarIcon: ({size})=> <MaterialIcons name="shopping-cart" size={size}/>,
                    tabBarItemStyle: {flex: 1}
                }}
            />
        </Tabs>
    )
}