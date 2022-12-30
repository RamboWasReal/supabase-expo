import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { View } from 'react-native';
import React from 'react';
import { tintColorDark } from '../constants/Colors';
import { Button } from './Button';

export default function AnimatedView() {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: tintColorDark,
        marginBottom: 100,
        borderRadius: 10,
        position: 'relative'
      }}>
      <Animated.View
        style={[{ width: 100, height: 30, backgroundColor: tintColorDark, margin: 30 }, style]}
      />
      <View style={{position: 'absolute', top: 20}}>
        <Button
          title="toggle"
          onPress={() => {
            randomWidth.value = Math.random() * 350;
          }}
        />
      </View>
    </View>
  );
}
