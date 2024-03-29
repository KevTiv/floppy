import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeScreen} from "../screens/Home";

const Stack = createNativeStackNavigator();
export function AppNavigation() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}
