import React, { useState } from 'react'


export default useToogle = (initialState)=>{

    const [value, setValue] =  useState(!!initialState)

    const toogleValue = (param) =>{
        
        setValue( previus => {

            if((typeof param === 'string') && ((param === 'true') || (param === 'false'))){
                return (param === 'true')?true:false
            }else{
                return !previus
            }
            
        })

    }

    return [ value, toogleValue ]

}