import { useRef } from "react";

export default useRenderCounter = (componentName = 'El componente') =>{

    const counter = useRef(0)
    counter.current = counter.current + 1
    console.log(`${componentName} se renderizó ${counter.current} ${(counter.current === 1)? 'vez':'veces'}`);

}
