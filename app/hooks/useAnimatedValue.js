import React, { useRef } from 'react'
import { Animated } from 'react-native';

export default useAnimatedValue = (initialState,version)=> useRef(new Animated.Value(initialState)).current