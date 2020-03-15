import React from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import {
  PinchGestureHandler,
  PinchGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 480,
  },
});

export const App: React.FC = () => {
  const baseScale = new Animated.Value(1);
  const pinchScale = new Animated.Value(1);
  const scale = Animated.multiply(baseScale, pinchScale);
  let lastScale = 1;

  const onPinchEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: true },
  );

  const onPinchStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.oldState == State.ACTIVE) {
      lastScale *= event.nativeEvent.scale;
      baseScale.setValue(lastScale);
      pinchScale.setValue(1);
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchEvent}
      onHandlerStateChange={onPinchStateChange}>
      <Animated.View style={styles.wrapper}>
        <Animated.Image
          resizeMode="center"
          source={{
            uri: 'http://localhost:8080/?extension=png',
          }}
          style={[
            styles.image,
            {
              transform: [{ scale }],
            },
          ]}
        />
      </Animated.View>
    </PinchGestureHandler>
  );
};

export default App;
