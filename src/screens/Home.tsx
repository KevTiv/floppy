import {View, Text, Background, FloppyBird} from "../components";
import {StatusBar} from "expo-status-bar";

export function HomeScreen() {
    return (
        <View>
            <StatusBar />
            <Background>
                <Text>Home Screen</Text>
                <FloppyBird />
            </Background>
        </View>
    );
}
