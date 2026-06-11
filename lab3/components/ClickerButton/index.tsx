import { useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import { useGameStore } from '@/store/game-store';

const CIRCLE_SIZE = 140;

const ClickerButton = () => {
  const {
    addScore,
    incrementTap,
    incrementDoubleTap,
    setLongPressDone,
    setPanDone,
    setSwipeRightDone,
    setSwipeLeftDone,
    setPinchDone,
  } = useGameStore();

  // Position tracking
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const panStartX = useSharedValue(0);
  const panStartY = useSharedValue(0);

  // Scale: base (accumulated from pinch) × pinch live × tap feedback
  const baseScale = useSharedValue(1);
  const pinchScale = useSharedValue(1);
  const tapScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value },
      { translateY: offsetY.value },
      { scale: tapScale.value * baseScale.value * pinchScale.value },
    ],
  }));

  // JS-thread callbacks for store updates
  const handleTap = useCallback(() => {
    addScore(1);
    incrementTap();
  }, [addScore, incrementTap]);

  const handleDoubleTap = useCallback(() => {
    addScore(2);
    incrementDoubleTap();
  }, [addScore, incrementDoubleTap]);

  const handleLongPress = useCallback(() => {
    addScore(5);
    setLongPressDone();
  }, [addScore, setLongPressDone]);

  const handlePanEnd = useCallback(() => {
    setPanDone();
  }, [setPanDone]);

  const handleFlingRight = useCallback(() => {
    addScore(Math.floor(Math.random() * 10) + 1);
    setSwipeRightDone();
  }, [addScore, setSwipeRightDone]);

  const handleFlingLeft = useCallback(() => {
    addScore(Math.floor(Math.random() * 10) + 1);
    setSwipeLeftDone();
  }, [addScore, setSwipeLeftDone]);

  const handlePinchEnd = useCallback(() => {
    addScore(3);
    setPinchDone();
  }, [addScore, setPinchDone]);

  // ── Gestures ──────────────────────────────────────────────────────────────

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_, success) => {
      if (success) {
        tapScale.value = withSequence(
          withSpring(0.7, { duration: 80 }),
          withSpring(1.15, { duration: 100 }),
          withSpring(1, { duration: 150 }),
        );
        runOnJS(handleDoubleTap)();
      }
    });

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .requireExternalGestureToFail(doubleTap)
    .onEnd((_, success) => {
      if (success) {
        tapScale.value = withSequence(
          withSpring(0.85, { duration: 80 }),
          withSpring(1, { duration: 150 }),
        );
        runOnJS(handleTap)();
      }
    });

  const longPress = Gesture.LongPress()
    .minDuration(3000)
    .onEnd((_, success) => {
      if (success) {
        tapScale.value = withSequence(
          withSpring(1.3, { duration: 200 }),
          withSpring(1, { duration: 300 }),
        );
        runOnJS(handleLongPress)();
      }
    });

  const pan = Gesture.Pan()
    .onStart(() => {
      panStartX.value = offsetX.value;
      panStartY.value = offsetY.value;
    })
    .onUpdate((e) => {
      offsetX.value = panStartX.value + e.translationX;
      offsetY.value = panStartY.value + e.translationY;
    })
    .onEnd(() => {
      runOnJS(handlePanEnd)();
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      pinchScale.value = e.scale;
    })
    .onEnd((e) => {
      // Clamp accumulated scale between 0.5× and 2.5×
      baseScale.value = Math.max(0.5, Math.min(2.5, baseScale.value * e.scale));
      pinchScale.value = 1;
      runOnJS(handlePinchEnd)();
    });

  const flingRight = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd((_, success) => {
      if (success) runOnJS(handleFlingRight)();
    });

  const flingLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd((_, success) => {
      if (success) runOnJS(handleFlingLeft)();
    });

  const composed = Gesture.Simultaneous(
    Gesture.Exclusive(doubleTap, singleTap),
    longPress,
    pan,
    pinch,
    Gesture.Exclusive(flingRight, flingLeft),
  );

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.circle, animatedStyle]}>
        <Text style={styles.label}>TAP ME</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default ClickerButton;
