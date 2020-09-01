

//Dependecies
import React from 'react';
import {useSelector } from 'react-redux';
import { Dimensions, View,} from 'react-native';

//Components
import { Thumbnail, Text} from '../../atoms';

//Selectors
import { getFirebaseUser } from './../../../../state/ducks/system/systemSelectors';

//Styles
import { colors, typography, ui, calculateSize } from '../../../styles';
import  Animated  from 'react-native-reanimated';




const {width:windowWidth, height:windowHeight} = Dimensions.get('window');

const Profile = (props)=>{
  
    const { photoURL, displayName } = useSelector(getFirebaseUser)
  
    return(
      <Animated.View 
        style={{
          paddingRight: ui.margin*1.5,
          height: 56 + ui.margin*2,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          opacity:props.opacity
      }}>
        <View style={{width: 0.20 * windowWidth, justifyContent: 'center', alignItems: 'flex-end' }}>
          <Thumbnail source={{uri: photoURL}} size={56} extraStyles={{...ui.shadow,}} />
        </View>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'left', justifyContent: 'center', paddingLeft:0.05* windowWidth}}>
          <Text {...typography["title-20"]} color={colors.white()} >{`${ displayName }`}</Text>
          <Text {...typography["body-16"]} color={colors.white()} >Ver mi perfil</Text>
        </View>
  
      </Animated.View>
    )
}

export default Profile;