import React, { Component, Fragment, Children } from 'react';
import { StyleSheet, Dimensions, View, Modal } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler, State  } from "react-native-gesture-handler";
import { ui, colors, calculateSize } from './../../styles';
const { width, height } = Dimensions.get('window');

const {
    Extrapolate,
    Value,
    Clock,
    block,
    cond,
    call, 
    eq,
    set,
    add,
    and,
    multiply,
    greaterThan,
    clockRunning,
    startClock,
    stopClock,
    event,
    interpolate,
    timing,
} = Animated;

const DragCard = Animated.View;
const Drag = View;
const Card = View;

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



class BottomMenuContainer extends Component{


    
    constructor(props){

        super(props);

        this.cardSize = props.contentSize             
        this.finalPosition =  height - props.contentSize
        this.initialPosition = height;
        
        this.translationY = new Value(0);
        this.velocityY = new Value(0);;
        this.offsetY = new Value(this.initialPosition);
        this.gestureState = new Value(State.UNDETERMINED);
        this.transparency = new Value(1) 
        
            

        const { translationY, velocityY, offsetY, gestureState: state} = this;

        const clockPan = new Clock();
        const clockTap = new Clock();

        this.onGestureEvent = event(
            [
              {
                nativeEvent: {
                  translationY, 
                  velocityY, 
                  state, 
                },
              },
            ],
            { useNativeDriver: true },
          );

        this.onTap =  event(
            [
              {
                nativeEvent: ({state})=>block([
                    cond(eq(state,State.END),
                    [ 
                        set(offsetY, runSpring(clockTap, this.finalPosition, this.initialPosition)),
                        cond(eq(offsetY,this.initialPosition),call([],([])=>{this.props.toogleMenu()})),
                    ])
                ])
              },
            ],
            { useNativeDriver: true },
          );

        const finalTranslateY = add(add(translationY, offsetY), multiply(0.2, velocityY));

        const snapPoint = cond(
            greaterThan(finalTranslateY, height - calculateSize(100) ),
            this.initialPosition,
            this.finalPosition, 
        );
    
        this.tY = block([            
            cond(and(eq(state, State.END),greaterThan(translationY,0)),
            [   
                set(offsetY, runSpring(clockPan, add(translationY, offsetY), snapPoint)),                
                cond(eq(offsetY,this.initialPosition),call([],([])=>{this.props.toogleMenu()})),
                cond(eq(offsetY,this.finalPosition),set(translationY,0)),
                offsetY, 
            ],
            [
                add(offsetY, translationY)
            ],
        )])
        
    }

    styles = {        
        viewDrag:{
            height:calculateSize(10),
            width:width,
            display:'flex',
            justifyContent:'center',
            alignItems:'center',        
            zIndex:6,
        },
        iconDrag:{
            height:calculateSize(8),
            width:calculateSize(70),
            borderRadius:calculateSize(4),        
            backgroundColor:'white',
            opacity:0.8
        },
        menuStyle:{
            zIndex:6,                
            width:width, 
            flex:1,
            backgroundColor: colors.white(),
            marginTop:calculateSize(10),
            paddingBottom: calculateSize(60),
            paddingTop: ui.padding,
            paddingHorizontal: ui.padding + calculateSize(5),
            borderTopLeftRadius:calculateSize(10),
            borderTopRightRadius:calculateSize(10),
            ...this.props.extraStyles
        }
    }

    

    toDown = ()=>{

        timing(
            this.offsetY,
            {
              toValue: this.initialPosition,
              duration: 500,
              easing: Easing.inOut(Easing.ease),
            },
        ).start();        

        setTimeout(()=>{this.props.toogleMenu()},1500)


    }

    popUp= ()=>{

        timing(
            this.transparency,
            {
              toValue: 0,
              duration: 100,
              easing: Easing.inOut(Easing.ease),
            },
        ).start(); 


    }



   
    componentDidMount(){

        const { finalPosition } = this;

        timing(
            this.offsetY,
            {
              toValue: finalPosition,
              duration: 500,
              easing: Easing.inOut(Easing.ease),
            },
        ).start();

    }

    render(){


        const { onGestureEvent, tY, onTap, styles, toDown, transparency, popUp } = this;

        const translateY = interpolate(tY, {
            inputRange: [ this.finalPosition, this.initialPosition ],
            outputRange: [ this.finalPosition, this.initialPosition ],
            extrapolate: Extrapolate.CLAMP,
          });
          
        const opacity = interpolate(tY, {
            inputRange: [ this.finalPosition, this.initialPosition ],
            outputRange: [0.6, 0],
            extrapolate: Extrapolate.CLAMP,
            });

        


        return (

            
            
                <PanGestureHandler
                    onHandlerStateChange={onGestureEvent}
                    activeOffsetY={[-calculateSize(10),calculateSize(10)]}
                    {...{ onGestureEvent }}>

                    <Animated.View style={{...StyleSheet.absoluteFill, zIndex:5,  opacity:transparency}}>

                        <TapGestureHandler
                            onHandlerStateChange={onTap}
                            activeOffsetY={[-calculateSize(10),calculateSize(10)]}>
                            
                            <Animated.View
                                style={{
                                    ...StyleSheet.absoluteFill,
                                    flex:1,
                                    zIndex:5,
                                    backgroundColor:'black',
                                    opacity
                                }}>
                            </Animated.View> 
                                
                        </TapGestureHandler>
                        
                        <DragCard  style={{zIndex:6, height:this.cardSize, transform: [{ translateY }]}}>

                            <Drag style={styles.viewDrag}>
                                <View style={styles.iconDrag}/>
                            </Drag>
                            <Card style={{...styles.menuStyle, }}>
                            {
                                Children.map( this.props.children, child => React.cloneElement(child, { toDown, popUp }))
                            }
                            </Card>

                        </DragCard>

                    </Animated.View>
                    

                </PanGestureHandler>

            
            
        );

    }
    

};


const BottomMenu = (props)=>(
        
    <Fragment>

        { props.menu && 
            ( 
            <Modal animationType="none" transparent={true} visible={true}>
                <BottomMenuContainer {...props} />       
            </Modal>
            )
        }

    </Fragment>
    
);

export default BottomMenu;
  

