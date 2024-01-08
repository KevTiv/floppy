import {Canvas, View} from "./theme/Themed";
import {useImage, Image, Group} from "@shopify/react-native-skia";
import {StyleSheet, Dimensions} from "react-native";
import React from "react";

type BackgroundProps = {
    children: React.ReactElement | React.ReactElement[]
}

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');
const GROUND_CELL_HEIGHT = 100;
const GROUND_CELLS = 4
export function Background({children}: BackgroundProps) {
    const currentLevel = 4;
    const bgImg = useImage(require('../../assets/background/Background3.png'));
    const groundType1Img = useImage(require('../../assets/tiles/Ground1.png'));
    const groundType2Img = useImage(require('../../assets/tiles/Ground2.png'));

    return(
        <View style={{backgroundColor: 'transparent'}}>
            <Canvas style={styles.container}>
                <Image image={bgImg} fit="fill" x={0} y={0} width={SCREEN_WIDTH} height={SCREEN_HEIGHT} />
                <Group>
                    {Array.from({length: GROUND_CELLS}, (_, index) => (
                        <Image
                            key={index}
                            image={currentLevel % 4 === 0 ? groundType1Img : groundType2Img}
                            fit="fill"
                            x={0 + (SCREEN_WIDTH * 0.25 * index)}
                            y={SCREEN_HEIGHT * 0.9}
                            width={SCREEN_WIDTH/4}
                            height={GROUND_CELL_HEIGHT}
                        />
                    ))}
                </Group>
            </Canvas>
            <View style={styles.children}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    groundCell: {
        flex: 2,
        position: 'absolute',
        bottom: -100,
        right: 0,
        left: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    children: {
        backgroundColor: 'transparent',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
