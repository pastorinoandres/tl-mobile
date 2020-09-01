//Hooks

// React --------------------------------------------//
export { useRef } from 'react'
export { useState } from 'react'
export { useEffect } from 'react'
export { useCallback } from 'react'
export { useMemo } from 'react'
export { useContext } from 'react'
export { useLayoutEffect } from 'react'
export { useReducer } from 'react'
export { useDebugValue } from 'react'
export { useImperativeHandle } from 'react'

// React Native  --------------------------------------//
export { useWindowDimensions } from 'react-native'

// React-Redux  --------------------------------------//
export { useDispatch } from 'react-redux';
export { useSelector } from 'react-redux';
export { useStore } from 'react-redux';

// React Navigation  --------------------------------//
export { useNavigation } from '@react-navigation/native';
export { useRoute } from '@react-navigation/native';
export { useFocusEffect } from '@react-navigation/native';
export { useIsFocused } from '@react-navigation/native';
export { useLinking } from '@react-navigation/native';
export { useScrollToTop } from '@react-navigation/native';

//Otros
export { useColorScheme } from 'react-native-appearance'
export { useSafeArea } from 'react-native-safe-area-context'

// Custom Hooks --------------------------------------------//
export { default as useToogle } from './useToogle'
export { default as useAnimatedValue } from './useAnimatedValue'
export { default as useReanimatedValue } from './useReanimatedValue'
export { default as useKeywordListeners } from './useKeywordListeners'
export { default as useStateWithHistory } from './useStateWithHistory'
export { default as useRenderCounter } from './useRenderCounter'
export { default as useActions } from './useActions'

