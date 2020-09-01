import React, { useState } from 'react'


export default useStateWithHistory = (initialState)=>{

    const historyValues = {
        current: initialState,
        previus: null
    }

    const [value, setValue] =  useState(historyValues)



    const setCurrentValue = (value) =>{
        
        setValue( prevHistory => {

            return {
                current: value,
                previus: prevHistory.current
            }

        })
    }

    return [ value, setCurrentValue ]

}