export const INTERVAL = 'INTERVAL';
export const TIMEOUT = 'TIMEOUT'

export default class TimerActions{

    constructor(){

        this.timers = {
            
        }

    }

    setTimer = (id, key, type) =>{
        this.timers[id] = {key, type}
    }
    
    clearTimer = (id)=>{
    
        const { type, key } = this.timers[id]
    
        if(type === INTERVAL){
            clearInterval(key)
        }else{
            clearTimeout(key)
        }
        
        delete this.timers[id]
    }
    
    clearAllTimers = ()=>{
    
        for (const id in this.timers) {
    
            const { type, key } = this.timers[id]
    
            if(type === INTERVAL){
                clearInterval(key)
            }else{
                clearTimeout(key)
            }
            
        }
    
    }


}

