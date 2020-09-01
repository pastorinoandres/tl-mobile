import moment from 'moment';
import 'moment/locale/es';


export const toString = (jsDate)=>{
    
    return moment(jsDate).format("YYYY-MM-DD")

}

export const unixToSting = (unixDate) =>{

console.log('unixDate', unixDate);

   return moment.unix(unixDate).format("YYYY-MM-DD")

}

export const toJsDate = (stringDate)=>{

    return moment(stringDate).toDate()

}

