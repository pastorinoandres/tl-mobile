import React, { Component, Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import { Group, Text } from '../../../shared/components/atoms';
import { BottomMenu } from './../../../shared/components/molecules';




const CardContent = ({popUp, options, title})=>{

  const styles= {

    title:{
      marginBottom:30, 
      marginTop:15, 
      textAlign: 'left'
    },
    optionGroup:{
      flexDirection:'row', 
      width:'100%',
      height:50, 
      justifyContent: 'flex-start', 
      alignItems: 'center',
      marginVertical:5
    },
    optionName:{
      marginLeft:15, 
      textAlign: 'left'
    }

  }

  
  return(

    <Fragment>

      <Text {...typography["title-24"]} color={colors.acento.primary} extraStyles={styles.title}>
        {title}
      </Text>

      {
        options.map((Option,index) =>{

            return (
                <TouchableOpacity onPress={()=>{popUp();Option.action()}} key={index}>
                    <Group style={styles.optionGroup}>

                        <Option.Icon size={30} />

                        <Text {...typography["body-20"]} color={colors.acento.primary} extraStyles={styles.optionName}>
                          {Option.name}
                        </Text>

                    </Group>
                </TouchableOpacity>
            )
        })
      }

    </Fragment>

  )

}


const MenuPhotos = ({ menu, toogleMenu, contentSize, options, title })=>{

  return (
    <BottomMenu menu={menu} toogleMenu={toogleMenu} contentSize={contentSize}>
      <CardContent options={options} title={title}/>     
    </BottomMenu>
  )
  
}

export default MenuPhotos;