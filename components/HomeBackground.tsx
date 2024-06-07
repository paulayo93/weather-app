import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScaledSize,
} from "react-native";
import React from "react";
import {
  Canvas,
  Rect,
  vec,
  LinearGradient,
  Line,
  Extrapolate,
} from "@shopify/react-native-skia";
import useApplicationDimensions from "../hooks/useApplicationDimensions";
import { useForecastSheetPosition } from "../context/ForecastSheetContext";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";

const HomeBackground = () => {
  const dimensions = useApplicationDimensions();
  const { width, height } = dimensions;
  const myStyles = styles(dimensions);
  const smokeHeight = height * 0.6;
  const smokeOffsetY = height * 0.4;
  const animatedPosition = useForecastSheetPosition();
  const AnimatedImgBkg = Animated.createAnimatedComponent(ImageBackground);
  const AnimatedCanvas = Animated.createAnimatedComponent(Canvas);
  const leftBkgColor = useSharedValue("#2E335A");
  const rightBkgColor = useSharedValue("#1C1B33");
  const bkgColors = useDerivedValue(() => {
    leftBkgColor.value = interpolateColor(
      animatedPosition.value,
      [0, 1],
      ["#2E335A", "#422E5A"]
    );
    return [leftBkgColor.value, rightBkgColor.value];
  });

  const animatedImgBkgStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, -height],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const animatedCanvasSmokeStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        animatedPosition.value,
        [0, 0.1],
        [1, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  useAnimatedReaction(
    () => {
      return animatedPosition.value;
    },
    (cv) => {}
  );

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <Canvas style={{ ...StyleSheet.absoluteFillObject }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={bkgColors}
          />
        </Rect>
      </Canvas>
      <AnimatedImgBkg
        source={require("../assets/home/background.png")}
        resizeMode="cover"
        style={[{ height: "100%" }, animatedImgBkgStyles]}
      >
        <AnimatedCanvas
          style={[
            {
              height: smokeHeight,
              ...StyleSheet.absoluteFillObject,
              top: smokeOffsetY,
            },
            animatedCanvasSmokeStyles,
          ]}
        >
          <Rect x={0} y={0} width={width} height={smokeHeight}>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, smokeHeight)}
              colors={["rgba(58,63,84,0)", "rgba(58,63,84,1)"]}
              positions={[-0.02, 0.54]}
            />
          </Rect>
          {/* <Line
            p1={vec(width/2,0)}
            p2={vec(width/2, smokeHeight)}
            strokeWidth={10}
            color={'red'}/> */}
        </AnimatedCanvas>
        <Image
          source={require("../assets/home/house.png")}
          resizeMode="cover"
          style={myStyles.houseImage}
        />
      </AnimatedImgBkg>
    </View>
  );
};

export default HomeBackground;

const styles = ({ width }: ScaledSize) =>
  StyleSheet.create({
    houseImage: {
      height: width,
      width: width,
      ...StyleSheet.absoluteFillObject,
      top: "36%",
    },
  });
function useAnimatedStye(arg0: () => { transform: { translateY: number }[] }) {
  throw new Error("Function not implemented.");
}
