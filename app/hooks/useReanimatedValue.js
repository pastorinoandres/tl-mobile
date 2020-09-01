import React, { useRef } from 'react'
import Animated from 'react-native-reanimated';

export default useReanimatedValue = (initialState,version)=> useRef(new Animated.Value(initialState)).current