
import React, { Component} from 'react';
import Animated, {Easing} from 'react-native-reanimated';
import { Dimensions } from 'react-native';
import { State } from 'react-native-gesture-handler';


const {width:windowWidth, height:windowHeight} = Dimensions.get('window');
const {
    Extrapolate,
    Value,
    abs,
    Clock,
    block,
    cond,
    eq,
    set,
    add,
    and,
    or,
    multiply,
    greaterThan,
    clockRunning,
    startClock,
    stopClock,
    event,
    interpolate,
    timing,
    debug
} = Animated;


function runSpring(clock, value, dest) {

    
    const state = {
        finished: new Value(0),
        position: new Value(0),
        frameTime: new Value(0),
        time: new Value(0),
      };
  
    const config = {
    toValue: new Value(0),
    duration: 300,
    easing: Easing.inOut(Easing.cubic),
    };
  
    return [
        cond(clockRunning(clock), 
            [            
                value
            ], 
            [
                set(state.finished, 0),
                set(state.frameTime, 0),
                set(state.time, 0),
                set(state.position, value),
                set(config.toValue, dest),
                startClock(clock),
            ]
        ),
        timing(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position,
    ];
  }

  export const AnimationSync = React.createContext({});

  export default class AnimationsApp extends Component{


    constructor(props){

        super(props);

        this.swipeMenu = {

          menu: new Value(0),
          initialPosition: new Value(0),
          finalPosition:new Value(-0.8*windowWidth),
          translationX: new Value(0),
          velocityX: new Value(0),
          offsetX: new Value(0),
          gestureState:new Value(State.UNDETERMINED)
          
        };    
    
        const { translationX, velocityX, offsetX, gestureState: state, finalPosition, initialPosition, menu} = this.swipeMenu;
    
        const clock = new Clock();
    
        this.swipeMenu.onGestureEvent = event(
            [
              {
                nativeEvent: {
                  translationX, 
                  velocityX, 
                  state, 
                },
              },
            ],
            { useNativeDriver: true },
          );
    
        
        const finalTranslateX = add(add(translationX, offsetX), multiply(0.2, velocityX));
    
            
    
    
        const snapPoint = cond(greaterThan(translationX,0),
          cond(
            greaterThan(finalTranslateX, finalPosition + windowWidth*0.5 ),
            initialPosition,
            finalPosition, 
          ),
          cond(
            greaterThan(abs(finalTranslateX), windowWidth*0.5 ),
            finalPosition, 
            initialPosition,
          )
        )
        
        
    
        this.swipeMenu.tX = block([            
            cond(eq(state, State.END),
            [   
                set(offsetX, runSpring(clock, add(translationX, offsetX), snapPoint)),
                cond( 
                  or(
                    eq(offsetX,finalPosition),
                    eq(offsetX, initialPosition)
                  ),
                  [
                    set(translationX,0),
                    set(state,State.UNDETERMINED),
                  ]
                ),
                cond( eq(offsetX,finalPosition), set(menu, 1)),
                cond( eq(offsetX,initialPosition), set(menu, 0)),                   
                offsetX, 
            ],
            [
                cond( eq(offsetX,finalPosition), set(menu, 1)),
                cond( eq(offsetX,initialPosition), set(menu, 0)), 
                add(offsetX, translationX)
            ],
        )])


        this.swipeMenu.toogleMenu = ()=>{

          const dest = cond(menu, initialPosition, finalPosition)
      
          Animated.timing(
            offsetX,
              {
                toValue: dest,
                duration: 500,
                easing: Easing.inOut(Easing.ease),
              },
          ).start();
      
      
        }

        this.swipeMenu.reset = ()=>{

          const {translationX, velocityX, offsetX, gestureState } = this.swipeMenu;

          translationX.setValue(0)
          velocityX.setValue(0)
          offsetX.setValue(0)
          gestureState.setValue(State.UNDETERMINED)         
      
        }
        
      }

    render(){




        return(
            <AnimationSync.Provider value={this.swipeMenu}>
                {this.props.children}
            </AnimationSync.Provider>
        )
    }

  }