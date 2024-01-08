import React from "react";
import {
    Image,
    useImage,
    useAnimatedImageValue
} from "@shopify/react-native-skia";
import {Canvas} from "./theme/Themed";
import {useDerivedValue, useSharedValue} from "react-native-reanimated";


const PLAYER_IMG = '../../assets/player/bird1gif.gif'

export function FloppyBird(){
    const [paused, setPaused] = React.useState(false);
    const animatedFloppyImg = useAnimatedImageValue(require(PLAYER_IMG));
    const floppyImg = useImage(require(PLAYER_IMG));

    return(
        <Canvas style={{backgroundColor: 'transparent'}}>
            <Image
                image={animatedFloppyImg}
                x={0}
                y={120}
                width={100}
                height={40}
                fit="contain"
            />
        </Canvas>
    )
}
