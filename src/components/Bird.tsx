import {
    Image,
    useImage,
} from "@shopify/react-native-skia";
import {Canvas} from "./Themed";

export function FloppyBird(){
    const floppyImg = useImage(require('../../assets/player/bird1gif.gif'));

    return(
        <Canvas style={{backgroundColor: 'transparent'}}>
            <Image
                image={floppyImg}
                x={0}
                y={120}
                width={100}
                height={40}
                fit="contain"
            />
        </Canvas>
    )
}
