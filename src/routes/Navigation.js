import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import StartScreen from "../screens/StartScreen";
import HomeScreen from "../screens/HomeScreen";
import ShCartScreen from "../screens/ShCartScreen";
import ClClothesScreen from "../screens/ClClothesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ClWomenScreen from "../screens/WomenScreen";
import ClManScreen from "../screens/ManScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Start" component={StartScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Cart" component={ShCartScreen} />
                <Stack.Screen name="Classification" component={ClClothesScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Woman" component={ClWomenScreen} />
                <Stack.Screen name="Man" component={ClManScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
